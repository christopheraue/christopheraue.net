module Jekyll
  module Components
    Jekyll::Hooks.register :site, :post_render do |site|
      styles = AssetFile.new site, 'styles.sass', "\n"
      syncjs = AssetFile.new site, 'sync.rjs', ','
      asyncjs = AssetFile.new site, 'async.rjs', ','

      skin_paths = Dir.glob(File.join(site.source, '**', '_skin/')).sort

      base = site.component_repositories.base_components.sort
      used = site.used_components.sort
      all = base + used

      all.each do |component|
        component.add_styles '_styles', to: styles
        skin_paths.each do |skin_path|
          component.add_styles skin_path, component.name, to: styles
        end

        component.add_script '_sync', to: syncjs
        component.add_script '_async', to: asyncjs
        component.add_script '_last', to: asyncjs, bucket: :after_content
      end

      Converters::RequireJs.create_build_config site, base.flat_map(&:rjs_pathmap), all.map(&:rjs_package)

      [styles, syncjs, asyncjs].each(&:render)
    end
  end
end