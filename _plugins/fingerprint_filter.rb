require 'digest/md5'

module Jekyll
  module Filters
    module FingerprintFilter
      ASSET_EXTS = %w(.js .css).freeze

      Jekyll::Hooks.register :pages, :post_init do |page|
        next unless ASSET_EXTS.include? page.output_ext
        page.basename += "-#{Digest::MD5.hexdigest page.site.time.to_i.to_s}"
      end

      def fingerprint(url)
        site = @context.registers[:site]

        dirname = File.dirname(url)
        extname = File.extname(url)
        basename = File.basename(url, extname)

        "#{dirname}/#{basename}-#{Digest::MD5.hexdigest site.time.to_i.to_s}#{extname}"
      end
    end
  end
end

Liquid::Template.register_filter(Jekyll::Filters::FingerprintFilter)