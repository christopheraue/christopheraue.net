module Jekyll
  module Converters
    class RequireJs < Converter
      dir = __FILE__.chomp File.extname __FILE__
      RJS = "#{dir}/r.js".freeze
      TEMPLATE_CONFIG_PATH = "#{dir}/rjs_config.template.js".freeze
      CONFIG_PACKAGES_PLACEHOLDER = "/* DYNAMIC_PACKAGES_CONFIG */".freeze
      BUILD_CONFIG_NAME = "rjs_config.js".freeze
      BUILD_FILE_NAME = "rjs_out.js".freeze

      class << self
        def create_build_config(site, packages)
          rjsconfig = File.read(TEMPLATE_CONFIG_PATH)
          rjsconfig.sub! CONFIG_PACKAGES_PLACEHOLDER, packages.join(",\n")
          File.write File.join(site.source, '_build', BUILD_CONFIG_NAME), rjsconfig
        end
      end

      safe true
      priority :low

      def matches(ext)
        ext =~ /^\.rjs$/i
      end

      def output_ext(ext)
        ".js"
      end

      def convert(content)
        build_config_path = File.join @config['source'], '_build', BUILD_CONFIG_NAME
        build_file_path = File.join @config['source'], '_build', BUILD_FILE_NAME
        err_out = `node #{RJS} -o \
          baseUrl=./ \
          mainConfigFile="#{build_config_path}" \
          optimize=#{Jekyll.env == 'development' ? 'none' : 'uglify'} \
          rawText.__content__="#{content}" \
          name=__content__ \
          out=#{build_file_path} \
          logLevel=3`

        if err_out.empty?
          File.read build_file_path
        else
          raise err_out
        end
      end
    end
  end
end