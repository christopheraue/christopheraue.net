#!/bin/bash
#build css
sass --update assets/_css-src/styles-dev.sass:assets/css/styles-dev.css
sass --update assets/_css-src/styles.sass:assets/css/styles.css --style compressed

# build js
#node _build/r.js -o _build/r_config.js
#rm assets/js/build.txt

# build html
jekyll build "$@"
