#!/bin/bash

jekyll build "$@"

source_site_config=$(ruby _component_index_config.rb)
cd ../components_index
jekyll build "$@" --config _config.yml,$source_site_config
