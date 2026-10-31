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

  # "Chen Hajaj", "C Hajaj" and "C. Hajaj" all become "c-hajaj". Unicode
  # hyphens count as "-" (papers.bib spells "Ben-Shalom" both ways).
  def self.person_id(name)
    parts = name.downcase.delete(".").tr("\u2010\u2011", "--").split(/\s+/).reject(&:empty?)
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
          "code" => ResearchData.clean(entry[:code]),
          "selected" => ResearchData.clean(entry[:selected]) == "true",
          "line" => matched.first || "other",
          "lines" => matched
        }
      end

      papers.sort_by! { |p| [-p["year"], p["title"]] }
      years = papers.map { |p| p["year"] }
      first_year, last_year = years.minmax

      names = lines.to_h { |l| [l["key"], l["name"]] }

      summary = lines.map do |l|
        in_line = papers.select { |p| p["lines"].include?(l["key"]) }
        per_year = (first_year..last_year).map { |y| in_line.count { |p| p["year"] == y } }
        line_years = in_line.map { |p| p["year"] }
        coauthors = in_line.flat_map { |p| p["authors"].map { |a| ResearchData.person_id(a) } }.uniq - ["c-hajaj"]
        primary = papers.count { |p| p["line"] == l["key"] }
        # Papers this line shares with each other line .
        shared = in_line.flat_map { |p| p["lines"] - [l["key"]] }.tally
                        .sort_by { |k, n| [-n, names[k].to_s] }
                        .map { |k, n| { "key" => k, "name" => names[k], "count" => n } }
        l.merge("count" => in_line.size, "primary" => primary, "per_year" => per_year, "url" => "/projects/#{l['project']}/",
                "first" => line_years.min, "last" => line_years.max, "coauthors" => coauthors.size,
                "refereed" => in_line.count { |p| REFEREED.include?(p["kind"]) }, "shared" => shared)
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
      # Badges. Student-led: the first author is a current or former member of
      # the lab (students.yml). CORE: for conference papers, the rank in the
      # CORE edition in force when the paper appeared (_data/core_ranks.yml).
      core = site.data["core_ranks"] || {}
      editions = Array(core["editions"]).map(&:to_i).sort
      badges = {}
      papers.each do |p|
        b = {}
        b["student"] = lab[p["author_ids"].first] if lab[p["author_ids"].first]
        if p["kind"] == "conference"
          venue = (core["venues"] || []).find { |v| p["venue"].to_s.include?(v["match"]) }
          ed = editions.select { |y| y <= p["year"] }.max
          rank = venue && ed && (venue["ranks"] || {})[ed]
          if rank
            b["core"] = rank
            b["core_edition"] = ed == 2026 ? "ICORE 2026" : "CORE #{ed}"
            b["core_venue"] = venue["acronym"].sub(/^IEEE /, "").sub("-", " ")
          end
        end
        if p["kind"] == "journal"
          sjr = site.data["sjr_quartiles"] || {}
          entry = (sjr["journals"] || []).find { |j| j["match"] == p["venue"] }
          if entry
            qs = entry["quartiles"] || {}
            yr = [p["year"], sjr["latest_year"].to_i].min
            yr = qs.keys.map(&:to_i).select { |k| k <= yr }.max || qs.keys.map(&:to_i).min
            if yr && qs[yr]
              b["sjr"] = qs[yr]
              b["sjr_year"] = yr
            end
          end
        end
        badges[p["key"]] = b unless b.empty?
        # Compact fields for the paper map's "Colour by" lenses (paper-map.js).
        # tier: top = CORE A*/A or SJR Q1, mid = CORE B or SJR Q2, ref = other
        # refereed; none for non-refereed items. lead: student or chen (first
        # author); none when someone else led the paper.
        tier = if %w[A* A].include?(b["core"]) || b["sjr"] == "Q1" then "top"
               elsif b["core"] == "B" || b["sjr"] == "Q2" then "mid"
               elsif REFEREED.include?(p["kind"]) then "ref"
               end
        p["tier"] = tier if tier
        rank = if b["core"] then "#{b['core_edition'] || 'CORE'} #{b['core']}" elsif b["sjr"] then "SJR #{b['sjr']}" end
        p["rank"] = rank if rank
        lead = if b["student"] then "student" elsif p["author_ids"].first == me then "chen" end
        p["lead"] = lead if lead
      end

      # Research line for each lab member (avatar colour on the Lab page): the
      # line they publish in most with Chen, else a keyword match on their topic.
      topic_lines = [
        ["traffic", /traffic|quic|qoe|o-ran|network|encrypt|covert|video conferenc/i],
        ["medical", /medic|clinic|icu|health|myopia|patient|nutrition|disease|biomed|ecg|eeg|covid|anxiety|depression/i],
        ["adversarial", /adversar|attack|malware|security|captcha|intrusion|dos\b|\bapi\b|threat|evasion|anomal|url\b/i],
        ["similarity", /recommend|commerce|pricing|price|fashion|multimodal|product|consumer|similar|funnel|chatbot/i],
        ["incentives", /auction|incentive|game|mechanism|crowd/i],
        ["learning", /educat|design|studio|feedback|teach|learning environment/i]
      ]
      student_line = {}
      students.each_value do |list|
        Array(list).each do |st|
          name = st["name"].to_s
          ids = ([name] + Array(st["aliases"])).map { |n| ResearchData.person_id(n.to_s) }
          from_papers = ids.map { |i| people[i] }.compact.first
          line = st["line"]
          line ||= from_papers && from_papers["lines"].max_by { |k, v| [v, k == "other" ? 0 : 1] }&.first
          line = nil if line == "other"
          line ||= topic_lines.find { |_, re| st["research_area"].to_s =~ re }&.first
          student_line[name] = line || "other"
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

      # Explainers (pages with layout "note"): their line and the papers they
      # explain (`line:` and `papers:` in front matter), so papers can link to
      # them and research pages can list them.
      # Card image: the explainer's own `image:`, else its research line's
      # illustration (the project page's `img:`).
      line_img = lines.to_h do |l|
        proj = site.collections["projects"]&.docs&.find { |d| File.basename(d.path, ".*") == l["project"] }
        [l["key"], proj && proj.data["img"]]
      end
      explainers = site.pages.select { |pg| pg.data["layout"] == "note" }.map do |pg|
        own = pg.data["image"]
        { "url" => pg.url, "title" => pg.data["title"], "summary" => pg.data["summary"], "topic" => pg.data["topic"],
          "image" => own || line_img[pg.data["line"]], "own_image" => !own.nil?,
          "line" => pg.data["line"] || "other", "papers" => Array(pg.data["papers"]).map(&:to_s),
          "date" => pg.data["date"].to_s[0, 10] }
      end
      explainers.sort_by! { |e| [e["date"], e["title"].to_s] }.reverse!
      explainer_for = {}
      explainers.each { |e| e["papers"].each { |k| explainer_for[k] ||= e["url"] } }

      # "From our lab" (home page): recent refereed work that Chen or a lab
      # student led, or that a small team (three authors or fewer) wrote.
      # Scored, at most two per research line, newest first. A bib entry can
      # force itself in or out with showcase = {true} / {false}.
      raw = bib.data.select { |e| e.is_a?(BibTeX::Entry) }.to_h { |e| [e.key.to_s, e] }
      recent_from = last_year - 3
      candidates = papers.select do |p|
        force = raw[p["key"]] && ResearchData.clean(raw[p["key"]][:showcase])
        next false if force == "false"
        next true if force == "true"

        REFEREED.include?(p["kind"]) && p["year"] >= recent_from &&
          (p["lead"] || p["authors"].size <= 3)
      end
      score = lambda do |p|
        sc = 0
        sc += 3 if p["lead"] == "chen"
        sc += 2 if p["lead"] == "student"
        sc += 2 if p["authors"].size <= 3
        sc += { "top" => 2, "mid" => 1 }.fetch(p["tier"].to_s, 0)
        sc += 2 if explainer_for[p["key"]]
        sc + (p["year"] - recent_from)
      end
      per_line = Hash.new(0)
      showcase = candidates.sort_by { |p| [-score.call(p), -p["year"], p["title"]] }.select do |p|
        next false if per_line[p["line"]] >= 2

        per_line[p["line"]] += 1
      end.first(6)
      showcase = showcase.sort_by { |p| [-p["year"], -score.call(p)] }.map do |p|
        p.slice("key", "year", "title", "venue", "url", "line", "lead", "tier", "rank", "code")
         .merge("authors" => p["authors"], "team" => p["authors"].size, "explainer" => explainer_for[p["key"]],
                "venue_short" => (badges[p["key"]] || {})["core_venue"] || p["venue"].sub(/^Proceedings of (the )?/, ""))
      end

      site.data["research"] = {
        "papers" => papers.size,
        "paper_list" => papers,
        "badges" => badges,
        "student_line" => student_line,
        "student_led" => badges.count { |_, b| b["student"] },
        "core_ranked" => badges.count { |_, b| b["core"] },
        "sjr_q1" => badges.count { |_, b| b["sjr"] == "Q1" },
        "core_top" => badges.count { |_, b| %w[A* A].include?(b["core"]) },
        "sjr_ranked" => badges.count { |_, b| b["sjr"] },
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
        "by_project" => summary.to_h { |l| [l["project"], l] },
        "showcase" => showcase,
        "explainers" => explainers,
        "explainer_for" => explainer_for
      }

      json = {
        "first_year" => first_year, "last_year" => last_year,
        "lines" => summary.map { |l| l.slice("key", "name", "color", "url", "count", "primary") },
        "other" => cfg["other"],
        "papers" => papers,
        "people" => people_list,
        # Graduation years of PhD and MSc alumni (the growth replay counts them).
        "graduates" => %w[phd_alumni masters_alumni].flat_map { |g| Array(students[g]) }
                         .map { |st| st["graduation_year"].to_s[/\d{4}/]&.to_i }.compact.sort
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
