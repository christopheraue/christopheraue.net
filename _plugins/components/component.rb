module Jekyll
  module Components
    class Component
      STYLES_FILENAME = '_styles'.freeze
      ASNYCJS_FILENAME = '_async'.freeze
      SNYCJS_FILENAME = '_sync'.freeze
      LASTJS_FILENAME = '_last'.freeze

      Jekyll::Hooks.register :site, :pre_render do |site|
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

      def styles_exist?
        File.exist? "#{File.join @abs_path, STYLES_FILENAME}.sass"
      end

      def sync_js_exists?
        File.exist? "#{File.join @abs_path, SNYCJS_FILENAME}.js"
      end

      def async_js_exists?
        File.exist? "#{File.join @abs_path, ASNYCJS_FILENAME}.js"
      end

      def last_js_exists?
        File.exist? "#{File.join @abs_path, LASTJS_FILENAME}.js"
      end

      def skin_exists?(skin_path)
        File.exist? "#{File.join skin_path, name}.sass"
      end

      def styles_import
        "@import \"#{File.join @abs_path, STYLES_FILENAME}\""
      end

      def syncjs_require
        "require(['#{name}/#{SNYCJS_FILENAME}']);"
      end

      def asyncjs_require
        "require(['#{name}/#{ASNYCJS_FILENAME}']);"
      end

      def lastjs_require
        "require(['#{name}/#{LASTJS_FILENAME}']);"
      end

      def skin_import(skin_path)
        "@import \"#{File.join skin_path, name}\""
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

      def <=>(other)
        @path <=> other.path
      end
    end
  end
end