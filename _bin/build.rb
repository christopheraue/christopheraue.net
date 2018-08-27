#!/usr/bin/env ruby

require 'bundler/setup'
require 'jekyll'

source = File.realpath File.join(__dir__, '..')

puts "Building site…"
puts "Source: #{source}"
Jekyll::Site.new(Jekyll.configuration('source' => source)).process

puts
system "build_comp_index #{source}", out: STDOUT, err: STDERR
