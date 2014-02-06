define([
    'underscore',
    'backbone',
    'text!template/tweet.html'
], function(_, Backbone, tweetTemplate) {
    var TweetView = Backbone.View.extend({
        tagName: 'blockquote',
        className: 'tweet',
        
        render: function() {
            this.$el = Backbone.$(_.template(tweetTemplate, {tweet: this.model}));
            this.el = this.$el[0];
            return this;
        }
    });
    
    return TweetView;
});