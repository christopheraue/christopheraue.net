require 'base64'

module Jekyll
  module Tags
    module PreserveAspectRatioMarkup
      def preserve_aspect_ratio_markup(tag, width, height, content)
        viewbox = "viewBox=\"0 0 #{width} #{height}\""
        ratio_svg = "<svg #{viewbox} xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\"></svg>"

        <<~HTML
          <#{tag} class="aspect-ratio-preservation-area">
            <img class="size" src="data:image/svg+xml;base64,#{Base64.strict_encode64(ratio_svg)}">
            #{content}
          </#{tag}>
        HTML
      end
    end
  end
end