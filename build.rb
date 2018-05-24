#!/usr/bin/env ruby

require 'bundler/setup'

require 'jekyll'
main_site = Jekyll::Site.new Jekyll.configuration('source' => File.dirname(__FILE__))
main_site.process

require 'jekyll-components-index'
comp_site = Jekyll::Site.new Jekyll.configuration(
  'source' => Jekyll::Components::Index.source_path,
  'source_site' => main_site.source)
comp_site.process
