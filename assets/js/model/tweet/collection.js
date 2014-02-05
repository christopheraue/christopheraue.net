define([
    'lib/backbone/model',
    'model/tweet'
], function(BackboneModel, Tweet) {
    var TweetCollection = BackboneModel.Collection.extend({
        model: Tweet,
        url: 'https://api.twitter.com/1.1/statuses/user_timeline.json'
    });
    
    return TweetCollection;
});