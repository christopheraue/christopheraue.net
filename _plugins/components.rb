module Jekyll
  module Components
    Error = Class.new(StandardError)

    COMPONENTS = Dir.glob('**/_components/*/').sort.freeze

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

      components = Dir.glob('**/_components/_base').sort + site.data[:used_component_paths].to_a.sort
      components.each do |component_path|
        comp_name = (component_path.sub '_components/', '').chomp '/'

        if File.exist? File.join(component_path, '_styles.sass')
          styles.content += "@import \"#{File.join component_path, '_styles'}\"\n"
        end

        if File.exist? File.join(component_path, '_sync.js')
          syncjs.content += "require(['#{comp_name}/_sync'])\n"
        end

        if File.exist? File.join(component_path, '_async.js')
          asyncjs.content += "require(['#{comp_name}/_async'])\n"
        end

        if File.exist? File.join(component_path, '_last.js')
          last_js << "require(['#{comp_name}/_last'])"
        end

        rjs_packages << "{name: '#{comp_name}', location: '#{component_path.chomp '/'}'}"
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

      def dir(context)
        name = render_variable(context, @name_src)
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
        parent = context.registers[:current_component]
        current = dir(context)
        context.registers[:current_component] = current
        context.registers[:site].data[:used_component_paths].add current
        super
      ensure
        context.registers[:current_component] = parent
      end
    end

    class ContainerTag < Liquid::Block
      def render(context)
        # Call .parse instead of .new since .new is private
        block = BlockTag.parse(@tag_name, "#{@markup} content=\"\"", :no_tokens, @parse_context)

        context.stack do
          container_parent = context.registers[:current_component]
          context['container'] = ContainerDrop.new do
            begin
              parent = context.registers[:current_component]
              context.registers[:current_component] = container_parent
              super
            ensure
              context.registers[:current_component] = parent
            end
          end
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
        [File.join(context.registers[:current_component], '_partials')].freeze
      end

      def render(context)
        unless context.registers[:current_component]
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