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
            it('should use Backbone.Model', function() {
                var tweetInstance = new Tweet;
                expect(tweetInstance instanceof Backbone.Model).toBe(true);
            });
        });
    });
});