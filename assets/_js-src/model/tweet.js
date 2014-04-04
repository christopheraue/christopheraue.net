define([
    'backbone'
], function(Backbone) {
    var Tweet = Backbone.Model.extend({
        url: null
    });
    
    return Tweet;
});