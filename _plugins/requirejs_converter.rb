module Jekyll
  module Converters
    class RequireJs < Converter
      TMP_OUTPUT = '_rjs_optimizer.tmp.js'.freeze

      safe true
      priority :low

      def matches(ext)
        ext =~ /^\.rjs$/i
      end

      def output_ext(ext)
        ".js"
      end

      def convert(content)
        err_out = `node assets/_rjs_optimizer/r.js -o \
          baseUrl=./ \
          mainConfigFile="assets/_rjs/sync/config.js" \
          optimize=#{Jekyll.env == 'development' ? 'none' : 'uglify'} \
          rawText.__content__="#{content}" \
          name=__content__ \
          out=#{TMP_OUTPUT} \
          logLevel=3`

        if err_out.empty?
          output = File.read TMP_OUTPUT
          File.unlink TMP_OUTPUT
          output
        else
          raise err_out
        end
      end
    end
  end
end