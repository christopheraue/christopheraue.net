#!/bin/bash

_build/set_production_env.sh
./build.sh

echo '
AddHandler cgi-script .rb
Options +ExecCGI' >> _site_production/.htaccess

rsync -av --del --exclude='ai-cache' --exclude='videos' _site_production/ ca@volans.uberspace.de:~/html/
_build/set_development_env.sh

ssh ca@volans.uberspace.de "chmod +x ~/html/lib/tweets.rb"
