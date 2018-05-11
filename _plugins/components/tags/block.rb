module Jekyll
  module Components
    module Tags
      class Block < Jekyll::Tags::IncludeTag
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
          context.registers[:current_component] = Component.instance(path context)
          super
        ensure
          context.registers[:current_component] = parent
        end
      end

      Liquid::Template.register_tag('block', Block)
    end
  end
end