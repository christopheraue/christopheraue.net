module Jekyll
  class Site
    attr_accessor :components
  end

  Hooks.register :site, :after_init do |site|
    site.components = Components.new site
  end

  Hooks.register :site, :after_init do |site|
    next if site.config['components_source']

    ['_components/', *Dir.glob('[^_]*/**/_components/')].each do |path|
      name = path.chomp('_components/').chomp('/').gsub('/', '-')
      abs_path = File.join site.source, path
      site.components.repositories.register name, abs_path
    end
  end

  Hooks.register :site, :pre_render do |site|
    site.components.used.capture
  end

  Hooks.register :site, :post_render do |site|
    site.components.used.stop_capture_and_bundle_assets_into '/'
  end
end