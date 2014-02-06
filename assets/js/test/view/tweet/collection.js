define([
    'view/tweet/collection',
    'model/tweet/collection',
    'ajaxproxy',
    'backbone'
], function(TweetCollectionView, TweetCollection, ajaxproxy, Backbone) {
    describe('Tweet Collection View', function() {
        it('renders correctly', function(done) {
            var tweetCollection = new TweetCollection([], {
                    screen_name: 'christopheraue',
                    count: '10',
                    max_id: '421321506891636736'
                });
            
            ajaxproxy(Backbone.$, 'ajax');
            tweetCollection.fetch({
                success: function() {
                    var tweetCollectionView = new TweetCollectionView({collection: tweetCollection}),
                        tweetCollectionViewHtml = tweetCollectionView.render().el.outerHTML;
                    
                    expect(tweetCollectionViewHtml.match(/<li class="item"><blockquote class="tweet">/g).length).toBe(10);
                    done();
                }
            });
        });
    });
});