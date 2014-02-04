define([
    'lib/underscore',
    'lib/backbone',
    'model/tweet'
], function(_, backbone, Tweet) {
    var TweetCollection = Backbone.Collection.extend({
        model: Tweet
    });
    
    return TweetCollection;
});