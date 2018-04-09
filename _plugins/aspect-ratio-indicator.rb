require 'base64'

module Jekyll
  module Tags
    class AspectRatioIndicatorTag < Liquid::Tag

      def initialize(tag_name, size, options)
        @size = size
        super
      end

      def render(context)
        svg = "<svg viewBox=\"0 0 #{@size.strip}\" xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\"></svg>"
        "<img class=\"aspect-ratio-indicator\" src=\"data:image/svg+xml;base64,#{Base64.strict_encode64(svg)}\">"
      end
    end
  end
end

Liquid::Template.register_tag('aspect_ratio_indicator', Jekyll::Tags::AspectRatioIndicatorTag)