module Jekyll
  module Components
    Error = Class.new(StandardError)

    SRC_RJSCONFIG_PATH = '_build/rjs_config.template.js'.freeze
    DST_RJSCONFIG_PATH = '_build/tmp/rjs_config.js'.freeze
    RJSCONFIG_PACKAGES_PLACEHOLDER = '/* DYNAMIC_PACKAGES_CONFIG */'.freeze

    Jekyll::Hooks.register :site, :pre_render do |site|
      site.data[:used_component_paths] = Set.new
    end

    Jekyll::Hooks.register :site, :post_render do |site|
      styles, syncjs, asyncjs = %w(styles.sass sync.rjs async.rjs).map do |filename|
        extname = File.extname(filename)
        basename = File.basename(filename, extname)
        fingerprinted_filename = "#{basename}-#{Digest::MD5.hexdigest site.time.to_i.to_s}#{extname}"

        page = Jekyll::PageWithoutAFile.new site, site.source, '/', fingerprinted_filename
        page.data['layout'] = 'none'
        page.content = ''
        page
      end

      rjsconfig = File.read(SRC_RJSCONFIG_PATH)
      rjs_packages = []

      last_js = []

      components = ['_components/_base'] + site.data[:used_component_paths].to_a.sort
      components.each do |component_path|
        *dir_parts, _components, base = component_path.split('/')
        component = [*dir_parts, base].join '-'

        if File.exist? File.join(component_path, '_styles.sass')
          styles.content += "@import \"#{File.join component_path, '_styles'}\"\n"
        end

        if File.exist? File.join(component_path, '_sync.js')
          syncjs.content += "require(['#{component}/_sync'])\n"
        end

        if File.exist? File.join(component_path, '_async.js')
          asyncjs.content += "require(['#{component}/_async'])\n"
        end

        if File.exist? File.join(component_path, '_last.js')
          last_js << "require(['#{component}/_last'])"
        end

        rjs_packages << "{name: '#{component}', location: '#{component_path.chomp '/'}'}"
      end

      Dir.glob('**/_skin/').sort.each do |skin_path|
        components.each do |component_path|
          *dir_parts, _components, base = component_path.split('/')
          component = [*dir_parts, base].join '-'
          skin_component_path = File.join skin_path, component
          if File.exist? "#{skin_component_path}.sass"
            styles.content += "@import \"#{skin_component_path}\"\n"
          end
        end
      end

      asyncjs.content += last_js.join "\n"

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
        [dir(context)].freeze
      end

      def name(context)
        render_variable(context, @name_src)
      end

      def dir(context)
        name = name(context)
        *dir_parts, base = name.split('-')
        dir = File.join *dir_parts, '_components'
        path = File.join dir, base

        site = context.registers[:site]
        if File.directory?(path) && !outside_site_source?(path, dir, site.safe)
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
        parent = context.registers[:current_component_path]
        context.registers[:current_component_path] = dir(context)
        context.registers[:site].data[:used_component_paths].add dir(context)
        super
      ensure
        context.registers[:current_component_path] = parent
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
        [File.join(context.registers[:current_component_path], '_partials')].freeze
      end

      def render(context)
        unless context.registers[:current_component_path]
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