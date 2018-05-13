module Jekyll
  module Components
    class Repositories
      include Enumerable

      def initialize(site)
        @site = site
        @repositories = {}
      end

      def register(name, abs_path)
        @repositories[name] = abs_path.chomp('/')
      end

      def path_from_name(name)
        @repositories[name]
      end

      def name_from_path(path)
        @repositories.key path
      end

      def each(&block)
        @repositories.each(&block)
      end

      def all_components
        @repositories.values.flat_map do |repo_path|
          Dir.glob(File.join(repo_path, '*/')).map do |comp_path|
            Component.new @site, comp_path.chomp('/')
          end
        end
      end

      def base_components
        @repositories.values.flat_map do |repo_path|
          Dir.glob(File.join(repo_path, '_base/')).map do |comp_path|
            Component.new @site, comp_path.chomp('/')
          end
        end
      end
    end
  end

  class Site
    attr_accessor :component_repositories
  end

  Hooks.register :site, :after_init do |site|
    site.component_repositories = Components::Repositories.new site
  end
end