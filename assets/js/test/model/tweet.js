define([
    'model/tweet',
    'lib/backbone/model'
], function(Tweet, BackboneModel) {
    var tweetInstance = null;
    
    module('Tweet Model');
    
        test('The tweet model is properly defined', function() {
            notStrictEqual(Tweet, undefined, 'It is not undefined');
        });
    
    module('Tweet Model Implementation', {
            setup: function() {
                tweetInstance = new Tweet;
            }
        });
        
        test('It correctly uses Backbone.Model', function() {
            ok(tweetInstance instanceof BackboneModel, 'It inherits from Backbone.Model');
        });
});