module Jekyll
  module Components
    module Drops
      class Parameter < Liquid::Drop
        def initialize(content = nil)
          @content = content
        end

        def content
          if @content == nil
            liquid_method_missing :content
          elsif @content.respond_to? :call
            @content.call
          else
            @content
          end
        end

        def liquid_method_missing(m)
          Liquid::VariableLookup.parse("include.#{m}").evaluate(@context)
        end
      end
    end
  end
end