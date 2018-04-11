Jekyll::Hooks.register :site, :post_write do |site|
  source = File.join site.source, 'assets/_sass/styles.sass'
  dest = File.join site.dest, 'assets/styles-dev.css'
  cache = File.join site.source, 'assets/_sass/.sass-cache'
  `sass --update #{source}:#{dest} --cache_location #{cache}`
end