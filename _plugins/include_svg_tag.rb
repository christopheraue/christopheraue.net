# Internet Explorer does not properly scale inline SVGs. But it does scale
# SVGs embedded with an image tag. We can use that fact to implement consistent
# SVG scaling across all browsers:
# We create a container element having `display: inline-block` which causes its
# dimensions to be determined by its content. Then we place an image with an
# empty dummy SVG inside it. The dummy SVG has the same viewBox as the inlined
# SVG. Giving the image a width or height properly scales the container. The
# inlined SVG is then absolutely positioned to span the whole area of the
# container.

require_relative 'preserve_aspect_ratio_markup'

module Jekyll
  module Tags
    module SvgRenderer
      include PreserveAspectRatioMarkup

      def wrap_svg(svg, context)
        params = parse_params(context)
        tag = params['container_tag'] || 'div'
        number = '\d+(?:\.\d+)?'
        match = svg.match /viewBox="#{number} #{number} (#{number}) (#{number})"/
        width = match[1]
        height = match[2]

        preserve_aspect_ratio_markup tag, width, height, svg
      end

      def render(context)
        if @file.end_with? '.svg'
          wrap_svg(super, context)
        else
          super
        end
      end
    end

    class IncludeTag
      prepend SvgRenderer
    end

    class IncludeRelativeTag
      prepend SvgRenderer
    end
  end
end