define([
    'backbone',
    'model/tweet'
], function(Backbone, Tweet) {
    var TweetCollection = Backbone.Collection.extend({
        model: Tweet,
        url: 'https://api.twitter.com/1.1/statuses/user_timeline.json'
    });
    
    return TweetCollection;
});