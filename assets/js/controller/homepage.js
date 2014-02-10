define([
    'underscore',
    'controller/page'
], function(_, page) {
    var homepage = Object.create(page),
        __parent = page;
    
    _.extend(homepage, {
        init: function() {
            __parent.init.call(this);
            
            require([
                'model/tweet/collection',
                'view/tweet/collection'
            ], function(TweetCollection, TweetCollectionView) {
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
            })
        }
    });
    
    return homepage;
});