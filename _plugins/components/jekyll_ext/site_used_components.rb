module Jekyll
  module Components
    class UsedComponents
      include Enumerable

      def initialize(site)
        @site = site
        @components = {}
      end

      def [](abs_path)
        @components[abs_path] ||= Component.new @site, abs_path
      end

      def each(&block)
        @components.each_value(&block)
      end
    end
  end

  class Site
    attr_accessor :used_components
  end

  Hooks.register :site, :after_reset do |site|
    site.used_components = Components::UsedComponents.new site
  end
end