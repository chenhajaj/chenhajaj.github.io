# frozen_string_literal: true

# Build-time data for the funding list and the per-line co-author chart:
#
#   site.data["charts"]["funding"]      grant total and list (no amounts per grant)
#                                       (_includes/grants_table.liquid)
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
        "line_people" => line_people(research, people)
      }
    end

    private

    # ------------------------------------------------------------ funding ----
    # The total per currency and the grants, newest first. Individual amounts
    # are not shown on the site.
    def funding(site, _now)
      grants = Array((site.data["grants"] || {})["grants"])
      return nil if grants.empty?

      rows = %w[NIS USD].filter_map do |cur|
        list = grants.select { |g| g["currency"] == cur }
        next if list.empty?

        items = list.sort_by { |g| [-g["year"].to_i, -g["amount"].to_i] }.map { |g| grant_item(g) }
        CURRENCY[cur].merge("currency" => cur, "count" => list.size,
                            "total" => list.sum { |g| g["amount"].to_i },
                            "total_m" => format("%.1f", list.sum { |g| g["amount"].to_i } / 1_000_000.0),
                            "items" => items)
      end
      order = Array((site.data["research_lines"] || {})["lines"]).map { |l| l["key"] } + ["other"]
      used = grants.map { |g| g["line"] || "other" }.uniq.sort_by { |k| order.index(k) || order.size }
      { "lines" => used, "rows" => rows }
    end

    def grant_item(grant)
      { "name" => grant["full_name"], "org" => grant["organization"], "year" => grant["year"].to_i,
        "pi" => grant["role"].to_s.casecmp("PI").zero?, "line" => grant["line"] || "other" }
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
