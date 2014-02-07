define([
    'view/tweet',
    'model/tweet',
    'ajaxproxy',
    'backbone'
], function(TweetView, Tweet, ajaxproxy, Backbone) {
    describe('Tweet View', function() {
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
            
                it('has the hashtag marked up', function() {
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
            
            describe('when there is more than one entity of each type', function() {
                //tweet 431877131392778240
                var text = "An experience I will never forget! #OpeningCeremony #Sochi2014 http://t.co/qzkzGfg1Ps",
                    entities = {
                        "hashtags": [
                            {
                                "text": "OpeningCeremony",
                                "indices": [
                                    35,
                                    51
                                ]
                            },
                            {
                                "text": "Sochi2014",
                                "indices": [
                                    52,
                                    62
                                ]
                            }
                        ],
                        "symbols": {},
                        "urls": {},
                        "user_mentions": {}
                    };
                
                it('has all two hashtags marked up', function() {
                    var textWithHashtags = TweetView.prepareHashtags(text, entities)
                    expect(
                        textWithHashtags
                    ).toMatch(
                        /<span class="hashtag"><span class="hash">#<\/span><a href="#" class="tag">OpeningCeremony<\/a><\/span>/
                    );
                    
                    expect(
                        textWithHashtags
                    ).toMatch(
                        /<span class="hashtag"><span class="hash">#<\/span><a href="#" class="tag">Sochi2014<\/a><\/span>/
                    );
                });
                
                it('has all three mentions marked up', function() {
                    //tweet 431863958434508801
                    var text = "150M Americans have access to own health info! Thx @pllevin @aneeshchopra @todd_park ONC PIFs & priv sector partners! http://t.co/oaEs0C8Vnk",
                        entities = {
                            "hashtags": {},
                            "symbols": {},
                            "urls": [{
                                "url": "http://t.co/oaEs0C8Vnk",
                                "expanded_url": "http://www.whitehouse.gov/blog/2014/02/07/leading-pharmacies-and-retailers-join-blue-button-initiative",
                                "display_url": "whitehouse.gov/blog/2014/02/0…",
                                "indices": [
                                    122,
                                    144
                                ]
                            }],
                            "user_mentions": [
                                {
                                    "screen_name": "pllevin",
                                    "name": "Peter L. Levin",
                                    "id": 12887522,
                                    "id_str": "12887522",
                                    "indices": [
                                        51,
                                        59
                                    ]
                                },
                                {
                                    "screen_name": "aneeshchopra",
                                    "name": "Aneesh Chopra",
                                    "id": 121539516,
                                    "id_str": "121539516",
                                    "indices": [
                                        60,
                                        73
                                    ]
                                },
                                {
                                    "screen_name": "todd_park",
                                    "name": "Todd Park",
                                    "id": 200176600,
                                    "id_str": "200176600",
                                    "indices": [
                                        74,
                                        84
                                    ]
                                }
                            ]
                        };
                    
                    var textWithMentions = TweetView.prepareMentions(text, entities)
                    expect(
                        textWithMentions
                    ).toMatch(
                        /<span class="at-username"><span class="at">@<\/span><a href="https:\/\/twitter.com\/pllevin" class="username">pllevin<\/a><\/span>/
                    );
                    
                    expect(
                        textWithMentions
                    ).toMatch(
                        /<span class="at-username"><span class="at">@<\/span><a href="https:\/\/twitter.com\/aneeshchopra" class="username">aneeshchopra<\/a><\/span>/
                    );
                    
                    expect(
                        textWithMentions
                    ).toMatch(
                        /<span class="at-username"><span class="at">@<\/span><a href="https:\/\/twitter.com\/todd_park" class="username">todd_park<\/a><\/span>/
                    );
                });
                
                it('has all two links marked up', function() {
                    //tweet 431490226200911872
                    var text = "Want to listen to all the awesomeness that is @rdreeke at #CMXSummit? Follow livestream http://t.co/znEV5I5bpf & app https://t.co/Oic96qKWwZ",
                        entities = {
                            "hashtags": [{
                                "text": "CMXSummit",
                                "indices": [
                                    58,
                                    68
                                ]
                            }],
                            "symbols": {},
                            "urls": [
                                {
                                    "url": "http://t.co/znEV5I5bpf",
                                    "expanded_url": "http://bit.ly/cmxlive",
                                    "display_url": "bit.ly/cmxlive",
                                    "indices": [
                                        88,
                                        110
                                    ]
                                },
                                {
                                    "url": "https://t.co/Oic96qKWwZ",
                                    "expanded_url": "https://events.bizzabo.com/cmxsummit/welcome",
                                    "display_url": "events.bizzabo.com/cmxsummit/welc…",
                                    "indices": [
                                        121,
                                        144
                                    ]
                                }
                            ],
                            "user_mentions": [{
                                "screen_name": "rdreeke",
                                "name": "Robin Dreeke",
                                "id": 197907202,
                                "id_str": "197907202",
                                "indices": [
                                  46,
                                  54
                                ]
                            }]
                        };
                    
                    var textWithLinks = TweetView.prepareLinks(text, entities);
                    
                    expect(
                        textWithLinks
                    ).toMatch(
                        /<a href="http:\/\/t.co\/znEV5I5bpf" class="link">bit.ly\/cmxlive<\/a>/
                    );
                    
                    expect(
                        textWithLinks
                    ).toMatch(
                        /<a href="https:\/\/t.co\/Oic96qKWwZ" class="link">events.bizzabo.com\/cmxsummit\/welc…<\/a>/
                    );
                });
            });
        });
        
        describe('Timestamp', function() {
            beforeEach(function() {
                this.timestamp = "Thu Jan 09 16:44:09 +0000 2014";
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