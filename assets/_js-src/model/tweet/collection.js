define([
    'underscore',
    'backbone',
    'model/tweet'
], function(_, Backbone, Tweet) {
    var TweetCollection = Backbone.Collection.extend({
        model: Tweet,
        url: window.location.protocol + '//' + window.location.hostname + (window.location.port === '' ? '' : ':'+ window.location.port) + '/lib/tweets.rb',
    });
    
    return TweetCollection;
});