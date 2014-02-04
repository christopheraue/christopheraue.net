define([
    'model/tweet/collection',
    'model/tweet'
], function(TweetCollection, Tweet) {
    module('Tweet Collection');
    
    test('The tweet collection is properly defined', function() {
        notStrictEqual(TweetCollection, undefined, 'It is not undefined');
    });
    
    var tweetCollectionInstance = null;
    module('Tweet Collection Instance', {
        setup: function() {
            tweetCollectionInstance = new TweetCollection;
        }
    });
    
    test('The tweet collection is linked to its model', function() {
        strictEqual(tweetCollectionInstance.model, Tweet, 'It points to the tweet model');
    });
    
    //test('The tweet collection is linked to its resource', function() {
    
    //});
});