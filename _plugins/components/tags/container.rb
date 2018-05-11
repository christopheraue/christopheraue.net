module Jekyll
  module Components
    module Tags
      class ContainerWithLexicallyScopedBody < Liquid::Block
        def render(context)
          # Call .parse instead of .new since .new is private
          block = Block.parse(@tag_name, "#{@markup} content=\"\"", :no_tokens, @parse_context)
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

      class ContainerWithDynamicallyScopedBody < Liquid::Block
        def render(context)
          # Call .parse instead of .new since .new is private
          block = Block.parse(@tag_name, "#{@markup} content=\"\"", :no_tokens, @parse_context)
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

      Liquid::Template.register_tag('container', ContainerWithLexicallyScopedBody)
      Liquid::Template.register_tag('container_with_dynamically_scoped_body', ContainerWithDynamicallyScopedBody)
    end
  end
end