#!/bin/bash
sass.bat --update assets/css/sass/style.sass:assets/css/styles-dev.css
sass.bat --update assets/css/sass/style.sass:assets/css/styles.css --style compressed

jekyll.bat build