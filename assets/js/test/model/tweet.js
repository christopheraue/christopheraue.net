define([
    'model/tweet'
], function(Tweet) {
    module('Tweet Model');
    
    test('The tweet model is properly defined', function() {
        notStrictEqual(Tweet, undefined, 'It is not undefined');
    });
    
    var tweetInstance = null;
    module('Tweet Model Instance', {
        setup: function() {
            tweetInstance = new Tweet;
        }
    });
});