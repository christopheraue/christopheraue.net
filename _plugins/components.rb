module Jekyll
  class Components
    include Enumerable

    def initialize(site)
      @site = site
      @repositories = Components::Repositories.new site
    end

    attr_reader :repositories

    def each(&block)
      to_a.each(&block)
    end

    def to_a
      @repositories.flat_map do |repo_name, repo_path|
        Dir.glob(File.join(repo_path, '*/')).map do |comp_path|
          Component.new @site, comp_path.chomp('/')
        end
      end
    end

    def base
      @repositories.flat_map do |repo_name, repo_path|
        Dir.glob(File.join(repo_path, '_base/')).map do |comp_path|
          Component.new @site, comp_path.chomp('/')
        end
      end
    end
  end
end