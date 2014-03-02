#!/bin/bash

_build/set_production_env.sh
./build.sh
rsync -av --del --exclude='ai-cache videos' --chmod=+rx _site_production/ ca@volans.uberspace.de:~/html/
_build/set_development_env.sh