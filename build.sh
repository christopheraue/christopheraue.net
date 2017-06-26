#!/bin/bash
#build css
sass --update assets/_css-src/styles-dev.sass:assets/css/styles-dev.css --cache_location assets/_css-src/.sass-cache
sass --update assets/_css-src/styles.sass:assets/css/styles.css --style compressed --cache_location assets/_css-src/.sass-cache

# build js
#node _build/r.js -o _build/r_config.js
#rm assets/js/build.txt

# build html
jekyll build "$@"
