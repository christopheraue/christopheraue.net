define([
    './js/Video',
    './js/BufferMonitor'
], function(Video, BufferMonitor){
    return Video.inherit({
        state: 'initializing',
        constructor: function(wrapper) {
            Video.call(this);

            this.wrapper = wrapper;
            this.el = wrapper.getElementsByTagName('video')[0];

            // Set up normalized events
            var bufferMonitor = new BufferMonitor(this, 500);

            this.el.addEventListener('play', function() {
                this.dispatchEvent('stateChange', {from: this.state, to: 'playing'});
                bufferMonitor.start();
            }.bind(this));

            this.el.addEventListener('pause', function() {
                this.dispatchEvent('stateChange', {from: this.state, to: 'paused'});
                bufferMonitor.stop();
            }.bind(this));

            this.el.addEventListener('ended', function() {
                this.dispatchEvent('stateChange', {from: this.state, to: 'ended'});
                bufferMonitor.stop();
            }.bind(this));

            // Set class on wrapper depending on state
            this.addEventListener('stateChange', function(e){
                this.wrapper.classList.remove(e.data.from);
                this.wrapper.classList.add(e.data.to);
            }.bind(this));

            this.dispatchEvent('stateChange', {from: this.state, to: 'unstarted'});
        },
        play: function() {
            this.el.play();
        },
        pause: function() {
            this.el.pause();
        },
        stop: function() {
            this.el.pause();
            this.el.currentTime = 0;
            this.el.load();
            this.dispatchEvent('stateChange', {from: this.state, to: 'unstarted'});
        },
        addMinimalControls: function() {
            this.wrapper.addEventListener('click', function(){
                if (this.state !== 'playing') {
                    this.play();
                } else {
                    this.pause();
                }
            }.bind(this));
        }
    });
});