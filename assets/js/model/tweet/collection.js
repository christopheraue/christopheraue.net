define([
    'underscore',
    'backbone',
    'model/tweet'
], function(_, Backbone, Tweet) {
    var TweetCollection = Backbone.Collection.extend({
        model: Tweet,
        url: function() {
            var baseUrl = 'https://api.twitter.com/1.1/statuses/user_timeline.json',
                url = baseUrl;
            
            if (this.query) {
                var connector = '?';
                
                _.each(this.query, function(value, option) {
                    url += connector + option + '=' + value;
                    connector = '&';
                });
            }
            
            return url;
        },
        
        initialize: function(models, options) {
            this.query = options;
            this.url = this.url();
        }
    });
    
    return TweetCollection;
});