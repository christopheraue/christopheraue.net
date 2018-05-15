module Jekyll
  class Components
    class Used
      def initialize(site)
        @site = site
        @stack = []
      end
      
      def capture
        @stack.push({})
      end

      def add(abs_path)
        @stack.last[abs_path] ||= Component.new @site, abs_path
      end

      def stop_capture_and_bundle_assets_into(dir, prefix: '')
        base = @site.components.base.sort
        used = @stack.pop.values.sort
        all = base + used

        styles = AssetFile.new @site, dir, "#{prefix}styles.sass", "\n"
        syncjs = AssetFile.new @site, dir, "#{prefix}sync.rjs", ','
        asyncjs = AssetFile.new @site, dir, "#{prefix}async.rjs", ','

        skin_paths = Dir.glob(File.join @site.source, '**', '_skin/').sort

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

      def capture_and_bundle_assets_into(dir, *optional) #&block
        capture
        yield
      ensure
        stop_capture_and_bundle_assets_into dir, *optional
      end
    end
  end
end