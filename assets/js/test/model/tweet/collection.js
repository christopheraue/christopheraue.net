define([
    'model/tweet/collection',
    'backbone',
    'model/tweet',
    'ajaxproxy'
], function(TweetCollection, Backbone, Tweet, ajaxproxy) {
    describe('Tweet Collection', function() {
        describe('Its constructor', function() {
            it('is not undefined', function() {
                expect(TweetCollection).toBeDefined();
            });
        });
        
        describe('Its implementation', function() {
            beforeEach(function() {
                this.tweetCollectionInstance = new TweetCollection([], {
                    screen_name: 'christopheraue',
                    count: '10',
                    max_id: '421321506891636736'
                });
            });
            
            it('inherits from Backbone.Collection', function() {
                expect(this.tweetCollectionInstance instanceof Backbone.Collection).toBe(true);
            });
            it('points to the tweet model', function() {
                expect(this.tweetCollectionInstance.model).toBe(Tweet);
            });
            it('has an url linking to its resource on api.twitter.com', function() {
                expect(this.tweetCollectionInstance.url).toBe('https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=christopheraue&count=10&max_id=421321506891636736');
            });
        });
        
        describe('The collection after it fetched tweets from the server', function() {
            beforeEach(function(done) {
                this.tweetCollectionInstance = new TweetCollection([], {
                    screen_name: 'christopheraue',
                    count: '10',
                    max_id: '421321506891636736'
                });
                
                ajaxproxy(Backbone.$, 'ajax');
                this.tweetCollectionInstance.fetch({
                    success: function() {
                        done(); //wait for fetch to be successful before continuing
                    }
                });
            });
            
            it('should have the length of the number of tweets in the test data file', function() {
                expect(this.tweetCollectionInstance.length).toBe(10);
            })
        });
    });
});