module Jekyll
  module Converters
    class RequireJs < Converter
      dir = __FILE__.chomp File.extname __FILE__
      RJS = "#{dir}/r.js".freeze
      TMP_OUTPUT = "#{dir}/tmp/rjs_out.js".freeze
      SRC_CONFIG_PATH = "#{dir}/rjs_config.template.js".freeze
      DST_CONFIG_PATH = "#{dir}/tmp/rjs_config.js".freeze
      CONFIG_PACKAGES_PLACEHOLDER = "/* DYNAMIC_PACKAGES_CONFIG */".freeze

      class << self
        def write_packages_to_config(packages)
          rjsconfig = File.read(SRC_CONFIG_PATH)
          rjsconfig.sub! CONFIG_PACKAGES_PLACEHOLDER, packages.join(",\n")
          File.write(DST_CONFIG_PATH, rjsconfig)
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
        err_out = `node #{RJS} -o \
          baseUrl=./ \
          mainConfigFile="#{DST_CONFIG_PATH}" \
          optimize=#{Jekyll.env == 'development' ? 'none' : 'uglify'} \
          rawText.__content__="#{content}" \
          name=__content__ \
          out=#{TMP_OUTPUT} \
          logLevel=3`

        if err_out.empty?
          File.read TMP_OUTPUT
        else
          raise err_out
        end
      end
    end
  end
end