module Jekyll
  module Components
    module Tags
      class IncludePartial < Jekyll::Tags::IncludeTag
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

      Liquid::Template.register_tag('include_partial', IncludePartial)
    end
  end
end