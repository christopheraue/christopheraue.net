define('theatre-mode', function(){
    var YT, youTubeReady = false, youTubeReadyCallbacks = [];
    var smoothScrollToCenterOf = function(screen) {
        var screenRect = screen.getBoundingClientRect(),
            screenYCenter = screenRect.top + screenRect.height/2,
            viewportYCenter = window.innerHeight/2,
            scrollDistance = screenYCenter-viewportYCenter,
            scrollDuration = 1, // seconds
            bodyStyle = document.body.style;
        console.log(scrollDistance);
        bodyStyle.transform = "translate(0px, " + scrollDistance + "px)";
        window.scrollBy(0, scrollDistance);
        bodyStyle.transition = "transform " + scrollDuration + "s ease";
        bodyStyle.transform = null;
        setTimeout(function(){ bodyStyle.transition = null }, scrollDuration*1000);
    };

    return {
        init: function() {
            YT = require(['youtube-api'], function(YT){
                window.onYouTubeIframeAPIReady = function() {
                    youTubeReady = true;
                    youTubeReadyCallbacks.forEach(function(callback) {
                        callback(YT);
                    })
                }
            });
        },
        initVideo: function(screen) {
            var initialize = function(YT) {
                var scrolling = false;

                var player = new YT.Player(screen.getElementsByTagName('iframe')[0], {
                    events: {
                        'onStateChange': function(event) {
                            switch(event.data) {
                                case YT.PlayerState.BUFFERING:
                                case YT.PlayerState.PLAYING:
                                    screen.addClass('playing');
                                    if (!scrolling) {
                                        scrolling = true;
                                        smoothScrollToCenterOf(screen);
                                    }
                                    break;
                                default:
                                    screen.rmvClass('playing');
                                    scrolling = false;
                            }
                        }
                    }
                });

                screen.addEventListener('click', function() {
                    switch(player.getPlayerState()) {
                        case YT.PlayerState.PLAYING:
                        case YT.PlayerState.BUFFERING:
                            player.pauseVideo();
                            break;
                        default:
                            // do nothing
                    }
                });
            };

            if (youTubeReady) {
                initialize(YT);
            } else {
                youTubeReadyCallbacks.push(initialize);
            }
        }
    }
});