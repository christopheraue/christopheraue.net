require([
    'model/tweet'
], function(Tweet) {
    module('Tweet Model');
    
    test('The tweet model is proper defined', function() {
        notStrictEqual(Tweet, undefined, 'It is not undefined');
        ok(Tweet.prototype instanceof Backbone.Model, 'It inherits from Backbone.Model');
    });
    
    var tweetInstance = null;
    module('Tweet Model Instance', {
        setup: function() {
            tweetInstance = new Tweet;
        }
    });
    
    
});