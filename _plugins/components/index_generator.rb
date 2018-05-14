module Jekyll
  module Components
    Jekyll::Hooks.register :site, :post_write do |site|
      next if site.config['components_site']

      sass_config = site.config['sass']
      sass_config['load_paths'].map!{ |path| File.join(site.source, path) }

      config = Jekyll.configuration(
        'skip_config_files' => true,
        'source' => File.join(site.source, '_plugins', 'components', 'site_source'),
        'destination' => File.join(site.dest, 'components'),
        'sass' => sass_config,
        'title' => "Component Index of #{site.config['name']}",
        'components_site' => site)

      cwd = Dir.pwd
      Dir.chdir config['source']

      Jekyll::Site.new(config).process

      Dir.chdir cwd
    end

    Jekyll::Hooks.register :site, :post_read do |site|
      components_site = site.config['components_site']
      next unless components_site

      components_site.component_repositories.each do |repo_name, repo_path|
        site.component_repositories.register repo_name, repo_path
      end
      site.component_repositories.register 'componentIndex', File.join(site.source, '_components/')

      components_site.component_repositories.all_components.select(&:doc_exists?).each do |component|
        # render doc.md and make it available under /components/#{component.name}
        site.pages << component.doc_page(components_site)
      end
    end
  end
end