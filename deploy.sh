#!/bin/bash

_build/set_production_env.sh

jekyll build "$@"
rsync -av --del --exclude='ai-cache' --exclude='videos' _site_production/ ca@volans.uberspace.de:~/html/

_build/set_development_env.sh
