module Jekyll
  module Components
    module Tags
      class ContainerDrop < Liquid::Drop
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
      end

      class Container < Liquid::Block
        def render_with_drop(context, container_drop)
          # Call .parse instead of .new since .new is private
          block = Block.parse(@tag_name, "#{@markup} content=\"\"", :no_tokens, @parse_context)
          context.stack do
            context['container'] = container_drop
            block.render(context)
          end
        end
      end

      class ContainerWithLexicallyScopedBody < Container
        def render(context)
          render_with_drop context, ContainerDrop.new(super)
        end
      end

      class ContainerWithDynamicallyScopedBody < Container
        def render(context)
          render_with_drop context, ContainerDrop.new(->{ super })
        end
      end

      Liquid::Template.register_tag('container', ContainerWithLexicallyScopedBody)
      Liquid::Template.register_tag('container_with_dynamically_scoped_body', ContainerWithDynamicallyScopedBody)
    end
  end
end