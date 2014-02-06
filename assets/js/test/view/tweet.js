define([
    'view/tweet',
    'model/tweet',
    'ajaxproxy',
    'backbone'
], function(TweetView, Tweet, ajaxproxy, Backbone) {
    describe('Tweet View', function() {
        it('renders correctly', function(done) {
            var tweet = new Tweet({id: '421321506891636736'});
            ajaxproxy(Backbone.$, 'ajax');
            tweet.fetch({
                success: function() {
                    var tweetView = new TweetView({model: tweet}),
                        tweetViewHtml = tweetView.render().el.outerHTML;
                    
                    require([
                        'text!test/_data/view/tweet/421321506891636736/render.out'
                    ], function(referenceOutput) {
                        expect(tweetViewHtml).toBe(referenceOutput);
                        done();
                    });
                }
            });
        });
    });
});