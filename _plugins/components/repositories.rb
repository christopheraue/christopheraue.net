module Jekyll
  class Components
    class Repositories
      include Enumerable

      def initialize(site)
        @site = site
        @repositories = {}
      end

      def register(name, abs_path)
        @repositories[name] = abs_path.chomp('/')
      end

      def each(&block)
        @repositories.each(&block)
      end

      def path_from_name(name)
        @repositories[name]
      end

      def name_from_path(path)
        @repositories.key path
      end
    end
  end
end