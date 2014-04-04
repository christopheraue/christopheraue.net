#!/bin/ruby
require "yaml"
require "uri"
require "base64"
require "net/http"
require "json"

ENV['SSL_CERT_FILE'] = File.join(__dir__, 'cacert.pem')
config = YAML::load_file(File.join(__dir__, 'twitter_api_config.yml'))

consumer_key = config['consumer_key']
consumer_key_uri_encoded = URI.encode_www_form_component(consumer_key)

consumer_secret = config['consumer_secret']
consumer_secret_uri_encoded = URI.encode_www_form_component(consumer_secret)

bearer_token_credentials = consumer_key_uri_encoded + ":" + consumer_secret_uri_encoded
bearer_token_credentials_base64_encoded = Base64.strict_encode64(bearer_token_credentials)

puts 'Content-Type: text/html'
puts

tweets = Net::HTTP.start('api.twitter.com',  {:use_ssl => true}) do |http|
    header = { 'Authorization' => "Basic " + bearer_token_credentials_base64_encoded,
               'Content-Type' => "application/x-www-form-urlencoded;charset=UTF-8" }
    body = 'grant_type=client_credentials'
    response = http.post('/oauth2/token', body, header);
    payload = JSON.parse(response.body)
    
    raise 'Could not optain bearer token' unless response.code == '200' and payload['token_type'] == 'bearer'
    bearer_token = payload['access_token']
    
    header = { 'Authorization' => "Bearer " + bearer_token }
    count = config['count']
    screen_name = config['screen_name']
    response = http.get('/1.1/statuses/user_timeline.json?count=' + count.to_s + '&screen_name=' + screen_name, header)
    
    raise 'Could not get tweets' unless response.code == '200'
    response.body
end

puts tweets