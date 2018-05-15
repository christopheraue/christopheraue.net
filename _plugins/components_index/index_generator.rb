module Jekyll
  module ComponentsIndex
    URL_PATH = 'components'

    Jekyll::Hooks.register :site, :post_write do |site|
      next if site.config['components_site']

      sass_config = site.config['sass']
      sass_config['load_paths'].map!{ |path| File.join(site.source, path) }

      config = Jekyll.configuration(
        'skip_config_files' => true,
        'source' => File.join(site.source, '_plugins', 'components_index', 'site_source'),
        'destination' => File.join(site.dest, URL_PATH),
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

      components_site.components.repositories.each do |repo_name, repo_path|
        site.components.repositories.register repo_name, repo_path
      end
      site.components.repositories.register 'componentIndex', File.join(site.source, '_components/')

      components_site.components.select(&:doc_exists?).each do |component|
        page = Jekyll::Page.new components_site, components_site.source, component.path, "_doc.md"
        page.data['title'] = component.name
        page.data['permalink'] = component.name
        page.data['asset_path'] = "/#{URL_PATH}/"
        page.data['render_inside'] = 'componentIndex-Root'
        page.data['component'] = ComponentDrop.new component
        site.pages << page
      end
    end
  end
end