require 'digest/md5'

module Jekyll
  module Filters
    module FingerprintFilter
      ASSET_EXTS = %w(.js .css).freeze

      def fingerprint(url)
        site = @context.registers[:site]

        dirname = File.dirname(url)
        dirname = '' if dirname == '/'
        extname = File.extname(url)
        basename = File.basename(url, extname)

        "#{dirname}/#{basename}-#{Digest::MD5.hexdigest site.time.to_i.to_s}#{extname}"
      end
    end
  end
end

Liquid::Template.register_filter(Jekyll::Filters::FingerprintFilter)