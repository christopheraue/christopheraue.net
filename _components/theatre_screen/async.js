define([
    './js/TheatreScreen',
    '_components/video/js/youtube_video'
], function(TheatreScreen, YouTubeVideo) {
    document.ready(function() {
        document.getElementsByClassName('theatre-screen').forEach(function(screen) {
            var theatreScreen = new TheatreScreen(screen),
                video = new YouTubeVideo(screen.getElementsByTagName('iframe')[0]);

            video.addEventListener('stateChange', function(e) {
                switch (e.data.to) {
                    case 'buffering':
                    case 'playing':
                        theatreScreen.focus();
                        break;
                    case 'ended':
                        theatreScreen.unfocus();
                        break;
                }
            }.bind(this));

            screen.addEventListener('click', function() {
                theatreScreen.unfocus();
                video.pause();
            }.bind(this));
        });
    });
});