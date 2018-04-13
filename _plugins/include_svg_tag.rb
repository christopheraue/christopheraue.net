require 'base64'

# Internet Explorer does not properly scale inline SVGs. But it does scale
# SVGs embedded with an image tag. We can use that fact to implement consistent
# SVG scaling across all browsers:
# We create a container element having `display: inline-block` which causes its
# dimensions to be determined by its content. Then we place an image with an
# empty dummy SVG inside it. The dummy SVG has the same viewBox as the inlined
# SVG. Giving the image a width or height properly scales the container. The
# inlined SVG is then absolutely positioned to span the whole area of the
# container.

module Jekyll
  module Tags
    module IncludeSvgRenderer
      def render(context)
        output = super

        params = parse_params(context)
        container_tag = params['container_tag'] || 'div'
        viewbox = output[/viewBox="[^"]+"/]
        ratio_svg = "<svg #{viewbox} xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\"></svg>"

        <<~HTML
          <#{container_tag} class="scaling-svg">
            <img class="aspect-ratio-indicator" src="data:image/svg+xml;base64,#{Base64.strict_encode64(ratio_svg)}">
            #{output}
          </#{container_tag}>
        HTML
      end
    end

    class IncludeSvgTag < IncludeTag
      include IncludeSvgRenderer
    end

    class IncludeRelativeSvgTag < IncludeRelativeTag
      include IncludeSvgRenderer
    end
  end
end

Liquid::Template.register_tag('include_svg', Jekyll::Tags::IncludeSvgTag)
Liquid::Template.register_tag('include_relative_svg', Jekyll::Tags::IncludeRelativeSvgTag)