module Jekyll
  module Converters
    class RequireJs < Converter
      safe true
      priority :low

      def matches(ext)
        ext =~ /^\.rjs$/i
      end

      def output_ext(ext)
        ".js"
      end

      def convert(content)
        `node assets/_rjs_optimizer/r.js -o \
          rawText.__content__="#{content}" \
          name=__content__ \
          baseUrl=assets/_rjs \
          out=stdout \
          logLevel=4`
      end
    end
  end
end