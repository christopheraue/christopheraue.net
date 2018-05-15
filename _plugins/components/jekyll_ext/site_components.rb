module Jekyll
  class Site
    attr_accessor :components
  end

  Hooks.register :site, :after_reset do |site|
    site.components = Components.new site
  end

  Hooks.register :site, :pre_render do |site|
    site.components.used.capture
  end

  Hooks.register :site, :post_render do |site|
    site.components.used.stop_capture_and_bundle_assets_into '/'
  end
end