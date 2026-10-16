# frozen_string_literal: true

# Builds research data from _bibliography/papers.bib at build time:
#
#   site.data["research"]          for Liquid (counts per line and per year)
#   /assets/data/research.json     for the interactive map and charts
#
# Each paper gets a primary research line from _data/research_lines.yml
# (first line whose tags match the paper's `projects` field).

require "bibtex"
require "json"

module ResearchData
  KINDS = {
    "article" => "journal", "inproceedings" => "conference", "incollection" => "conference",
    "phdthesis" => "thesis", "mastersthesis" => "thesis", "book" => "book",
    "patent" => "patent", "misc" => "preprint", "unpublished" => "preprint"
  }.freeze

  def self.clean(text)
    text.to_s.gsub(/\\&/, "&").gsub(/\\[a-zA-Z]+\s*/, "").delete("{}").gsub(/\s+/, " ").strip
  end

  def self.person(name)
    name = clean(name)
    return name unless name.include?(",")

    last, first = name.split(",", 2).map(&:strip)
    "#{first} #{last}".strip
  end

  def self.kind(entry)
    type = entry.type.to_s.downcase
    return "patent" if type == "misc" && entry.fields.key?(:number) && clean(entry[:howpublished]) =~ /patent/i
    return "abstract" if clean(entry[:keywords]) =~ /abstract/i

    KINDS.fetch(type, "preprint")
  end

  class Generator < Jekyll::Generator
    safe true
    priority :high

    def generate(site)
      bib_path = File.join(site.source, "_bibliography", "papers.bib")
      cfg = site.data["research_lines"]
      return unless cfg && File.exist?(bib_path)

      lines = cfg["lines"] || []
      bib = BibTeX.open(bib_path, filter: nil)
      papers = []

      bib.each do |entry|
        next unless entry.respond_to?(:type) && entry.respond_to?(:fields) && entry.fields.key?(:title)

        year = ResearchData.clean(entry[:year]).to_i
        next if year.zero?

        tags = ResearchData.clean(entry[:projects]).split(",").map { |t| t.strip.downcase }
        # Substring match, the same as jekyll-scholar's `projects~=tag` queries.
        matched = lines.select { |l| l["tags"].any? { |t| tags.any? { |tag| tag.include?(t) } } }.map { |l| l["key"] }
        url = ResearchData.clean(entry[:url])
        doi = ResearchData.clean(entry[:doi])
        url = "https://doi.org/#{doi}" if url.empty? && !doi.empty?
        authors = entry[:author] ? entry[:author].to_s.split(/\s+and\s+/).map { |a| ResearchData.person(a) } : []

        papers << {
          "key" => entry.key.to_s,
          "year" => year,
          "title" => ResearchData.clean(entry[:title]),
          "authors" => authors,
          "venue" => ResearchData.clean(entry[:journal] || entry[:booktitle] || entry[:school] || entry[:publisher] || entry[:howpublished]),
          "kind" => ResearchData.kind(entry),
          "url" => url,
          "selected" => ResearchData.clean(entry[:selected]) == "true",
          "line" => matched.first || "other",
          "lines" => matched
        }
      end

      papers.sort_by! { |p| [-p["year"], p["title"]] }
      years = papers.map { |p| p["year"] }
      first_year, last_year = years.minmax

      summary = lines.map do |l|
        in_line = papers.select { |p| p["lines"].include?(l["key"]) }
        per_year = (first_year..last_year).map { |y| in_line.count { |p| p["year"] == y } }
        l.merge("count" => in_line.size, "per_year" => per_year, "url" => "/projects/#{l['project']}/")
      end

      collaborators = papers.flat_map { |p| p["authors"] }.reject { |a| a =~ /Hajaj/ }.uniq.size

      site.data["research"] = {
        "papers" => papers.size,
        "first_year" => first_year,
        "last_year" => last_year,
        "collaborators" => collaborators,
        "other_count" => papers.count { |p| p["line"] == "other" },
        "lines" => summary,
        "by_project" => summary.to_h { |l| [l["project"], l] }
      }

      json = {
        "first_year" => first_year, "last_year" => last_year,
        "lines" => summary.map { |l| l.slice("key", "name", "color", "url", "count") },
        "other" => cfg["other"],
        "papers" => papers.map { |p| p.reject { |k, _| k == "lines" } }
      }
      # Inline copy for pages that draw the map without an extra request.
      # "</" is escaped so the JSON is safe inside a <script> element.
      site.data["research_json"] = JSON.generate(json).gsub("</") { "<\\/" }

      page = Jekyll::PageWithoutAFile.new(site, site.source, "assets/data", "research.json")
      page.content = JSON.generate(json)
      page.data["layout"] = nil
      page.data["sitemap"] = false
      site.pages << page
    end
  end
end
