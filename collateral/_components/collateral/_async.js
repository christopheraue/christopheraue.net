define([
    'TheatreScreen',
    'Video/YouTubeVideo'
], function(TheatreScreen, YouTubeVideo) {
    document.ready(function() {
        if (!document.body.classList.contains('collateral')) {
            // not on collateral page
            return
        }

        var screen = document.querySelector('#theatre > .TheatreScreen'),
            theatreScreen = new TheatreScreen(screen),
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