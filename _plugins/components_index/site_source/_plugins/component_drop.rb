module Jekyll
  module ComponentsIndex
    class ComponentDrop < Liquid::Drop
      extend Forwardable

      def initialize(component)
        @component = component
      end

      delegate %i(name path) => :@component
    end
  end
end