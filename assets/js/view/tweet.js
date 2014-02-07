define([
    'underscore',
    'backbone',
    'text!template/tweet.html',
    'text!template/tweet/hashtag.html',
    'lib/date-formatter'
], function(_, Backbone, tweetTemplate, hashtagTemplate) {
    var TweetView = Backbone.View.extend({
        tagName: 'blockquote',
        className: 'tweet',
        
        render: function() {
            this.$el = Backbone.$(_.template(tweetTemplate, {tweet: this.prepareTweetData()}));
            this.el = this.$el[0];
            return this;
        },
        
        prepareTweetData: function() {
            var id = this.model.get("id_str");
            
            return {
                id: id,
                author: this.prepareTweetAuthor(),
                retweet: null,
                text: this.prepareTweetText(),
                created_at: this.prepareTweetTimestamp()
            }
        },
        
        prepareTweetAuthor: function() {
            var author = this.model.get('user');
            
            return {
                name: author.name,
                screen_name: author.screen_name,
                profile_url: "https://twitter.com/"+author.screen_name,
                profile_image_url: author.profile_image_url,
            }
        },
        
        prepareTweetText: function() {
            var text = this.model.get("text"),
                entities = this.model.get("entities");
            
            _.each(entities.hashtags.reverse(), function(hashtag) {
                text = text.substr(0, hashtag.indices[0]) +
                       _.template(hashtagTemplate, {hashtag: hashtag.text}) +
                       text.substr(hashtag.indices[1]);
            });
            
            return text;
        },
        
        prepareTweetTimestamp: function() {
            var created_at = new Date(this.model.get("created_at"));
            return {
                datetime: created_at.toUTCString(),
                formatted: created_at.getTwitterTime()
            }
        }
    });
    
    return TweetView;
});