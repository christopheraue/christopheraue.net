module Jekyll
  module Components
    COMPONENTS = Dir.glob('**/_components/*/').sort.freeze
    COMPONENT_PATHS = Dir.glob('**/_components/').sort.freeze
    MARKUP_FILENAME = '_markup.html'.freeze
    STYLES_FILENAME = '_styles.sass'.freeze
    SYNCJS_FILENAME = '_sync.js'.freeze
    ASYNCJS_FILENAME = '_async.js'.freeze

    class AssetGenerator < Jekyll::Generator
      STYLES_FILE = '/assets/styles.sass'.freeze
      SYNCJS_FILE = '/assets/sync.rjs'.freeze
      ASYNCJS_FILE = '/assets/async.rjs'.freeze

      def generate(site)
        styles_page = site.pages.find{ |p| File.join(p.dir, p.name) == STYLES_FILE }
        syncjs_page = site.pages.find{ |p| File.join(p.dir, p.name) == SYNCJS_FILE }
        asyncjs_page = site.pages.find{ |p| File.join(p.dir, p.name) == ASYNCJS_FILE }

        COMPONENTS.each do |component_path|
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

    class ComponentTag < Jekyll::Tags::IncludeTag
      attr_accessor :additional_params

      def tag_includes_dirs(context)
        COMPONENT_PATHS
      end

      def locate_include_file(context, file, safe)
        super context, File.join(file, MARKUP_FILENAME), safe
      end

      def parse_params(context)
        params = super
        params.merge! @additional_params if @additional_params
        params
      end
    end

    class ContainerTag < Liquid::Block
      def render(context)
        @component = ComponentTag.parse(@tag_name, "#{@markup} content=\"\"", :no_tokens, @parse_context)
        @component.additional_params = {'content' => super}
        @component.render(context)
      end
    end

    Liquid::Template.register_tag('component', ComponentTag)
    Liquid::Template.register_tag('container', ContainerTag)
  end
end