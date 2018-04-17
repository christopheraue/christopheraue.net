define([
    '_components/video/js/youtube_video',
    'core-ext/body',
    'core-ext/Element'
], function(YouTubeVideo){
    var TheatreVideo = Object.inherit({
        video: null,
        focussed: false,
        constructor: function(screen) {
            this.screen = screen;
            this.video = new YouTubeVideo(screen.getElementsByTagName('iframe')[0]);

            this.video.addEventListener('stateChange', function(e){
                switch (e.data.to) {
                    case 'buffering':
                    case 'playing':
                        this.focus();
                        break;
                    case 'ended':
                        this.unfocus();
                        break;
                }
            }.bind(this));

            this.screen.addEventListener('click', function(){ this.unfocus() }.bind(this));
        },
        focus: function(){
            if (this.focussed){ return }

            this.focussed = true;
            this.screen.smoothScrollIntoView('center', '1s ease-in-out');
            document.body.disableScrolling();
            this.screen.classList.add('playing');
            this.video.play();
        },
        unfocus: function(){
            if (!this.focussed){ return }

            this.focussed = false;
            document.body.enableScrolling();
            this.screen.classList.remove('playing');
            this.video.pause();
        }
    });

    return TheatreVideo;
});