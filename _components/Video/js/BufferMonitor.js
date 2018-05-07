define(function(){
    return Object.inherit({
        constructor: function(video, interval) {
            this.video = video;
            this.interval = interval;
        },
        start: function() {
            var lastTime = Date.now(),
                lastPos = 1000*this.video.el.currentTime,
                buffering = false;

            this.intervalId = window.setInterval(function () {
                var currTime = Date.now(),
                    currPos = 1000*this.video.el.currentTime,
                    dTime = currTime - lastTime,
                    dPos = currPos - lastPos;

                if (dPos < 0) {
                    // looping video restarts
                    dPos = this.interval;
                }

                if (dPos < 0.5*dTime) {
                    if (!buffering) {
                        buffering = true;
                        this.video.dispatchEvent('buffering');
                    }
                } else {
                    if (buffering) {
                        buffering = false;
                        this.video.dispatchEvent('playing');
                    }
                }

                lastTime = currTime;
                lastPos = currPos;
            }.bind(this), this.interval);
        },
        stop: function() {
            window.clearInterval(this.intervalId);
        }
    })
});