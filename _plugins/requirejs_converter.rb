module Jekyll
  module Converters
    class RequireJs < Converter
      dir = __FILE__.chomp File.extname __FILE__
      RJS = "#{dir}/r.js".freeze
      TEMPLATE_CONFIG_PATH = "#{dir}/rjs_config.template.js".freeze
      CONFIG_PACKAGES_PLACEHOLDER = '/* DYNAMIC_PACKAGES_CONFIG */'.freeze
      CONFIG_PATHS_PLACEHOLDER = '/* DYNAMIC_PATHS_CONFIG */'.freeze
      BUILD_DIR = '_build'.freeze
      BUILD_CONFIG_NAME = 'rjs_config.js'.freeze
      BUILD_FILE_OUT = 'rjs_out.js'.freeze

      class << self
        def create_build_config(site, pathmap, packages)
          rjsconfig = File.read(TEMPLATE_CONFIG_PATH)
          rjsconfig.sub! CONFIG_PATHS_PLACEHOLDER, pathmap.join(",\n")
          rjsconfig.sub! CONFIG_PACKAGES_PLACEHOLDER, packages.join(",\n")
          File.write File.join(site.source, BUILD_DIR, BUILD_CONFIG_NAME), rjsconfig
        end
      end

      safe true
      priority :low

      def initialize(*)
        super
        @build_config_path = File.join @config['source'], BUILD_DIR, BUILD_CONFIG_NAME
        @build_file_out = File.join @config['source'], BUILD_DIR, BUILD_FILE_OUT
      end

      def matches(ext)
        ext =~ /^\.rjs$/i
      end

      def output_ext(ext)
        ".js"
      end

      def convert(content)
        build_dir = File.join @config['source'], BUILD_DIR
        Dir.mkdir build_dir unless Dir.exists? build_dir

        err_out = `node #{RJS} -o \
          mainConfigFile="#{@build_config_path}" \
          optimize=#{Jekyll.env == 'development' ? 'none' : 'uglify'} \
          include=#{content} \
          insertRequire=#{content} \
          out=#{@build_file_out}`

        if err_out.empty?
          File.read @build_file_out
        else
          raise err_out
        end
      end
    end
  end
end