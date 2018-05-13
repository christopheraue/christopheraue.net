module Jekyll
  module Components
    Jekyll::Hooks.register :site, :post_render do |site|
      styles, syncjs, asyncjs = %w(styles.sass sync.rjs async.rjs).map do |filename|
        AssetFile.new site, filename
      end

      skin_paths = Dir.glob(File.join(site.source, '**', '_skin/')).sort

      base = site.component_repositories.base_components.sort
      used = site.used_components.sort
      all = base + used

      all.each do |component|
        styles << component.styles_import if component.styles_exist?
        skin_paths.each do |skin_path|
          styles << component.skin_import(skin_path) if component.skin_exists? skin_path
        end

        syncjs << component.syncjs_require if component.sync_js_exists?
        asyncjs << component.asyncjs_require if component.async_js_exists?
        asyncjs.last component.lastjs_require if component.last_js_exists?
      end

      Converters::RequireJs.create_build_config site, base.flat_map(&:rjs_pathmap), all.map(&:rjs_package)

      [styles, syncjs, asyncjs].each(&:render)
    end
  end
end