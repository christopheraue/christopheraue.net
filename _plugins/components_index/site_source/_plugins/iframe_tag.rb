module Jekyll
  module ComponentsIndex
    class IframeTag < Liquid::Block
      def render(context)
        site = context.registers[:site]
        page = context.registers[:page]
        comp = page['component']
        page['iframe_count'] ||= 0
        page['iframe_count'] += 1
        dir = page['url']
        name = "iframe#{page['iframe_count']}"
        url = "#{dir}/#{name}"

        site.components.used.capture_and_bundle_assets_into dir, prefix: "#{name}-" do
          iframe_page = Jekyll::PageWithoutAFile.new site, site.source, dir, "#{name}.html"
          iframe_page.data['layout'] = 'root'
          iframe_page.data['render_inside'] = 'componentIndex-IframeRoot'
          iframe_page.data['title'] = "#{comp.name} #{name.capitalize}"
          iframe_page.data['asset_path'] = "/#{URL_PATH}#{url}-"
          iframe_page.data['iframe_src'] = "/#{URL_PATH}#{url}"
          iframe_page.content = super
          iframe_page.render site.layouts, context
          site.pages << iframe_page
        end

        # Call .parse instead of .new since .new is private
        block = Components::Tags::Block.parse('block', 'componentIndex-Iframe', :no_tokens, @parse_context)
        block.render(context)
      end
    end

    Liquid::Template.register_tag('componentIndexIframe', IframeTag)
  end
end