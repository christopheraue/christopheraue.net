define([
    'underscore',
    'ui-controller/page',
    'model/tweet/collection',
    'view/tweet/collection'
], function(_, page, TweetCollection, TweetCollectionView) {
    var homepage = Object.create(page),
        __parent = page;
    
    _.extend(homepage, {
        loadAction: function() {
            __parent.loadAction.call(this);
            
            var tweetCollection = new TweetCollection(),
                tweetCollectionView = new TweetCollectionView({
                    el: '.js-twitter-timeline-home',
                    collection: tweetCollection
                });
                
            tweetCollection.fetch({
                success: function() {
                    tweetCollectionView.render()
                }
            });
        }
    });
    
    return homepage;
});