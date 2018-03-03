#!/bin/bash
# set development environment
# in jekyll config
sed -i 's/^url: .*$/url: http:\/\/c\.loc/' _config.yml
sed -i 's/^destination: .*/destination: .\/_site/' _config.yml
# in .htaccess
sed -i 's/RewriteCond %{HTTP_HOST} !=.*$/RewriteCond %{HTTP_HOST} !=c\.loc/' .htaccess
sed -i 's/RewriteRule (\.\*) [^$]*/RewriteRule (.*) http:\/\/c\.loc\//' .htaccess
