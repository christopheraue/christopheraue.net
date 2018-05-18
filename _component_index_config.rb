config_path = File.absolute_path File.join '_build', 'component_index_config.yml'
site_path = File.absolute_path File.dirname __FILE__
File.write config_path, "source_site: #{site_path}"
print config_path