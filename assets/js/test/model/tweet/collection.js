define([
    'model/tweet/collection',
    'lib/backbone/model',
    'model/tweet'
], function(TweetCollection, BackboneModel, Tweet) {
    var tweetCollectionInstance = null;
    module('Tweet Collection Constructor');
    
        test('It is properly defined', function() {
            notStrictEqual(TweetCollection, undefined, 'It is not undefined');
        });
    
    module('Tweet Collection Implementation', {
            setup: function() {
                tweetCollectionInstance = new TweetCollection;
            }
        });
    
        test('It correctly uses Backbone.Collection', function() {
            ok(tweetCollectionInstance instanceof BackboneModel.Collection, 'It inherits from Backbone.Collection');
            strictEqual(tweetCollectionInstance.model, Tweet, 'It points to the tweet model');
            ok(false, 'It links to its resource');
        });
    
    module('Tweet Collection Behaviour', {
            setup: function() {
                tweetCollectionInstance = new TweetCollection;
            }
        });
});