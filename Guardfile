# A sample Guardfile
# More info at https://github.com/guard/guard#readme

ignore /Gemfile/
ignore /Guardfile/

guard 'sass', :input => 'assets/_css-src', :output => 'assets/css/', :smart_partials => true, :cache_location => 'assets/_css-src/.sass-cache'

guard 'jekyll-plus', :drafts => true do
  watch /^(?!_site|assets\/_css-src)/
end

guard 'livereload' do
  watch /^_site/
end
