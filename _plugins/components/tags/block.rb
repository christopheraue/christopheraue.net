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
          site = context.registers[:site]
          name = render_variable(context, @name_src)
          path = Component.path_from_name site, name
          if File.directory? path and not outside_site_source?(path, File.dirname(path), site.safe)
            path
          else
            raise IOError, begin
              "Could not locate component #{name} with path '#{path}'. Ensure it " \
              "exists and" << if site.safe
                                " is not a symlink as those are not allowed in safe mode."
                              else
                                ", if it is a symlink, does not point outside your site source."
                              end
            end
          end
        end

        def render(context, parameter_drop = Drops::Parameter.new)
          site = context.registers[:site]
          parent = context.registers[:current_component]
          context.registers[:current_component] = site.used_components[path context]
          context.stack do
            context['param'] = parameter_drop
            super context
          end
        ensure
          context.registers[:current_component] = parent
        end
      end

      Liquid::Template.register_tag('block', Block)
    end
  end
end