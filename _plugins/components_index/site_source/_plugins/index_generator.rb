module Jekyll
  module ComponentsIndex
    class IndexGenerator < Generator
      def generate(site)
        components_source = site.config['components_source']
        return unless components_source

        config = Jekyll.configuration('source' => components_source)

        cwd = Dir.pwd
        Dir.chdir config['source']
        components_site = Jekyll::Site.new(config)
        Dir.chdir cwd

        components_site.components.repositories.each do |repo_name, repo_path|
          site.components.repositories.register repo_name, repo_path
        end
        site.components.repositories.register 'componentIndex', File.join(site.source, '_components/')

        components_site.components.select(&:doc_exists?).each do |component|
          page = Jekyll::Page.new components_site, components_site.source, component.path, "_doc.md"
          page.data['title'] = component.name
          page.data['permalink'] = component.name
          page.data['asset_path'] = site.config['path']
          page.data['render_inside'] = 'componentIndex-Root'
          page.data['component'] = ComponentDrop.new component
          site.pages << page
        end
      end
    end
  end
end