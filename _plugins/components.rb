module Jekyll
  module Components
    SRC_RJSCONFIG_PATH = '_build/rjs_config.template.js'.freeze
    DST_RJSCONFIG_PATH = '_build/tmp/rjs_config.js'.freeze
    RJSCONFIG_PACKAGES_PLACEHOLDER = '/* DYNAMIC_PACKAGES_CONFIG */'.freeze

    Jekyll::Hooks.register :site, :post_render do |site|
      styles, syncjs, asyncjs = %w(styles.sass sync.rjs async.rjs).map do |filename|
        AssetFile.new site, filename
      end

      rjs_packages = []
      skin_paths = Dir.glob('**/_skin/').sort

      Component.used.each do |component|
        styles << component.styles_import if component.styles_exist?
        skin_paths.each do |skin_path|
          styles << component.skin_import(skin_path) if component.skin_exists? skin_path
        end

        syncjs << component.syncjs_require if component.sync_js_exists?
        asyncjs << component.asyncjs_require if component.async_js_exists?
        asyncjs.last component.lastjs_require if component.last_js_exists?
        rjs_packages << component.rjs_package
      end

      rjsconfig = File.read(SRC_RJSCONFIG_PATH)
      rjsconfig.sub! RJSCONFIG_PACKAGES_PLACEHOLDER, rjs_packages.join(",\n")
      File.write(DST_RJSCONFIG_PATH, rjsconfig)

      [styles, syncjs, asyncjs].each(&:render)
    end
  end
end