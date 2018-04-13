module Jekyll
  module Tags
    class PreserveAspectRatioTag < Liquid::Block
      include PreserveAspectRatioMarkup

      def initialize(tag_name, ratio, options)
        super
        @width, @height = ratio.strip.split '/'
      end

      def render(*)
        preserve_aspect_ratio_markup 'div', @width, @height, super
      end
    end
  end
end

Liquid::Template.register_tag('preserve_aspect_ratio', Jekyll::Tags::PreserveAspectRatioTag)