module Jekyll
  module Components
    class Component
      Jekyll::Hooks.register :site, :post_read do |site|
        components_site = site.config['components_site']
        next if components_site

        ['_components/', *Dir.glob('[^_]*/**/_components/')].each do |path|
          name = path.chomp('_components/').chomp('/').gsub('/', '-')
          abs_path = File.join site.source, path
          site.component_repositories.register name, abs_path
        end
      end

      class << self
        def path_from_name(site, name)
          repo_name, dash, comp_name = name.rpartition '-'
          File.join site.component_repositories.path_from_name(repo_name), comp_name
        end

        def name_from_path(site, path)
          repo_path, slash, comp_name = path.rpartition '/'
          repo_name = site.component_repositories.name_from_path(repo_path)
          (repo_name == '') ? comp_name : "#{repo_name}-#{comp_name}"
        end
      end

      def initialize(site, abs_path)
        @abs_path = abs_path
        @path = abs_path.sub("#{site.source}/", '').chomp '/'
        @name = self.class.name_from_path(site, @abs_path)
      end

      attr_reader :path, :name

      def add_styles(path = @abs_path, asset_name, to:, bucket: :content)
        file_path = File.join path, "#{asset_name}.sass"
        return unless File.exist? file_path
        to.__send__(bucket) << "@import \"#{File.join path, asset_name}\""
      end

      def add_script(path = @abs_path, asset_name, to:, bucket: :content)
        file_path = File.join path, "#{asset_name}.js"
        return unless File.exist? file_path
        to.__send__(bucket) << "#{name}/#{asset_name}"
      end

      def rjs_package
        "{name: '#{name}', location: '#{@abs_path}'}"
      end

      def rjs_pathmap
        repo_name, dash, comp_name = @name.rpartition '-'
        repo_prefix = (repo_name == '') ? '' : "#{repo_name}-"
        %w(core-ext lib).map do |path|
          "'#{repo_prefix}#{path}': '#{File.join @abs_path, path}'"
        end
      end

      def doc_exists?
        File.exist? File.join @abs_path, "_doc.md"
      end

      def doc_page(site)
        page = Jekyll::Page.new site, site.source, @path, "_doc.md"
        page.data['title'] = name
        page.data['permalink'] = name
        page.data['render_inside'] = 'componentIndex-Root'
        page.data['component'] = Drops::Component.new self
        page
      end

      def <=>(other)
        @path <=> other.path
      end
    end
  end
end