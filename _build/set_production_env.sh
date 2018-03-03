#!/bin/bash
# set production environment
# in jekyll config
sed -i 's/^url: .*$/url: http:\/\/christopheraue.net/' _config.yml
sed -i 's/^destination: .*$/destination: .\/_site_production/' _config.yml
# in .htaccess
sed -i 's/RewriteCond %{HTTP_HOST} !=.*$/RewriteCond %{HTTP_HOST} !=christopheraue.net/' .htaccess
sed -i 's/RewriteRule (\.\*) [^$]*/RewriteRule (.*) http:\/\/christopheraue.net\//' .htaccess
