module Jekyll
  module Components
    Jekyll::Hooks.register :site, :post_render do |site|
      styles, syncjs, asyncjs = %w(styles.sass sync.rjs async.rjs).map do |filename|
        AssetFile.new site, filename
      end

      rjs_packages = []
      skin_paths = Dir.glob('**/_skin/').sort

      configured = [Component.new('_components/_base')]
      used = Component.used

      (configured + used).each do |component|
        styles << component.styles_import if component.styles_exist?
        skin_paths.each do |skin_path|
          styles << component.skin_import(skin_path) if component.skin_exists? skin_path
        end

        syncjs << component.syncjs_require if component.sync_js_exists?
        asyncjs << component.asyncjs_require if component.async_js_exists?
        asyncjs.last component.lastjs_require if component.last_js_exists?
        rjs_packages << component.rjs_package
      end

      Converters::RequireJs.write_packages_to_config rjs_packages

      [styles, syncjs, asyncjs].each(&:render)
    end
  end
end