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
        
        describe('Original Tweet', function() {
            var tweet = new Tweet({
                  "created_at":"Thu Jan 09 16:44:09 +0000 2014",
                  "id":421321506891636736,
                  "id_str":"421321506891636736",
                  "text":"Placeit - Generate Product Screenshots in Realistic Environments",
                  "source":"\u003ca href=\"http:\/\/twitter.com\/tweetbutton\" rel=\"nofollow\"\u003eTweet Button\u003c\/a\u003e",
                  "truncated":false,
                  "in_reply_to_status_id":null,
                  "in_reply_to_status_id_str":null,
                  "in_reply_to_user_id":null,
                  "in_reply_to_user_id_str":null,
                  "in_reply_to_screen_name":null,
                  "user":{
                     "id":253575497,
                     "id_str":"253575497",
                     "name":"Christopher Aue",
                     "screen_name":"christopheraue",
                     "location":"Germany",
                     "description":"",
                     "url":"http:\/\/t.co\/YoaOPCJ1qc",
                     "entities":{
                        "url":{
                           "urls":[
                              {
                                 "url":"http:\/\/t.co\/YoaOPCJ1qc",
                                 "expanded_url":"http:\/\/christopheraue.net",
                                 "display_url":"christopheraue.net",
                                 "indices":[
                                    0,
                                    22
                                 ]
                              }
                           ]
                        },
                        "description":{
                           "urls":[

                           ]
                        }
                     },
                     "protected":false,
                     "followers_count":7,
                     "friends_count":14,
                     "listed_count":0,
                     "created_at":"Thu Feb 17 14:41:06 +0000 2011",
                     "favourites_count":1,
                     "utc_offset":3600,
                     "time_zone":"Amsterdam",
                     "geo_enabled":false,
                     "verified":false,
                     "statuses_count":34,
                     "lang":"en",
                     "contributors_enabled":false,
                     "is_translator":false,
                     "is_translation_enabled":false,
                     "profile_background_color":"C0DEED",
                     "profile_background_image_url":"http:\/\/abs.twimg.com\/images\/themes\/theme1\/bg.png",
                     "profile_background_image_url_https":"https:\/\/abs.twimg.com\/images\/themes\/theme1\/bg.png",
                     "profile_background_tile":false,
                     "profile_image_url":"http:\/\/pbs.twimg.com\/profile_images\/378800000847541191\/c52da5baadf1eeb7e2e06ad803936d20_normal.png",
                     "profile_image_url_https":"https:\/\/pbs.twimg.com\/profile_images\/378800000847541191\/c52da5baadf1eeb7e2e06ad803936d20_normal.png",
                     "profile_link_color":"0084B4",
                     "profile_sidebar_border_color":"C0DEED",
                     "profile_sidebar_fill_color":"DDEEF6",
                     "profile_text_color":"333333",
                     "profile_use_background_image":true,
                     "default_profile":true,
                     "default_profile_image":false,
                     "following":false,
                     "follow_request_sent":false,
                     "notifications":false
                  },
                  "geo":null,
                  "coordinates":null,
                  "place":null,
                  "contributors":null,
                  "retweet_count":0,
                  "favorite_count":0,
                  "favorited":false,
                  "retweeted":false,
                  "possibly_sensitive":false,
                  "lang":"en"
                });
            
            var preparedTweet = TweetView.prepareTweet(tweet);
            it('has its own ID set', function() {
                expect(preparedTweet.id).toBe("421321506891636736");
            });
            it('shows its author', function() {
                expect(preparedTweet.author).toEqual({
                    name: "Christopher Aue",
                    screen_name: "christopheraue",
                    profile_url: "https://twitter.com/christopheraue",
                    profile_image_url: "http:\/\/pbs.twimg.com\/profile_images\/378800000847541191\/c52da5baadf1eeb7e2e06ad803936d20_normal.png"
                });
            });
            it('has no retweet indicator', function() {
                expect(preparedTweet.retweet_indicator).toBe('');
            });
            it('shows its text', function() { 
                expect(preparedTweet.text).toBe("Placeit - Generate Product Screenshots in Realistic Environments");
            });
            it('shows its timestamp', function() {
                expect(preparedTweet.created_at.datetime).toBe("Thu, 09 Jan 2014 16:44:09 GMT");
            });
        });
        
        describe('Retweet', function() {
            var tweet = new Tweet({
                      "created_at":"Thu Jan 02 11:36:02 +0000 2014",
                      "id":418707250648084482,
                      "id_str":"418707250648084482",
                      "text":"RT @lukew: What's better than discussing? Designing. What's better than designing? Coding. What's better than coding? Shipping.",
                      "source":"\u003ca href=\"http:\/\/twitter.com\/download\/android\" rel=\"nofollow\"\u003eTwitter for Android\u003c\/a\u003e",
                      "truncated":false,
                      "in_reply_to_status_id":null,
                      "in_reply_to_status_id_str":null,
                      "in_reply_to_user_id":null,
                      "in_reply_to_user_id_str":null,
                      "in_reply_to_screen_name":null,
                      "user":{
                         "id":253575497,
                         "id_str":"253575497",
                         "name":"Christopher Aue",
                         "screen_name":"christopheraue",
                         "location":"Germany",
                         "description":"",
                         "url":"http:\/\/t.co\/YoaOPCJ1qc",
                         "entities":{
                            "url":{
                               "urls":[
                                  {
                                     "url":"http:\/\/t.co\/YoaOPCJ1qc",
                                     "expanded_url":"http:\/\/christopheraue.net",
                                     "display_url":"christopheraue.net",
                                     "indices":[
                                        0,
                                        22
                                     ]
                                  }
                               ]
                            },
                            "description":{
                               "urls":[

                               ]
                            }
                         },
                         "protected":false,
                         "followers_count":7,
                         "friends_count":14,
                         "listed_count":0,
                         "created_at":"Thu Feb 17 14:41:06 +0000 2011",
                         "favourites_count":1,
                         "utc_offset":3600,
                         "time_zone":"Amsterdam",
                         "geo_enabled":false,
                         "verified":false,
                         "statuses_count":34,
                         "lang":"en",
                         "contributors_enabled":false,
                         "is_translator":false,
                         "is_translation_enabled":false,
                         "profile_background_color":"C0DEED",
                         "profile_background_image_url":"http:\/\/abs.twimg.com\/images\/themes\/theme1\/bg.png",
                         "profile_background_image_url_https":"https:\/\/abs.twimg.com\/images\/themes\/theme1\/bg.png",
                         "profile_background_tile":false,
                         "profile_image_url":"http:\/\/pbs.twimg.com\/profile_images\/378800000847541191\/c52da5baadf1eeb7e2e06ad803936d20_normal.png",
                         "profile_image_url_https":"https:\/\/pbs.twimg.com\/profile_images\/378800000847541191\/c52da5baadf1eeb7e2e06ad803936d20_normal.png",
                         "profile_link_color":"0084B4",
                         "profile_sidebar_border_color":"C0DEED",
                         "profile_sidebar_fill_color":"DDEEF6",
                         "profile_text_color":"333333",
                         "profile_use_background_image":true,
                         "default_profile":true,
                         "default_profile_image":false,
                         "following":false,
                         "follow_request_sent":false,
                         "notifications":false
                      },
                      "geo":null,
                      "coordinates":null,
                      "place":null,
                      "contributors":null,
                      "retweeted_status":{
                         "created_at":"Thu Nov 28 01:13:18 +0000 2013",
                         "id":405866958165258240,
                         "id_str":"405866958165258240",
                         "text":"What's better than discussing? Designing. What's better than designing? Coding. What's better than coding? Shipping.",
                         "source":"\u003ca href=\"http:\/\/twitter.com\/download\/iphone\" rel=\"nofollow\"\u003eTwitter for iPhone\u003c\/a\u003e",
                         "truncated":false,
                         "in_reply_to_status_id":null,
                         "in_reply_to_status_id_str":null,
                         "in_reply_to_user_id":null,
                         "in_reply_to_user_id_str":null,
                         "in_reply_to_screen_name":null,
                         "user":{
                            "id":13889622,
                            "id_str":"13889622",
                            "name":"Luke Wroblewski",
                            "screen_name":"lukew",
                            "location":"Silicon Valley + the Web",
                            "description":"Digital product design & strategy guy in Silicon Valley. Known for Mobile First, Web Form Design, Polar, Bagcheck, ...",
                            "url":"http:\/\/t.co\/eTQHZeellQ",
                            "entities":{
                               "url":{
                                  "urls":[
                                     {
                                        "url":"http:\/\/t.co\/eTQHZeellQ",
                                        "expanded_url":"http:\/\/www.lukew.com",
                                        "display_url":"lukew.com",
                                        "indices":[
                                           0,
                                           22
                                        ]
                                     }
                                  ]
                               },
                               "description":{
                                  "urls":[

                                  ]
                               }
                            },
                            "protected":false,
                            "followers_count":79261,
                            "friends_count":97,
                            "listed_count":5813,
                            "created_at":"Sun Feb 24 04:01:42 +0000 2008",
                            "favourites_count":2318,
                            "utc_offset":-28800,
                            "time_zone":"Pacific Time (US & Canada)",
                            "geo_enabled":true,
                            "verified":false,
                            "statuses_count":13094,
                            "lang":"en",
                            "contributors_enabled":false,
                            "is_translator":false,
                            "is_translation_enabled":false,
                            "profile_background_color":"FFFFFF",
                            "profile_background_image_url":"http:\/\/pbs.twimg.com\/profile_background_images\/333653482\/Screen_shot_2011-09-20_at_10.32.22_AM.png",
                            "profile_background_image_url_https":"https:\/\/pbs.twimg.com\/profile_background_images\/333653482\/Screen_shot_2011-09-20_at_10.32.22_AM.png",
                            "profile_background_tile":false,
                            "profile_image_url":"http:\/\/pbs.twimg.com\/profile_images\/2924627654\/c28337b0191a03064ba289db29564dc8_normal.png",
                            "profile_image_url_https":"https:\/\/pbs.twimg.com\/profile_images\/2924627654\/c28337b0191a03064ba289db29564dc8_normal.png",
                            "profile_banner_url":"https:\/\/pbs.twimg.com\/profile_banners\/13889622\/1348540123",
                            "profile_link_color":"449400",
                            "profile_sidebar_border_color":"88D822",
                            "profile_sidebar_fill_color":"E3F8AF",
                            "profile_text_color":"484242",
                            "profile_use_background_image":true,
                            "default_profile":false,
                            "default_profile_image":false,
                            "following":false,
                            "follow_request_sent":false,
                            "notifications":false
                         },
                         "geo":null,
                         "coordinates":null,
                         "place":null,
                         "contributors":null,
                         "retweet_count":255,
                         "favorite_count":187,
                         "entities":{
                            "hashtags":[

                            ],
                            "symbols":[

                            ],
                            "urls":[

                            ],
                            "user_mentions":[

                            ]
                         },
                         "favorited":true,
                         "retweeted":true,
                         "lang":"en"
                      },
                      "retweet_count":255,
                      "favorite_count":0,
                      "entities":{
                         "hashtags":[

                         ],
                         "symbols":[

                         ],
                         "urls":[

                         ],
                         "user_mentions":[
                            {
                               "screen_name":"lukew",
                               "name":"Luke Wroblewski",
                               "id":13889622,
                               "id_str":"13889622",
                               "indices":[
                                  3,
                                  9
                               ]
                            }
                         ]
                      },
                      "favorited":true,
                      "retweeted":true,
                      "lang":"en"
                    });
            
            var preparedTweet = TweetView.prepareTweet(tweet);
            it('has its own ID set', function() {
                expect(preparedTweet.id).toBe("418707250648084482");
            });
            it('shows the author of the origianl tweet', function() {
                    expect(preparedTweet.author).toEqual({
                    name: "Luke Wroblewski",
                    screen_name: "lukew",
                    profile_url: "https://twitter.com/lukew",
                    profile_image_url: "http:\/\/pbs.twimg.com\/profile_images\/2924627654\/c28337b0191a03064ba289db29564dc8_normal.png"
                });
            });
            it('has a retweet indicator showing the author or the retweet', function() {
                expect(preparedTweet.retweet_indicator).toMatch(/Retweeted by <a href="https:\/\/twitter.com\/christopheraue" class="name">Christopher Aue<\/a>/);
            });
            it('shows the text of the original tweet set', function() { 
                expect(preparedTweet.text).toBe("What's better than discussing? Designing. What's better than designing? Coding. What's better than coding? Shipping.");
            });
            it('shows the timestamp of the original tweet', function() {
                expect(preparedTweet.created_at.datetime).toBe("Thu, 28 Nov 2013 01:13:18 GMT");
            });
        });
    });
});