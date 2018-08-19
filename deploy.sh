#!/bin/bash

JEKYLL_ENV=production jekyll build --config _config.yml,_config_production_override.yml
rsync -av --del _site_production/ op@radiotower:/srv/http/christopheraue.net
