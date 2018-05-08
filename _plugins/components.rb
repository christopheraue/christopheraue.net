module Jekyll
  module Components
    Error = Class.new(StandardError)

    COMPONENTS = Dir.glob('**/_components/*/').sort.freeze
    COMPONENT_PATHS = Dir.glob('**/_components/').sort.freeze
    MARKUP_FILENAME = '_markup.html'.freeze
    STYLES_FILENAME = '_styles.sass'.freeze
    SYNCJS_FILENAME = '_sync.js'.freeze
    ASYNCJS_FILENAME = '_async.js'.freeze

    SRC_RJSCONFIG_PATH = '_build/rjs_config.template.js'.freeze
    DST_RJSCONFIG_PATH = '_build/tmp/rjs_config.js'.freeze
    RJSCONFIG_PACKAGES_PLACEHOLDER = '/* DYNAMIC_PACKAGES_CONFIG */'.freeze

    class AssetGenerator < Jekyll::Generator
      STYLES_FILE = '/assets/styles.sass'.freeze
      SYNCJS_FILE = '/assets/sync.rjs'.freeze
      ASYNCJS_FILE = '/assets/async.rjs'.freeze

      def generate(site)
        styles_page = site.pages.find{ |p| File.join(p.dir, p.name) == STYLES_FILE }
        syncjs_page = site.pages.find{ |p| File.join(p.dir, p.name) == SYNCJS_FILE }
        asyncjs_page = site.pages.find{ |p| File.join(p.dir, p.name) == ASYNCJS_FILE }

        rjsconfig = File.read(SRC_RJSCONFIG_PATH)
        rjs_packages = []

        COMPONENTS.each do |component_path|
          comp_name = File.basename component_path
          styles_path = File.join component_path, STYLES_FILENAME
          syncjs_path = File.join component_path, SYNCJS_FILENAME
          asyncjs_path = File.join component_path, ASYNCJS_FILENAME

          if File.exist? styles_path
            styles_page.content += "\n@import \"#{styles_path.chomp('.sass')}\""
          end

          if File.exist? syncjs_path
            syncjs_page.content += "\nrequire(['#{comp_name}/#{SYNCJS_FILENAME.chomp('.js')}'])"
          end

          if File.exist? asyncjs_path
            asyncjs_page.content += "\nrequire(['#{comp_name}/#{ASYNCJS_FILENAME.chomp('.js')}'])"
          end

          rjs_packages << "{name: '#{comp_name}', location: '#{component_path.chomp '/'}'}"
        end

        rjsconfig.sub! RJSCONFIG_PACKAGES_PLACEHOLDER, rjs_packages.join(",\n")
        File.write(DST_RJSCONFIG_PATH, rjsconfig)
      end
    end

    class BlockTag < Jekyll::Tags::IncludeTag
      def initialize(*)
        super
        @file = File.join(@file, MARKUP_FILENAME)
      end

      def tag_includes_dirs(context)
        COMPONENT_PATHS
      end

      def dir(context)
        site = context.registers[:site]
        name = File.dirname(render_variable(context) || @file)
        tag_includes_dirs(context).each do |dir|
          path = File.join(dir, name)
          return path if valid_include_dir?(path, dir, site.safe)
        end
        raise IOError, could_not_locate_message(name, tag_includes_dirs(context), site.safe)
      end

      def valid_include_dir?(path, dir, safe)
        !outside_site_source?(path, dir, safe) && File.directory?(path)
      end

      def render(context)
        context.registers[:current_component_dir] = dir(context)
        super
      ensure
        context.registers.delete :current_component_dir
      end
    end

    class ContainerTag < Liquid::Block
      def render(context)
        # Call .parse instead of .new since .new is private
        block = BlockTag.parse(@tag_name, "#{@markup} content=\"\"", :no_tokens, @parse_context)
        context.stack do
          context['container'] = ContentDrop.new{ super }
          block.render(context)
        end
      end

      class ContentDrop < Liquid::Drop
        def initialize(&content_renderer)
          @content_renderer = content_renderer
        end

        def content
          @content_renderer.call
        end
      end
    end

    class IncludePartialTag < Jekyll::Tags::IncludeTag
      def tag_includes_dirs(context)
        [File.join(context.registers[:current_component_dir], '_partials')].freeze
      end

      def render(context)
        unless context.registers[:current_component_dir]
          raise Error, "include_partials tag not supported outside of components"
        end
        super
      end
    end

    Liquid::Template.register_tag('container', ContainerTag)
    Liquid::Template.register_tag('block', BlockTag)
    Liquid::Template.register_tag('list', ContainerTag)
    Liquid::Template.register_tag('item', BlockTag)
    Liquid::Template.register_tag('include_partial', IncludePartialTag)
  end
end