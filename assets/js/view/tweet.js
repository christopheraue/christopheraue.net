define([
    'underscore',
    'backbone',
    'text!template/tweet.html',
    'text!template/tweet/retweetIndicator.html',
    'text!template/tweet/hashtag.html',
    'text!template/tweet/mention.html',
    'text!template/tweet/url.html',
    'lib/date-formatter'
], function(_, Backbone, tweetTemplate, retweetIndicatorTemplate, hashtagTemplate, mentionTemplate, urlTemplate) {
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
                var retweeted_status = tweet.get('retweeted_status'),
                    isRetweet = !!retweeted_status,
                    id, author, text, entities, created_at;
                
                if (isRetweet) {
                    retweet = tweet;
                    tweet = retweeted_status;
                    
                    id = retweet.get("id_str");
                    author = tweet.user;
                    retweeter = retweet.get("user");
                    text = tweet.text;
                    entities = tweet.entities;
                    created_at = tweet.created_at;
                } else {
                    id = tweet.get("id_str");
                    author = tweet.get('user');
                    retweeter = null;
                    text = tweet.get("text");
                    entities = tweet.get("entities");
                    created_at = tweet.get("created_at");
                }
                
                return {
                    id: id,
                    author: this.prepareTweetAuthor(author),
                    retweet_indicator: this.prepareRetweetIndicator(retweeter),
                    text: this.prepareTweetText(text, entities),
                    created_at: this.prepareTweetTimestamp(created_at)
                }
            },
            
            prepareTweetAuthor: function(author) {
                return {
                    name: author.name,
                    screen_name: author.screen_name,
                    profile_url: "https://twitter.com/"+author.screen_name,
                    profile_image_url: author.profile_image_url
                }
            },
            
            prepareRetweetIndicator: function(retweeter) {
                return !retweeter ? '' : _.template(retweetIndicatorTemplate, {
                        name: retweeter.name,
                        profile_url: "https://twitter.com/"+retweeter.screen_name
                    });
            },
            
            prepareTweetText: function(text, entities) {
                if (!entities) {
                    return text;
                }
                
                text = this.prepareMentions(text, entities);
                text = this.prepareHashtags(text, entities);
                text = this.prepareLinks(text, entities);
                
                return text;
            },
            
            prepareMentions: function(text, entities) {
                _.each(entities.user_mentions, function(mention) {
                    text = text.replace(
                        '@'+mention.screen_name,
                        _.template(mentionTemplate, {screen_name: mention.screen_name})
                    );
                });
                
                return text;
            },
            
            prepareHashtags: function(text, entities) {
                _.each(entities.hashtags, function(hashtag) {
                    text = text.replace(
                        '#'+hashtag.text,
                        _.template(hashtagTemplate, {hashtag: hashtag.text})
                    );
                });
                
                return text;
            },
            
            prepareLinks: function(text, entities) {
                _.each(entities.urls, function(url) {
                    text = text.replace(
                        url.url,
                        _.template(urlTemplate, {url: url})
                    );
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