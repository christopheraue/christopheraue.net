module Jekyll
  module Converters
    class RequireJs < Converter
      TMP_OUTPUT = '_build/tmp/rjs_out.js'.freeze

      safe true
      priority :low

      def matches(ext)
        ext =~ /^\.rjs$/i
      end

      def output_ext(ext)
        ".js"
      end

      def convert(content)
        err_out = `node _build/r.js -o \
          baseUrl=./ \
          mainConfigFile="#{Components::DST_RJSCONFIG_PATH}" \
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