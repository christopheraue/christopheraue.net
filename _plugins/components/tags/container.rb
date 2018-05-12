module Jekyll
  module Components
    module Tags
      class ParameterDrop < Liquid::Drop
        def initialize(content)
          @content = content
        end

        def content
          if @content.respond_to? :call
            @content.call
          else
            @content
          end
        end

        def liquid_method_missing(m)
          Liquid::VariableLookup.parse("include.#{m}").evaluate(@context)
        end
      end

      class Container < Liquid::Block
        def render_with_drop(context, parameter_drop)
          # Call .parse instead of .new since .new is private
          block = Block.parse(@tag_name, "#{@markup} content=\"\"", :no_tokens, @parse_context)
          context.stack do
            context['param'] = parameter_drop
            block.render(context)
          end
        end
      end

      class ContainerWithLexicallyScopedBody < Container
        def render(context)
          render_with_drop context, ParameterDrop.new(super)
        end
      end

      class ContainerWithDynamicallyScopedBody < Container
        def render(context)
          render_with_drop context, ParameterDrop.new(->{ super })
        end
      end

      Liquid::Template.register_tag('container', ContainerWithLexicallyScopedBody)
      Liquid::Template.register_tag('container_with_dynamically_scoped_body', ContainerWithDynamicallyScopedBody)
    end
  end
end