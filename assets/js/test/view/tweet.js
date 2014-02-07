define([
    'view/tweet',
    'model/tweet',
    'ajaxproxy',
    'backbone'
], function(TweetView, Tweet, ajaxproxy, Backbone) {
    describe('Tweet View', function() {
        beforeEach(function(done) {
            this.tweet = new Tweet({id: '421321506891636736'});
            
            ajaxproxy(Backbone.$, 'ajax');
            this.tweet.fetch({
                success: function() {
                    done();
                }
            });
        });
        
        describe('Text', function() {
            describe('when there is only one entity of each type', function() {
                beforeEach(function() {
                    this.text = "Placeit - Generate Product Screenshots in Realistic Environments https:\/\/t.co\/EOtwdoiWsy #placeit via @placeitapp";
                    this.entities = {
                        "hashtags":[
                            {
                                "text":"placeit",
                                "indices":[
                                    89,
                                    97
                                 ]
                            }
                        ],
                        "urls":[
                            {
                                "url":"https:\/\/t.co\/EOtwdoiWsy",
                                "expanded_url":"https:\/\/placeit.net",
                                "display_url":"placeit.net",
                                "indices":[
                                    65,
                                    88
                                ]
                            }
                        ],
                        "user_mentions":[
                            {
                                "screen_name":"placeitapp",
                                "name":"Placeit",
                                "id":2149691558,
                                "id_str":"2149691558",
                                "indices":[
                                    102,
                                    113
                                ]
                            }
                        ]
                    };
                });
            
                it('has all the hashtag marked up', function() {
                    expect(
                        TweetView.prepareHashtags(this.text, this.entities)
                    ).toMatch(
                        /<span class="hashtag"><span class="hash">#<\/span><a href="#" class="tag">placeit<\/a><\/span>/
                    );
                });
                
                it('has the mention marked up', function() {
                    expect(
                        TweetView.prepareMentions(this.text, this.entities)
                    ).toMatch(
                        /<span class="at-username"><span class="at">@<\/span><a href="https:\/\/twitter.com\/placeitapp" class="username">placeitapp<\/a><\/span>/
                    );
                });
                
                it('has the link marked up', function() {
                    expect(
                        TweetView.prepareLinks(this.text, this.entities)
                    ).toMatch(
                        /<a href="https:\/\/t.co\/EOtwdoiWsy" class="link">placeit.net<\/a>/
                    );
                });
            });
        });
        
        describe('Timestamp', function() {
            beforeEach(function() {
                this.timestamp = this.tweet.get('created_at');
            });
            
            it('has a datetime that is given in UTC', function() {
                expect(
                    TweetView.prepareTweetTimestamp(this.timestamp).datetime
                ).toBe('Thu, 09 Jan 2014 16:44:09 GMT');
            })
            
            it('is formatted correctly when the tweet was posted some seconds ago', function() {
                //set now to 11 seconds after the tweet was posted
                spyOn(Date, 'now').and.returnValue(new Date('Thu, 09 Jan 2014 16:44:20 GMT'));
                
                expect(
                    TweetView.prepareTweetTimestamp(this.timestamp).formatted
                ).toBe('11s');
            });
            
            it('is formatted correctly when the tweet was posted some minutes ago', function() {
                //set now to 22 minutes and 44 seconds after the tweet was posted
                spyOn(Date, 'now').and.returnValue(new Date('Thu, 09 Jan 2014 17:06:43 GMT'));
                expect(
                    TweetView.prepareTweetTimestamp(this.timestamp).formatted
                ).toBe('22m');
            });
            
            it('is formatted correctly when the tweet was posted some hours ago', function() {
                //set now to 2 hours, 18 minutes and 44 seconds after the tweet was posted
                spyOn(Date, 'now').and.returnValue(new Date('Thu, 09 Jan 2014 19:06:43 GMT'));
                expect(
                    TweetView.prepareTweetTimestamp(this.timestamp).formatted
                ).toBe('2h');
            });
            
            it('is formatted correctly when the tweet was posted some days ago', function() {
                //set now to 8 days, 2 hours, 18 minutes and 44 seconds after the tweet was posted
                spyOn(Date, 'now').and.returnValue(new Date('Thu, 17 Jan 2014 19:06:43 GMT'));
                expect(
                    TweetView.prepareTweetTimestamp(this.timestamp).formatted
                ).toBe('Jan 09');
            });
            
            it('is formatted correctly when the tweet was posted over a year ago', function() {
                //set now to 1 year, 8 days, 2 hours, 18 minutes and 44 seconds after the tweet was posted
                spyOn(Date, 'now').and.returnValue(new Date('Thu, 17 Jan 2015 19:06:43 GMT'));
                expect(
                    TweetView.prepareTweetTimestamp(this.timestamp).formatted
                ).toBe('Jan 09, 2014');
            });
        });
    });
});