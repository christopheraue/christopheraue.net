define([
    'model/tweet',
    'backbone'
], function(Tweet, Backbone) {
    describe('Tweet', function() {
        describe('Its constructor', function() {
            it('should not be undefined', function() {
                expect(Tweet).toBeDefined();
            });
        });
        
        describe('Its implementation', function() {
            beforeEach(function() {
                this.tweetInstance = new Tweet({id: '421321506891636736'});
            });
            
            it('should use Backbone.Model', function() {
                expect(this.tweetInstance instanceof Backbone.Model).toBe(true);
            });
            
            it('has an url linking to its resource on api.twitter.com', function() {
                expect(this.tweetInstance.url).toBe('https://api.twitter.com/1.1/statuses/show.json?id=421321506891636736');
            });
        });
    });
});