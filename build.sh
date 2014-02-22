#!/bin/bash
#build css
sass.bat --update assets/_css-src/style.sass:assets/css/styles-dev.css
sass.bat --update assets/_css-src/style.sass:assets/css/styles.css --style compressed

# build js
node _build/r.js -o _build/r_config.js
rm assets/js/build.txt

# build html
jekyll.bat build