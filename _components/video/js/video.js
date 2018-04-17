define([
    '_components/global/EventTarget',
    './buffer_monitor'
], function(EventTarget, BufferMonitor){
    return EventTarget.inherit({
        constructor: function(wrapper) {
            this.constructor.superconstructor.call(this);

            this.wrapper = wrapper;
            this.el = wrapper.getElementsByTagName('video')[0];

            // Set up normalized events
            var bufferMonitor = new BufferMonitor(this, 500);

            this.el.addEventListener('play', function() {
                this.dispatchEvent('playing');
                bufferMonitor.start();
            }.bind(this));

            this.el.addEventListener('pause', function() {
                this.dispatchEvent('paused');
                bufferMonitor.stop();
            }.bind(this));

            this.el.addEventListener('ended', function() {
                this.dispatchEvent('ended');
                bufferMonitor.stop();
            }.bind(this));

            // Track state
            var prevState = 'unstarted';
            var stateListener = function(e){
                this.state = e.type;
                this.wrapper.classList.remove(prevState);
                this.wrapper.classList.add(this.state);
                prevState = this.state;
            }.bind(this);

            this.addEventListener('unstarted', stateListener);
            this.addEventListener('buffering', stateListener);
            this.addEventListener('playing', stateListener);
            this.addEventListener('paused', stateListener);
            this.addEventListener('ended', stateListener);

            this.dispatchEvent('unstarted');
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
            this.dispatchEvent('unstarted');
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