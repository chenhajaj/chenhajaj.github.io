# frozen_string_literal: true

# Layout data for three build-time charts (no JavaScript needed to draw them):
#
#   site.data["charts"]["funding"]      grants on a year axis, one row per currency
#                                       (_includes/grants_table.liquid)
#   site.data["charts"]["paths"]        one lane per student, first paper with
#                                       Chen to graduation or now (_includes/student_paths.liquid)
#   site.data["charts"]["line_people"]  top co-authors per research line
#                                       (_includes/line_people.liquid)
#
# Runs after research-data.rb (priority :high) and reads site.data["research"].
# Positions are percentages so the charts scale with the page.

require "json"

module LabCharts
  CURRENCY = {
    "NIS" => { "symbol" => "₪", "label" => "Shekels", "plural" => "shekels" },
    "USD" => { "symbol" => "$", "label" => "US dollars", "plural" => "US dollars" }
  }.freeze

  # Smallest "nice" number at or above v (1, 2, 2.5, 4, 5, 8 times a power of ten).
  def self.nice(value)
    return 1 if value <= 0

    mag = 10**Math.log10(value).floor
    [1, 2, 2.5, 4, 5, 8, 10].map { |m| m * mag }.find { |m| m >= value }.round
  end

  def self.pct(value)
    value.to_f.round(3)
  end

  def self.year_of(text)
    text.to_s.scan(/\d{4}/).last&.to_i
  end

  class Generator < Jekyll::Generator
    safe true
    priority :normal

    def generate(site)
      research = site.data["research"]
      return unless research

      now = site.time.year
      people = {}
      begin
        JSON.parse(site.data["research_json"].to_s)["people"].each { |p| people[p["id"]] = p }
      rescue JSON::ParserError, NoMethodError
        people = {}
      end
      site.data["charts"] = {
        "funding" => funding(site, now),
        "paths" => paths(site, research, now),
        "line_people" => line_people(research, people)
      }
    end

    private

    # ------------------------------------------------------------ funding ----
    # Each currency gets its own row and its own scale; grants awarded in the
    # same year stack in that year's column.
    def funding(site, now)
      grants = Array((site.data["grants"] || {})["grants"])
      return nil if grants.empty?

      years = grants.map { |g| g["year"].to_i }
      first = years.min - 1
      last = [years.max, now].max
      span = (first..last).to_a
      col = 100.0 / span.size
      rows = %w[NIS USD].filter_map do |cur|
        list = grants.select { |g| g["currency"] == cur }
        next if list.empty?

        by_year = list.group_by { |g| g["year"].to_i }
        peak = by_year.values.map { |gs| gs.sum { |g| g["amount"].to_i } }.max
        scale = LabCharts.nice(peak)
        stacks = by_year.sort.map do |year, gs|
          bottom = 0.0
          segs = gs.sort_by { |g| -g["amount"].to_i }.map do |g|
            h = g["amount"].to_f * 100 / scale
            seg = seg_for(g, cur, bottom, h)
            bottom += h
            seg
          end
          { "year" => year, "x" => LabCharts.pct(col * (year - first)), "segs" => segs,
            "total" => gs.sum { |g| g["amount"].to_i } }
        end
        items = list.sort_by { |g| [-g["year"].to_i, -g["amount"].to_i] }.map do |g|
          seg_for(g, cur, 0, g["amount"].to_f * 100 / scale)
        end
        CURRENCY[cur].merge(
          "currency" => cur, "count" => list.size, "total" => list.sum { |g| g["amount"].to_i },
          "scale" => scale, "half" => scale / 2, "stacks" => stacks, "items" => items
        )
      end
      order = Array((site.data["research_lines"] || {})["lines"]).map { |l| l["key"] } + ["other"]
      used = grants.map { |g| g["line"] || "other" }.uniq.sort_by { |k| order.index(k) || order.size }
      { "first" => first, "last" => last, "col" => LabCharts.pct(col), "lines" => used,
        "ticks" => span.each_with_index.map { |y, i| { "year" => y, "x" => LabCharts.pct(col * (i + 0.5)) } },
        "rows" => rows }
    end

    def seg_for(grant, cur, bottom, height)
      { "name" => grant["full_name"], "org" => grant["organization"], "year" => grant["year"].to_i,
        "amount" => grant["amount"].to_i, "symbol" => CURRENCY[cur]["symbol"],
        "pi" => grant["role"].to_s.casecmp("PI").zero?, "line" => grant["line"] || "other",
        "bottom" => LabCharts.pct(bottom), "h" => LabCharts.pct(height) }
    end

    # ------------------------------------------------------ student paths ----
    GROUPS = [
      ["phd_students", "PhD students", nil, true],
      ["masters_students", "MSc students", nil, true],
      ["phd_alumni", "PhD graduates", nil, false],
      ["masters_alumni", "MSc graduates (thesis)", "thesis", false],
      ["masters_alumni", "MSc final projects (non-thesis)", "project", false]
    ].freeze

    def paths(site, research, now)
      students = site.data["students"] || {}
      papers = research["paper_list"] || []
      groups = GROUPS.map do |key, title, program, current|
        people = Array(students[key])
        people = people.select { |s| s["program"].to_s == program } if program
        rows = people.map { |st| path_row(st, papers, current, now) }
        rows.sort_by! { |r| [r["start"], r["end"], r["name"]] }
        lanes, none = rows.partition { |r| r["count"].positive? }
        { "title" => title, "current" => current, "rows" => lanes, "none" => none.map { |r| r["name"] },
          "count" => rows.size }
      end
      lanes = groups.flat_map { |g| g["rows"] }
      return nil if lanes.empty?

      years = lanes.flat_map { |r| [r["start"], r["end"], r["last_paper"]] }
      first = years.min
      last = [years.max, now].max
      span = (first..last).to_a
      col = 100.0 / span.size
      at = ->(year) { LabCharts.pct(col * (year - first + 0.5)) }
      lanes.each do |r|
        # Papers spread evenly inside their year's column.
        per_year = r["papers"].group_by { |p| p["year"] }
        r["papers"].each do |p|
          same = per_year[p["year"]]
          p["x"] = LabCharts.pct(col * (p["year"] - first) + col * (same.index(p) + 1) / (same.size + 1))
        end
        # Solid lane: first paper to graduation (or now). Dashed tail: papers
        # that came out after graduating.
        xs = r["papers"].map { |p| p["x"] }
        during = r["papers"].reject { |p| p["year"] > r["end"] }.map { |p| p["x"] }
        if during.any?
          r["x0"] = xs.min
          r["x1"] = [at.call(r["end"]), during.max].max
        end
        if r["papers"].any? { |p| p["year"] > r["end"] }
          r["t0"] = r["x1"] || at.call(r["end"])
          r["t1"] = xs.max
        end
        r["xg"] = at.call(r["grad"]) if r["grad"]
      end
      { "first" => first, "last" => last, "now" => now,
        "ticks" => span.each_with_index.map { |y, i| { "year" => y, "x" => LabCharts.pct(col * (i + 0.5)) } },
        "groups" => groups.reject { |g| g["count"].zero? },
        # Totals count each person and paper once (a student can be in two
        # groups, e.g. an MSc graduate who is now a PhD student).
        "people" => groups.flat_map { |g| g["rows"].map { |r| r["name"] } + g["none"] }.uniq.size,
        "lanes" => lanes.map { |r| r["name"] }.uniq.size,
        "papers" => lanes.flat_map { |r| r["papers"].map { |p| p["key"] } }.uniq.size,
        "first_author" => lanes.flat_map { |r| r["papers"].select { |p| p["lead"] }.map { |p| p["key"] } }.uniq.size }
    end

    # students.yml has no start dates, so a lane starts at the student's first
    # paper with Chen; students without one are listed by name instead.
    def path_row(student, papers, current, now)
      ids = ([student["name"]] + Array(student["aliases"])).map { |n| ResearchData.person_id(n.to_s) }
      mine = papers.select { |p| (p["author_ids"] & ids).any? }.sort_by { |p| [p["year"], p["title"]] }
      grad = current ? nil : LabCharts.year_of(student["graduation_year"])
      years = mine.map { |p| p["year"] }
      list = mine.map do |p|
        { "year" => p["year"], "title" => p["title"], "line" => p["line"], "key" => p["key"],
          "lead" => ids.include?(p["author_ids"].first) }
      end
      # The spelling used in the papers, for a search link on Publications.
      query = mine.flat_map { |p| p["authors"] }.find { |a| ids.include?(ResearchData.person_id(a)) }
      {
        "name" => student["name"], "query" => query || student["name"], "current" => current, "grad" => grad,
        "start" => years.min || grad || now, "end" => current ? now : grad || now, "last_paper" => years.max,
        "count" => list.size, "lead" => list.count { |p| p["lead"] }, "papers" => list
      }
    end

    # ---------------------------------------------------- line co-authors ----
    # Co-authors ranked by joint papers in one line, with their first and last
    # year in it (x0/x1: position on the line's own year span).
    def line_people(research, all_people)
      papers = research["paper_list"] || []
      (research["lines"] || []).to_h do |line|
        key = line["key"]
        stats = Hash.new { |h, k| h[k] = { "count" => 0, "years" => [] } }
        papers.select { |p| Array(p["lines"]).include?(key) }.each do |p|
          (p["author_ids"] - ["c-hajaj"]).each do |id|
            stats[id]["count"] += 1
            stats[id]["years"] << p["year"]
          end
        end
        first = line["first"].to_i
        last = line["last"].to_i
        width = [last - first, 1].max
        ranked = stats.map do |id, s|
          person = all_people[id] || {}
          lo, hi = s["years"].minmax
          {
            "name" => person["name"] || id, "count" => s["count"], "first" => lo, "last" => hi,
            "student" => !person["role"].nil?, "line" => person["line"] || key,
            "x0" => LabCharts.pct((lo - first) * 100.0 / width), "x1" => LabCharts.pct((hi - first) * 100.0 / width)
          }
        end
        ranked.sort_by! { |p| [-p["count"], -p["last"], p["name"]] }
        top = ranked.first(8)
        [key, { "people" => top, "total" => ranked.size, "more" => ranked.size - top.size,
                "students" => ranked.count { |p| p["student"] }, "first" => first, "last" => last }]
      end
    end
  end
end
