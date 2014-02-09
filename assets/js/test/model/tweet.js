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
        });
    });
});