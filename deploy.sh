#!/bin/bash

./set_production_env.sh
./build.sh
rsync -av --del --chmod=+rx _site_production/ ca@volans.uberspace.de:~/html/
./set_development_env.sh