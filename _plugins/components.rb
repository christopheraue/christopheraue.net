module Jekyll
  module Components
    Error = Class.new(StandardError)

    COMPONENTS = Dir.glob('**/_components/*/').sort.freeze
    COMPONENT_PATHS = Dir.glob('**/_components/').sort.freeze

    SRC_RJSCONFIG_PATH = '_build/rjs_config.template.js'.freeze
    DST_RJSCONFIG_PATH = '_build/tmp/rjs_config.js'.freeze
    RJSCONFIG_PACKAGES_PLACEHOLDER = '/* DYNAMIC_PACKAGES_CONFIG */'.freeze

    Jekyll::Hooks.register :site, :post_render do |site|
      styles, syncjs, asyncjs = %w(styles.sass sync.rjs async.rjs).map do |filename|
        extname = File.extname(filename)
        basename = File.basename(filename, extname)
        fingerprinted_filename = "#{basename}-#{Digest::MD5.hexdigest site.time.to_i.to_s}#{extname}"

        page = Jekyll::PageWithoutAFile.new site, site.source, 'assets/', fingerprinted_filename
        page.data['layout'] = 'none'
        page.content = ''
        page
      end

      rjsconfig = File.read(SRC_RJSCONFIG_PATH)
      rjs_packages = []

      COMPONENTS.each do |component_path|
        comp_name = File.basename component_path

        if File.exist? File.join(component_path, '_styles.sass')
          styles.content += "@import \"#{File.join component_path, '_styles'}\"\n"
        end

        if File.exist? File.join(component_path, '_sync.js')
          syncjs.content += "require(['#{comp_name}/_sync'])\n"
        end

        if File.exist? File.join(component_path, '_async.js')
          asyncjs.content += "require(['#{comp_name}/_async'])\n"
        end

        rjs_packages << "{name: '#{comp_name}', location: '#{component_path.chomp '/'}'}"
      end

      rjsconfig.sub! RJSCONFIG_PACKAGES_PLACEHOLDER, rjs_packages.join(",\n")
      File.write(DST_RJSCONFIG_PATH, rjsconfig)

      styles.render site.layouts, site.site_payload
      syncjs.render site.layouts, site.site_payload
      asyncjs.render site.layouts, site.site_payload

      site.pages << styles << syncjs << asyncjs
    end

    class BlockTag < Jekyll::Tags::IncludeTag
      def initialize(*)
        super
        @file = File.join(@file, '_markup.html')
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