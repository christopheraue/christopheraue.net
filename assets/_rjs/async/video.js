define([
    'core-ext/document'
], function(){
    var Video = function(wrapper) {
        this.wrapper = wrapper;
        this.el = wrapper.getElementsByTagName('video')[0];
    };

    Video.prototype = {
        addMinimalControls: function() {
            this.wrapper.addEventListener('click', function(){
                if (this.el.paused) {
                    this.el.play();
                } else {
                    this.el.pause();
                }
            }.bind(this));

            if (this.el.paused) {
                this.wrapper.classList.add('paused');
            } else {
                this.wrapper.classList.add('playing');
            }

            this.el.addEventListener('play', function(){
                this.wrapper.classList.remove('paused');
                this.wrapper.classList.add('playing');
            }.bind(this));

            this.el.addEventListener('pause', function(){
                this.wrapper.classList.remove('playing');
                this.wrapper.classList.add('paused');
            }.bind(this));
        }
    };

    return Video;
});