module Jekyll
  module Components
    module Tags
      class Container < Liquid::Block
        def render_with_drop(context, parameter_drop)
          # Call .parse instead of .new since .new is private
          block = Block.parse(@tag_name, @markup, :no_tokens, @parse_context)
          block.render(context, parameter_drop)
        end
      end

      class ContainerWithLexicallyScopedBody < Container
        def render(context)
          render_with_drop context, Drops::Parameter.new(super)
        end
      end

      class ContainerWithDynamicallyScopedBody < Container
        def render(context)
          render_with_drop context, Drops::Parameter.new(->{ super })
        end
      end

      Liquid::Template.register_tag('container', ContainerWithLexicallyScopedBody)
      Liquid::Template.register_tag('container_with_dynamically_scoped_body', ContainerWithDynamicallyScopedBody)
    end
  end
end