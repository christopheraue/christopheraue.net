module Jekyll
  class Components
    class CapturedComponents
      include Enumerable

      def initialize(site)
        @site = site
        @components = {}
      end

      def [](abs_path)
        @components[abs_path] ||= Component.new @site, abs_path
      end

      def bundle_assets_into(dir, prefix='')
        styles = AssetFile.new @site, dir, "#{prefix}styles.sass", "\n"
        syncjs = AssetFile.new @site, dir, "#{prefix}sync.rjs", ','
        asyncjs = AssetFile.new @site, dir, "#{prefix}async.rjs", ','

        skin_paths = Dir.glob(File.join @site.source, '**', '_skin/').sort

        base = @site.components.base.sort
        used = @components.values.sort
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

        Converters::RequireJs.create_build_config @site, base.flat_map(&:rjs_pathmap), all.map(&:rjs_package)

        [styles, syncjs, asyncjs].each(&:render)
      end
    end

    class UsedComponents
      def initialize(site)
        @site = site
        @stack = []
      end

      def start_capture
        @stack.push CapturedComponents.new @site
      end

      def [](abs_path)
        @stack.last[abs_path]
      end

      def stop_capture_and_bundle_assets_into(dir, *optional)
        @stack.pop.bundle_assets_into dir, *optional
      end

      def capture_and_write_to(dir, *optional) #&block
        start_capture
        yield
      ensure
        stop_capture_and_bundle_assets_into dir, *optional
      end
    end
  end

  class Site
    attr_accessor :used_components
  end

  Hooks.register :site, :pre_render do |site|
    site.used_components = Components::UsedComponents.new site
    site.used_components.start_capture
  end

  Hooks.register :site, :post_render do |site|
    site.used_components.stop_capture_and_bundle_assets_into '/'
  end
end