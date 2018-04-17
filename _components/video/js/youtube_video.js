define([
    '_components/global/EventTarget'
],function(EventTarget){
    var api = function(f) {
        require(['youtube-api'], function(YT) {
            YT.ready(function(){ f(YT) })
        })
    };

    var states = {};
    api(function(YT) {
        states[YT.PlayerState.UNSTARTED] = 'unstarted';
        states[YT.PlayerState.BUFFERING] = 'buffering';
        states[YT.PlayerState.PLAYING] = 'playing';
        states[YT.PlayerState.PAUSED] = 'paused';
        states[YT.PlayerState.ENDED] = 'ended';
    });

    var YouTubeVideo = EventTarget.inherit({
        constructor: function(el) {
            this.constructor.superconstructor.call(this);
            this.el = el;
            api(function(YT) {
                this.player = new YT.Player(this.el, {
                    events: {
                        'onStateChange': function (event) {
                            var name = states[event.data];
                            if (!name) { return }
                            this.dispatchEvent(name);
                        }.bind(this)
                    }
                });
            }.bind(this));
        },
        play: function() {
            if (!this.player) { return }
            this.player.playVideo();
        },
        pause: function() {
            if (!this.player) { return }
            this.player.pauseVideo();
        },
        stop: function() {
            if (!this.player) { return }
            this.player.stopVideo();
        },
        state: function() {
            if (!this.player) {
                return "not ready";
            } else {
                return states[this.player.getPlayerState()];
            }
        }
    });

    return YouTubeVideo;
});