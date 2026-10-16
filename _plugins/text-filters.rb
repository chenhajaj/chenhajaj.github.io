# frozen_string_literal: true

# Liquid filter: {{ html | strip_emoji }}
# Removes pictographic emoji (and their joiners and variation selectors) from
# text as it is displayed, so news items read cleanly. The source files keep
# their emoji.
module Jekyll
  module TextFilters
    EMOJI = /(?:[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{1F1E6}-\u{1F1FF}][\u{FE0F}\u{200D}\u{1F3FB}-\u{1F3FF}]*)+/u

    def strip_emoji(input)
      return input if input.nil?

      input.to_s.gsub(EMOJI, "").gsub(/[\u{FE0F}\u{200D}]/u, "").gsub(/[ \t]+(<\/|$)/, '\1').gsub(/ {2,}/, " ")
    end
  end
end

Liquid::Template.register_filter(Jekyll::TextFilters)
