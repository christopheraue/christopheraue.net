#!/bin/bash
# set production environment
# in jekyll config
sed -i 's/^url: .*$/url: http:\/\/christopheraue.net/' _config.yml
sed -i 's/^destination: .*$/destination: .\/_site_production/' _config.yml
# in .htaccess
sed -i 's/RewriteCond %{HTTP_HOST} !=.*$/RewriteCond %{HTTP_HOST} !=christopheraue.net/' .htaccess
sed -i 's/RewriteRule (\.\*) [^$]*/RewriteRule (.*) http:\/\/christopheraue.net\//' .htaccess
# in ruby scripts
sed -i 's/^#!.*$/#!\/package\/host\/localhost\/ruby-2.0.0\/bin\/ruby/' lib/tweets.rb
#set minified javascript files
#sed -i "s/'backbone': 'lib\/backbone'/'backbone': 'lib\/backbone-min'/" assets/js/config.js
#sed -i "s/'underscore': 'lib\/underscore'/'underscore': 'lib\/underscore-min'/" assets/js/config.js
#sed -i "s/'jquery': 'lib\/jquery'/'jquery': 'lib\/jquery-min'/" assets/js/config.js
sed -i "s/'\/assets\/js\/lib\/[^']*'/'\/assets\/js\/lib\/require-min.js'/" _layouts/default.html