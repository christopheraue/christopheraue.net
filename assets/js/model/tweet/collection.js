define([
    'lib/backbone/model',
    'model/tweet'
], function(BackboneModel, Tweet) {
    var TweetCollection = BackboneModel.Collection.extend({
        model: Tweet
    });
    
    return TweetCollection;
});