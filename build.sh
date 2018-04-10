#!/bin/bash
#build css for styleguide
sass --update assets/_sass/styles-dev.sass:assets/styles-dev.css --cache_location assets/_sass/.sass-cache

# build js
node _build/r.js -o _build/r_config.js
rm assets/js/build.txt

# build html
jekyll build "$@"
