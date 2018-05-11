module Jekyll
  module Components
    class AssetFile
      def initialize(site, filename)
        @site = site

        extname = File.extname(filename)
        basename = File.basename(filename, extname)
        fingerprinted_filename = "#{basename}-#{Digest::MD5.hexdigest @site.time.to_i.to_s}#{extname}"

        @page = Jekyll::PageWithoutAFile.new @site, @site.source, '/', fingerprinted_filename
        @page.data['layout'] = 'none'
        @bulk = []
        @last = []
      end

      def <<(content)
        @bulk << content
      end

      def last(content)
        @last << content
      end

      def render
        @page.content = @bulk.join("\n") + @last.join("\n")
        @page.render @site.layouts, @site.site_payload
        @site.pages << @page
      end
    end
  end
end