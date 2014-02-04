define([
    'model/tweet/collection'
], function(TweetCollection) {
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
});