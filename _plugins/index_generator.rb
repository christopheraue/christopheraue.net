module Jekyll
  module ComponentsIndex
    PATH = '/components/'

    Jekyll::Hooks.register :site, :post_write do |site|
      next if site.config['components_source']

      sass_config = site.config['sass']
      sass_config['load_paths'].map!{ |path| File.join(site.source, path) }

      config = Jekyll.configuration(
        'skip_config_files' => true,
        'source' => File.join(site.source, '_plugins', 'components_index', 'site_source'),
        'destination' => File.join(site.dest, PATH),
        'sass' => sass_config,
        'title' => "Component Index of #{site.config['name']}",
        'path' => PATH,
        'components_source' => site.source)

      cwd = Dir.pwd
      Dir.chdir config['source']
      Jekyll::Site.new(config).process
      Dir.chdir cwd
    end
  end
end