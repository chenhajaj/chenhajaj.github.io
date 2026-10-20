# Liquid filter: {{ entry.bibtex | clean_bibtex }}
#
# Returns a citation-ready BibTeX string for the "BibTeX" panel on the
# publications list. Removes site-internal fields (abstract, projects,
# selected, plus everything in `filtered_bibtex_keywords` in _config.yml),
# including values that span several lines, which the older
# hideCustomBibtex regex could not handle.
require "bibtex"

module Jekyll
  module CleanBibtex
    INTERNAL = %w[abstract projects selected category].freeze

    def clean_bibtex(input)
      return "" if input.nil? || input.to_s.strip.empty?

      site = @context.registers[:site]
      drop = (INTERNAL + Array(site.config["filtered_bibtex_keywords"])).map { |k| k.to_s.downcase }

      begin
        bib = BibTeX.parse(input.to_s, filter: [])
        entry = bib.data.find { |e| e.is_a?(BibTeX::Entry) }
        return input.to_s.strip if entry.nil?

        entry.fields.keys.each do |key|
          entry.delete(key) if drop.include?(key.to_s.downcase)
        end
        entry.to_s.strip
      rescue StandardError
        input.to_s.strip
      end
    end
  end
end

Liquid::Template.register_filter(Jekyll::CleanBibtex)
