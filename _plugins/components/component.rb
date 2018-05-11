module Jekyll
  module Components
    class Component
      STYLES_FILENAME = '_styles'.freeze
      ASNYCJS_FILENAME = '_async'.freeze
      SNYCJS_FILENAME = '_sync'.freeze
      LASTJS_FILENAME = '_last'.freeze

      def initialize(path)
        @path = path.chomp '/'
      end

      attr_reader :path

      def name
        @name ||= begin
          *path_parts, _components, base = @path.split '/'
          [*path_parts, base].join '-'
        end
      end

      def styles_exist?
        File.exist? "#{File.join @path, STYLES_FILENAME}.sass"
      end

      def sync_js_exists?
        File.exist? "#{File.join @path, SNYCJS_FILENAME}.js"
      end

      def async_js_exists?
        File.exist? "#{File.join @path, ASNYCJS_FILENAME}.js"
      end

      def last_js_exists?
        File.exist? "#{File.join @path, LASTJS_FILENAME}.js"
      end

      def skin_exists?(skin_path)
        File.exist? "#{File.join skin_path, name}.sass"
      end

      def styles_import
        "@import \"#{File.join @path, STYLES_FILENAME}\""
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
        "{name: '#{name}', location: '#{@path}'}"
      end

      def <=>(other)
        @path <=> other.path
      end
    end
  end
end