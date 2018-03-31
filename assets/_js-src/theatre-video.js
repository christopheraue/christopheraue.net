define('theatre-video', [
    'youtube-api',
    'core-ext/body'
], function(YT){
    var Video = function(screen) {
        this.screen = screen;

        YT.ready(function() {
            var prepreviousState = YT.PlayerState.UNSTARTED;
            var previousState = YT.PlayerState.UNSTARTED;
            this.player = new YT.Player(screen.getElementsByTagName('iframe')[0], {
                events: {
                    'onStateChange': function(event){
                        switch(event.data) {
                            case YT.PlayerState.BUFFERING:
                                if (!this.focussed)
                                    this.focus();
                                break;
                            case YT.PlayerState.PLAYING:
                                if (prepreviousState === YT.PlayerState.BUFFERING &&
                                    previousState === YT.PlayerState.UNSTARTED)
                                    /* Pausing an unstarted, buffering video will put it back into
                                     * the unstarted state. But after buffering is complete the
                                     * video will still be played. This is unwanted behavior. */
                                    this.player.pauseVideo();
                                else if (!this.focussed)
                                    this.focus();
                                break;
                            case YT.PlayerState.PAUSED:
                                if (previousState === YT.PlayerState.ENDED)
                                    this.focus();
                                break;
                            default:
                                if (this.focussed)
                                    this.unfocus();
                        }
                        prepreviousState = previousState;
                        previousState = event.data;
                    }.bind(this)
                }
            });

            screen.addEventListener('click', function(){
                if (this.focussed)
                    this.unfocus();
            }.bind(this));
        }.bind(this));
    };

    Video.prototype = {
        player: null,
        focussed: false,
        focus: function(){
            YT.ready(function(){
                this.focussed = true;
                this.centerInViewport();
                document.body.disableScrolling();
                this.screen.addClass('playing');
                this.player.playVideo();
            }.bind(this));
        },
        unfocus: function(){
            YT.ready(function(){
                this.focussed = false;
                document.body.enableScrolling();
                this.screen.rmvClass('playing');
                this.player.pauseVideo();
            }.bind(this));
        },
        centerInViewport: function(){
            var videoRect = this.screen.getBoundingClientRect(),
                videoYCenter = videoRect.top + videoRect.height/2,
                viewportYCenter = window.innerHeight/2,
                scrollDistance = videoYCenter-viewportYCenter,
                scrollDuration = 1, // seconds
                bodyStyle = document.body.style;

            bodyStyle.transform = "translate(0px, " + scrollDistance + "px)";
            window.scrollBy(0, scrollDistance);
            bodyStyle.transition = "transform " + scrollDuration + "s ease";
            bodyStyle.transform = '';
            setTimeout(function(){ bodyStyle.transition = '' }, scrollDuration*1000);
        }
    };

    return Video;
});