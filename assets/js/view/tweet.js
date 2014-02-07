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
                var preparedTweet = TweetView.prepareTweet(this.model);
                this.$el = Backbone.$(_.template(tweetTemplate, {tweet: preparedTweet}));
                this.el = this.$el[0];
                return this;
            }
        }, {
            prepareTweet: function(tweet) {
                return {
                    id: tweet.get("id_str"),
                    author: this.prepareTweetAuthor(tweet.get('user')),
                    retweet: null,
                    text: this.prepareTweetText(tweet.get("text"), tweet.get("entities")),
                    created_at: this.prepareTweetTimestamp(tweet.get("created_at"))
                }
            },
            
            prepareTweetAuthor: function(author) {
                return {
                    name: author.name,
                    screen_name: author.screen_name,
                    profile_url: "https://twitter.com/"+author.screen_name,
                    profile_image_url: author.profile_image_url,
                }
            },
            
            prepareTweetText: function(text, entities) {
                _.each(entities.hashtags.reverse(), function(hashtag) {
                    text = text.substr(0, hashtag.indices[0]) +
                           _.template(hashtagTemplate, {hashtag: hashtag.text}) +
                           text.substr(hashtag.indices[1]);
                });
                
                return text;
            },
            
            prepareTweetTimestamp: function(created_at) {
                var created_at = new Date(created_at);
                return {
                    datetime: created_at.toUTCString(),
                    formatted: created_at.getTwitterTime()
                }
            }
        });
    
    return TweetView;
});