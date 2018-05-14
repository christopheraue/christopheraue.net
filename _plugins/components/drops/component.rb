module Jekyll
  module Components
    module Drops
      class Component < Liquid::Drop
        extend Forwardable

        def initialize(component)
          @component = component
        end

        delegate %i(name path) => :@component
      end
    end
  end
end