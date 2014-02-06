define([
    'underscore',
    'backbone',
    'view/tweet',
    'text!template/collection/item.html'
], function(_, Backbone, TweetView, collectionItemTemplate) {
    var TweetCollectionView = Backbone.View.extend({
        tagName: 'ol',
        className: 'tweet-list',
        
        render: function() {
            var that = this;
            //render each tweet
            this.collection.each(function(tweet) {
                var tweetView = new TweetView({model: tweet}),
                    $item = that.renderItem(tweetView.render().$el);
                
                that.$el.append($item);
            });
            
            return this;
        },
        
        renderItem: function(content) {
            var $item = Backbone.$(_.template(collectionItemTemplate, {}));
            $item.append(content);
            return $item;
        }
    });
    
    return TweetCollectionView;
});