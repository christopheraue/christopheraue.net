#!/bin/bash
#build css for styleguide
sass --update assets/_sass/styles-dev.sass:assets/styles-dev.css --cache_location assets/_sass/.sass-cache

# build html
jekyll build "$@"
