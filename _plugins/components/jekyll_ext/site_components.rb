module Jekyll
  class Site
    attr_accessor :components
  end

  Hooks.register :site, :after_reset do |site|
    site.components = Components.new site
  end
end