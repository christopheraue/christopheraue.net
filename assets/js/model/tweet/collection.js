define([
    'underscore',
    'backbone',
    'model/tweet'
], function(_, Backbone, Tweet) {
    var TweetCollection = Backbone.Collection.extend({
        model: Tweet,
        url: 'http://ca.local/lib/tweets.rb',
    });
    
    return TweetCollection;
});