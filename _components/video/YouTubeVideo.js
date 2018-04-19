define([
    './js/Video'
],function(Video){
    var api = function(f) {
        require(['youtube-api'], function(YT) {
            YT.ready(function(){ f(YT) })
        })
    };

    return Video.inherit({
        state: 'initializing',
        constructor: function(el) {
            Video.call(this);

            this.el = el;

            api(function(YT) {
                var states = {};
                states[YT.PlayerState.UNSTARTED] = 'unstarted';
                states[YT.PlayerState.BUFFERING] = 'buffering';
                states[YT.PlayerState.PLAYING] = 'playing';
                states[YT.PlayerState.PAUSED] = 'paused';
                states[YT.PlayerState.ENDED] = 'ended';

                this.player = new YT.Player(this.el, {
                    events: {
                        'onStateChange': function (event) {
                            this.dispatchEvent('stateChange', {from: this.state, to: states[event.data]});
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
        }
    });
});