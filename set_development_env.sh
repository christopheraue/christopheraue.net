# set development environment
# in jekyll config
sed -i 's/^url: .*$/url: http:\/\/ca.local/' _config.yml
sed -i 's/^destination: .*/destination: .\/_site/' _config.yml
# in .htaccess
sed -i 's/RewriteCond %{HTTP_HOST} !=.*$/RewriteCond %{HTTP_HOST} !=ca.local/' .htaccess
sed -i 's/RewriteRule (\.\*) [^$]*/RewriteRule (.*) http:\/\/ca.local\//' .htaccess
# in ruby scripts
sed -i 's/^#!.*$/#!\/Ruby200\/bin\/ruby/' lib/tweets.rb
#set formatted javascript files
sed -i "s/'backbone': 'lib\/backbone-min'/'backbone': 'lib\/backbone'/" assets/js/config.js
sed -i "s/'underscore': 'lib\/underscore-min*'/'underscore': 'lib\/underscore'/" assets/js/config.js
sed -i "s/'jquery': 'lib\/jquery-min'/'jquery': 'lib\/jquery'/" assets/js/config.js
sed -i "s/'\/assets\/js\/lib\/[^']*'/'\/assets\/js\/lib\/require.js'/" _layouts/default.html