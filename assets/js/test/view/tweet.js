define([
    'view/tweet',
    'model/tweet',
    'ajaxproxy',
    'backbone'
], function(TweetView, Tweet, ajaxproxy, Backbone) {
    describe('Tweet View', function() {
        beforeEach(function(done) {
            var tweet = new Tweet({id: '421321506891636736'});
            
            this.tweetView = new TweetView({model: tweet});
            
            ajaxproxy(Backbone.$, 'ajax');
            tweet.fetch({
                success: function() {
                    done();
                }
            });
        });
        
        describe('Timestamp', function() {
            it('has a datetime that is given in UTC', function() {
                expect(this.tweetView.prepareTweetTimestamp().datetime).toBe('Thu, 09 Jan 2014 16:44:09 GMT');
            })
            
            it('is formatted correctly when the tweet was posted some seconds ago', function() {
                //set now to 11 seconds after the tweet was posted
                spyOn(Date, 'now').and.returnValue(new Date('Thu, 09 Jan 2014 16:44:20 GMT'));
                
                expect(this.tweetView.prepareTweetTimestamp().formatted).toBe('11s');
            });
            
            it('is formatted correctly when the tweet was posted some minutes ago', function() {
                //set now to 22 minutes and 44 seconds after the tweet was posted
                spyOn(Date, 'now').and.returnValue(new Date('Thu, 09 Jan 2014 17:06:43 GMT'));
                expect(this.tweetView.prepareTweetTimestamp().formatted).toBe('22m');
            });
            
            it('is formatted correctly when the tweet was posted some hours ago', function() {
                //set now to 2 hours, 18 minutes and 44 seconds after the tweet was posted
                spyOn(Date, 'now').and.returnValue(new Date('Thu, 09 Jan 2014 19:06:43 GMT'));
                expect(this.tweetView.prepareTweetTimestamp().formatted).toBe('2h');
            });
            
            it('is formatted correctly when the tweet was posted some days ago', function() {
                //set now to 8 days, 2 hours, 18 minutes and 44 seconds after the tweet was posted
                spyOn(Date, 'now').and.returnValue(new Date('Thu, 17 Jan 2014 19:06:43 GMT'));
                expect(this.tweetView.prepareTweetTimestamp().formatted).toBe('Jan 09');
            });
            
            it('is formatted correctly when the tweet was posted over a year ago', function() {
                //set now to 1 year, 8 days, 2 hours, 18 minutes and 44 seconds after the tweet was posted
                spyOn(Date, 'now').and.returnValue(new Date('Thu, 17 Jan 2015 19:06:43 GMT'));
                expect(this.tweetView.prepareTweetTimestamp().formatted).toBe('Jan 09, 2014');
            });
        });
        
        it('renders correctly', function(done) {
            var tweetViewHtml = this.tweetView.render().el.outerHTML;
            
            require([
                'text!test/_data/view/tweet/421321506891636736/render.out'
            ], function(referenceOutput) {
                expect(tweetViewHtml).toBe(referenceOutput);
                done();
            });
        });
    });
});