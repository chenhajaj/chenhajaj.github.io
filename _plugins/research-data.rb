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

  # LaTeX accent commands (\`e, \'{e}, \"o ...) become the accented letter.
  ACCENTS = { "`" => "\u0300", "'" => "\u0301", "^" => "\u0302", "~" => "\u0303", '"' => "\u0308" }.freeze

  def self.clean(text)
    text.to_s
        .gsub(/\\([`'^~"])\s*\{?([a-zA-Z])\}?/) { "#{Regexp.last_match(2)}#{ACCENTS[Regexp.last_match(1)]}" }
        .gsub(/\\&/, "&").gsub(/\\[a-zA-Z]+\s*/, "").delete("{}").gsub(/\s+/, " ").strip
        .unicode_normalize(:nfc)
  end

  def self.person(name)
    name = clean(name)
    return name unless name.include?(",")

    last, first = name.split(",", 2).map(&:strip)
    "#{first} #{last}".strip
  end

  # "Chen Hajaj", "C Hajaj" and "C. Hajaj" all become "c-hajaj".
  def self.person_id(name)
    parts = name.downcase.delete(".").split(/\s+/).reject(&:empty?)
    return name.downcase if parts.empty?

    "#{parts.first[0]}-#{parts.last}"
  end

  # Same classification as _layouts/bib.liquid, so counts match the
  # Publications page type filter.
  def self.kind(entry)
    # An explicit `category = {...}` in papers.bib wins (used to follow the
    # CV: e.g. workshop papers, or clinical conference papers).
    forced = clean(entry[:category]).downcase
    return forced unless forced.empty?

    case entry.type.to_s.downcase
    when "article" then "journal"
    when "inproceedings", "incollection" then "conference"
    when "phdthesis", "mastersthesis" then "thesis"
    when "book" then "book"
    else
      venue = "#{clean(entry[:howpublished])} #{clean(entry[:note])}".downcase
      if venue.include?("patent") then "patent"
      elsif venue.include?("abstract") then "abstract"
      elsif venue =~ /preprint|working paper|arxiv|ssrn/ then "preprint"
      else "other"
      end
    end
  end

  REFEREED = %w[journal conference].freeze

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
        line_years = in_line.map { |p| p["year"] }
        coauthors = in_line.flat_map { |p| p["authors"].map { |a| ResearchData.person_id(a) } }.uniq - ["c-hajaj"]
        primary = papers.count { |p| p["line"] == l["key"] }
        l.merge("count" => in_line.size, "primary" => primary, "per_year" => per_year, "url" => "/projects/#{l['project']}/",
                "first" => line_years.min, "last" => line_years.max, "coauthors" => coauthors.size)
      end

      # People: merge name variants, count papers shared with Chen, mark lab members.
      me = "c-hajaj"
      lab = {}
      students = site.data["students"] || {}
      { "phd_students" => "PhD student", "masters_students" => "MSc student",
        "research_assistants" => "Research assistant", "phd_alumni" => "PhD graduate",
        "masters_alumni" => "MSc graduate", "pre_phd_alumni" => "Pre-PhD research student",
        "former_research_assistants" => "Former research assistant" }.each do |group, role|
        (students[group] || []).each do |st|
          ([st["name"]] + (st["aliases"] || [])).each { |n| lab[ResearchData.person_id(n.to_s)] ||= role }
        end
      end
      people = {}
      papers.each do |p|
        p["author_ids"] = p["authors"].map { |a| ResearchData.person_id(a) }.uniq
        p["authors"].each do |a|
          id = ResearchData.person_id(a)
          person = (people[id] ||= { "id" => id, "names" => [], "papers" => [], "lines" => Hash.new(0), "years" => [] })
          person["names"] << a
        end
        p["author_ids"].each do |id|
          person = people[id]
          person["papers"] << p["key"]
          person["lines"][p["line"]] += 1
          person["years"] << p["year"]
        end
      end
      people_list = people.values.reject { |pp| pp["id"] == me }.map do |pp|
        {
          "id" => pp["id"],
          "name" => pp["names"].max_by { |n| [n.delete(".").length, n] },
          "count" => pp["papers"].size,
          "line" => pp["lines"].max_by { |k, v| [v, k == "other" ? 0 : 1] }&.first || "other",
          "first" => pp["years"].min, "last" => pp["years"].max,
          "role" => lab[pp["id"]]
        }.compact
      end
      people_list.sort_by! { |pp| [-pp["count"], pp["name"]] }
      collaborators = people_list.size

      site.data["research"] = {
        "papers" => papers.size,
        "first_year" => first_year,
        "last_year" => last_year,
        "collaborators" => collaborators,
        "other_count" => papers.count { |p| p["line"] == "other" },
        "refereed" => papers.count { |p| REFEREED.include?(p["kind"]) },
        "journals" => papers.count { |p| p["kind"] == "journal" },
        "conferences" => papers.count { |p| p["kind"] == "conference" },
        "workshops" => papers.count { |p| %w[workshop abstract].include?(p["kind"]) },
        "non_refereed" => papers.count { |p| !REFEREED.include?(p["kind"]) },
        "other_items" => papers.count { |p| !REFEREED.include?(p["kind"]) && !%w[workshop abstract].include?(p["kind"]) },
        "top_people" => people_list.first(12),
        "students_coauthors" => people_list.count { |pp| pp["role"] },
        "lines" => summary,
        "by_project" => summary.to_h { |l| [l["project"], l] }
      }

      json = {
        "first_year" => first_year, "last_year" => last_year,
        "lines" => summary.map { |l| l.slice("key", "name", "color", "url", "count", "primary") },
        "other" => cfg["other"],
        "papers" => papers,
        "people" => people_list
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
