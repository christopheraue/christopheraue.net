require([
    'config'
], function() {
    require([
        'model/tweet/collection',
        'view/tweet/collection'
    ], function(TweetCollection, TweetCollectionView) {
        var tweetCollection = new TweetCollection(),
            tweetCollectionView = new TweetCollectionView({
                el: '.twitter-timeline .tweet-list',
                collection: tweetCollection
            });
            
        tweetCollection.fetch({
            success: function() {
                tweetCollectionView.render()
            }
        });
    })
});