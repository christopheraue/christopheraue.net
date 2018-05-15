module Jekyll
  class Components
    class AssetFile
      def initialize(site, dir, filename, content_delimiter)
        @site = site
        @content_delimiter = content_delimiter

        extname = File.extname(filename)
        basename = File.basename(filename, extname)
        fingerprinted_filename = "#{basename}-#{Digest::MD5.hexdigest @site.time.to_i.to_s}#{extname}"

        @page = Jekyll::PageWithoutAFile.new @site, @site.source, dir, fingerprinted_filename
        @page.data['layout'] = 'none'
        @content = []
        @after_content = []
      end
      
      attr_reader :content, :after_content

      def render
        @page.content = (@content + @after_content).join @content_delimiter
        @page.render @site.layouts, @site.site_payload
        @site.pages << @page
      end
    end
  end
end