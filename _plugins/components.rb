module Jekyll
  module Components
    Error = Class.new(StandardError)

    SRC_RJSCONFIG_PATH = '_build/rjs_config.template.js'.freeze
    DST_RJSCONFIG_PATH = '_build/tmp/rjs_config.js'.freeze
    RJSCONFIG_PACKAGES_PLACEHOLDER = '/* DYNAMIC_PACKAGES_CONFIG */'.freeze

    class Component
      STYLES_FILENAME = '_styles'.freeze
      ASNYCJS_FILENAME = '_async'.freeze
      SNYCJS_FILENAME = '_sync'.freeze
      LASTJS_FILENAME = '_last'.freeze

      def initialize(path)
        @path = path.chomp '/'
      end

      attr_reader :path

      def name
        @name ||= begin
          *path_parts, _components, base = @path.split '/'
          [*path_parts, base].join '-'
        end
      end

      def styles_exist?
        File.exist? "#{File.join @path, STYLES_FILENAME}.sass"
      end

      def sync_js_exists?
        File.exist? "#{File.join @path, SNYCJS_FILENAME}.js"
      end

      def async_js_exists?
        File.exist? "#{File.join @path, ASNYCJS_FILENAME}.js"
      end

      def last_js_exists?
        File.exist? "#{File.join @path, LASTJS_FILENAME}.js"
      end

      def skin_exists?(skin_path)
        File.exist? "#{File.join skin_path, name}.sass"
      end

      def styles_import
        "@import \"#{File.join @path, STYLES_FILENAME}\""
      end

      def syncjs_require
        "require(['#{name}/#{SNYCJS_FILENAME}']);"
      end

      def asyncjs_require
        "require(['#{name}/#{ASNYCJS_FILENAME}']);"
      end

      def lastjs_require
        "require(['#{name}/#{LASTJS_FILENAME}']);"
      end

      def skin_import(skin_path)
        "@import \"#{File.join skin_path, name}\""
      end

      def rjs_package
        "{name: '#{name}', location: '#{@path}'}"
      end

      def <=>(other)
        @path <=> other.path
      end
    end

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
    
    Jekyll::Hooks.register :site, :pre_render do |site|
      site.data[:used_components] = {}
    end

    Jekyll::Hooks.register :site, :post_render do |site|
      styles, syncjs, asyncjs = %w(styles.sass sync.rjs async.rjs).map do |filename|
        AssetFile.new site, filename
      end

      rjs_packages = []

      skin_paths = Dir.glob('**/_skin/').sort
      components = [Component.new('_components/_base')] + site.data[:used_components].values.sort

      components.each do |component|
        styles << component.styles_import if component.styles_exist?
        skin_paths.each do |skin_path|
          styles << component.skin_import(skin_path) if component.skin_exists? skin_path
        end

        syncjs << component.syncjs_require if component.sync_js_exists?
        asyncjs << component.asyncjs_require if component.async_js_exists?
        asyncjs.last component.lastjs_require if component.last_js_exists?
        rjs_packages << component.rjs_package
      end

      rjsconfig = File.read(SRC_RJSCONFIG_PATH)
      rjsconfig.sub! RJSCONFIG_PACKAGES_PLACEHOLDER, rjs_packages.join(",\n")
      File.write(DST_RJSCONFIG_PATH, rjsconfig)

      [styles, syncjs, asyncjs].each(&:render)
    end

    class BlockTag < Jekyll::Tags::IncludeTag
      def initialize(*)
        super
        @name_src = @file
        @file = '_markup.html'
      end

      def render_variable(context, var = @file)
        if var =~ VARIABLE_SYNTAX
          partial = context.registers[:site]
                      .liquid_renderer
                      .file("(variable)")
                      .parse(var)
          partial.render!(context)
        else
          var
        end
      end

      def tag_includes_dirs(context)
        [path(context)].freeze
      end

      def path(context)
        name = render_variable(context, @name_src)
        *dir_parts, base = name.split('-')
        dir = File.join *dir_parts, '_components'
        path = File.join dir, base

        site = context.registers[:site]
        if File.directory? path and not outside_site_source?(path, dir, site.safe)
          path
        else
          raise IOError, begin
            "Could not locate component #{name} with path '#{path}'. Ensure it " \
            "exists and" <<
            if site.safe
              " is not a symlink as those are not allowed in safe mode."
            else
              ", if it is a symlink, does not point outside your site source."
            end
          end
        end
      end

      def render(context)
        parent = context.registers[:current_component]
        path = path(context)
        component = context.registers[:site].data[:used_components][path] ||= Component.new(path)
        context.registers[:current_component] = component
        super
      ensure
        context.registers[:current_component] = parent
      end
    end

    class ContainerWithLexicallyScopedBodyTag < Liquid::Block
      def render(context)
        # Call .parse instead of .new since .new is private
        block = BlockTag.parse(@tag_name, "#{@markup} content=\"\"", :no_tokens, @parse_context)
        container_drop = ContainerDrop.new(super)

        context.stack do
          context['container'] = container_drop
          block.render(context)
        end
      end

      class ContainerDrop < Liquid::Drop
        def initialize(content)
          @content = content
        end

        attr_reader :content
      end
    end

    class ContainerWithDynamicallyScopedBodyTag < Liquid::Block
      def render(context)
        # Call .parse instead of .new since .new is private
        block = BlockTag.parse(@tag_name, "#{@markup} content=\"\"", :no_tokens, @parse_context)
        container_drop = ContainerDrop.new{ super }

        context.stack do
          context['container'] = container_drop
          block.render(context)
        end
      end

      class ContainerDrop < Liquid::Drop
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
        [File.join(context.registers[:current_component].path, '_partials')].freeze
      end

      def render(context)
        unless context.registers[:current_component]
          raise Error, "include_partials tag not supported outside of components"
        end
        super
      end
    end

    Liquid::Template.register_tag('container', ContainerWithLexicallyScopedBodyTag)
    Liquid::Template.register_tag('container_with_dynamically_scoped_body', ContainerWithDynamicallyScopedBodyTag)
    Liquid::Template.register_tag('block', BlockTag)
    Liquid::Template.register_tag('include_partial', IncludePartialTag)
  end
end