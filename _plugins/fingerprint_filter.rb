require 'digest/md5'

Jekyll::Hooks.register :site, :pre_render do |site, payload|
  asset_exts = %w(.js .css)

  site.data[:preprocessed_assets], site.pages = site.pages.partition do |page|
    asset_exts.include? page.output_ext
  end

  site.data[:preprocessed_assets].each do |asset|
    asset.output = Jekyll::Renderer.new(site, asset, payload).run
    asset.basename += "-#{Digest::MD5.hexdigest asset.content}"
    asset.remove_instance_variable :@url # reset cached URL
  end
end

Jekyll::Hooks.register :site, :post_render do |site|
  site.pages.unshift *site.data.delete(:preprocessed_assets)
end

module Jekyll
  module Filters
    module FingerprintFilter
      def fingerprint(url)
        site = @context.registers[:site]
        site_url = site.config['url']

        is_absolute_url = url.start_with? site_url

        relative_url = url.sub(site_url, '')
        dirname = File.dirname(relative_url)
        extname = File.extname(relative_url)
        basename = File.basename(relative_url, extname)

        url_pattern = /^#{Regexp.escape("#{dirname}/#{basename}")}-[0-9a-f]{32}#{Regexp.escape(extname)}$/
        found = site.data[:preprocessed_assets].find{ |asset| asset.url =~ url_pattern }

        if found
          is_absolute_url ? "#{site_url}/#{found.url}" : found.url
        else
          url
        end
      end
    end
  end
end

Liquid::Template.register_filter(Jekyll::Filters::FingerprintFilter)