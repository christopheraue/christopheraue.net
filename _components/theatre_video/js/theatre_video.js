define([
    'core-ext/body',
    'core-ext/Element'
], function(){
    var TheatreVideo = Object.inherit({
        player: null,
        focussed: false,
        constructor: function(screen) {
            this.screen = screen;
            require(['youtube-api'], function(YT) {
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
            }.bind(this));
        },
        focus: function(){
            require(['youtube-api'], function(YT) {
                YT.ready(function(){
                    this.focussed = true;
                    this.screen.smoothScrollIntoView('center', '1s ease-in-out');
                    document.body.disableScrolling();
                    this.screen.classList.add('playing');
                    this.player.playVideo();
                }.bind(this));
            }.bind(this));
        },
        unfocus: function(){
            require(['youtube-api'], function(YT) {
                YT.ready(function(){
                    this.focussed = false;
                    document.body.enableScrolling();
                    this.screen.classList.remove('playing');
                    this.player.pauseVideo();
                }.bind(this));
            }.bind(this));
        }
    });

    return TheatreVideo;
});