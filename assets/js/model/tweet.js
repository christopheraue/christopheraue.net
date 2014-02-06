define([
    'backbone'
], function(Backbone) {
    var Tweet = Backbone.Model.extend({
        url: function() {
            return 'https://api.twitter.com/1.1/statuses/show.json?id=' + this.id;
        },
        
        initialize: function() {
            this.url = this.url();
        }
    });
    
    return Tweet;
});