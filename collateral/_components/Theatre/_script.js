define([
    'base-TheatreScreen',
    'base-Video/YouTubeVideo'
], function(TheatreScreen, YouTubeVideo) {
    document.ready(function() {
        var screen = document.querySelector('.collateral-Theatre-Screen > .base-TheatreScreen');

        if (!screen) { return }

        var theatreScreen = new TheatreScreen(screen),
            video = new YouTubeVideo(screen.getElementsByTagName('iframe')[0]);

        video.addEventListener('stateChange', function(e) {
            switch (e.data.to) {
                case 'buffering':
                case 'playing':
                    theatreScreen.focus(1000);
                    break;
                case 'ended':
                    theatreScreen.unfocus(1000);
                    break;
            }
        }.bind(this));

        screen.addEventListener('click', function() {
            theatreScreen.unfocus(1000);
            video.pause();
        }.bind(this));
    });
});