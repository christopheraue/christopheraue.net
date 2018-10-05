#!/bin/bash

JEKYLL_ENV=production jekyll build --config _config.yml,_config_production_override.yml
echo "Synchronizing files..."
rsync -av --del _site_production/ op@radiotower:/srv/http/christopheraue.net
echo
echo "Setting nginx redirects..."
scp _build/nginx_redirects op@radiotower:/tmp/
ssh op@radiotower "sudo mv /tmp/nginx_redirects /etc/nginx/sites_redirects/christopheraue.net; sudo systemctl restart nginx"
