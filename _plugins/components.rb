module Jekyll
  module Components
    DIRNAME = '_components'.freeze
    MARKUP_FILENAME = 'markup.html'.freeze
    STYLES_FILENAME = 'styles.sass'.freeze
    SYNCJS_FILENAME = 'sync.js'.freeze
    ASYNCJS_FILENAME = 'async.js'.freeze

    class AssetGenerator < Jekyll::Generator
      STYLES_FILE = '/assets/styles.sass'.freeze
      SYNCJS_FILE = '/assets/sync.rjs'.freeze
      ASYNCJS_FILE = '/assets/async.rjs'.freeze

      def generate(site)
        styles_page = site.pages.find{ |p| File.join(p.dir, p.name) == STYLES_FILE }
        syncjs_page = site.pages.find{ |p| File.join(p.dir, p.name) == SYNCJS_FILE }
        asyncjs_page = site.pages.find{ |p| File.join(p.dir, p.name) == ASYNCJS_FILE }

        Dir.glob("#{DIRNAME}/*/").sort.each do |component_path|
          styles_path = File.join component_path, STYLES_FILENAME
          syncjs_path = File.join component_path, SYNCJS_FILENAME
          asyncjs_path = File.join component_path, ASYNCJS_FILENAME

          if File.exist? styles_path
            styles_page.content += "\n@import \"#{styles_path.chomp('.sass')}\""
          end

          if File.exist? syncjs_path
            syncjs_page.content += "\nrequire(['#{syncjs_path.chomp('.js')}'])"
          end

          if File.exist? asyncjs_path
            asyncjs_page.content += "\nrequire(['#{asyncjs_path.chomp('.js')}'])"
          end
        end
      end
    end

    class Tag < Jekyll::Tags::IncludeTag
      def tag_includes_dirs(context)
        [DIRNAME].freeze
      end

      def locate_include_file(context, file, safe)
        super context, File.join(file, MARKUP_FILENAME), safe
      end
    end

    Liquid::Template.register_tag("component", Tag)
  end
end