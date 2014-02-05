define([
    'model/tweet/collection',
    'backbone',
    'model/tweet'
], function(TweetCollection, Backbone, Tweet) {
    describe('Tweet Collection', function() {
        describe('Its constructor', function() {
            it('is not undefined', function() {
                expect(TweetCollection).toBeDefined();
            });
        });
        
        describe('Its implementation', function() {
            var tweetCollectionInstance = new TweetCollection;
            it('inherits from Backbone.Collection', function() {
                expect(tweetCollectionInstance instanceof Backbone.Collection).toBe(true);
            });
            it('points to the tweet model', function() {
                expect(tweetCollectionInstance.model).toBe(Tweet);
            });
            it('has an url linking to its resource on api.twitter.com', function() {
                expect(tweetCollectionInstance.url).toBe('https://api.twitter.com/1.1/statuses/user_timeline.json');
            });
        });
        
        describe('Its behaviour', function() {
            
        });
    });
});