require 'base64'

module Jekyll
  module Filters
    module Base64Filter
      def base64(string)
        Base64.strict_encode64(string)
      end
    end
  end
end

Liquid::Template.register_filter(Jekyll::Filters::Base64Filter)