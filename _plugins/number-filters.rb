# Liquid filter: {{ 482900 | thousands }} -> "482,900"
module Jekyll
  module NumberFilters
    def thousands(input)
      return input if input.nil?
      n = input.to_s.gsub(/[^\d.-]/, "")
      return input if n.empty?
      whole, frac = n.split(".")
      whole = whole.reverse.scan(/\d{1,3}/).join(",").reverse
      whole = "-" + whole if n.start_with?("-")
      frac ? "#{whole}.#{frac}" : whole
    end
  end
end

Liquid::Template.register_filter(Jekyll::NumberFilters)
