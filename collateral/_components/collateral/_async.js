define([
    '_components/theatre_screen/TheatreScreen',
    '_components/video/YouTubeVideo'
], function(TheatreScreen, YouTubeVideo) {
    document.ready(function() {
        if (!document.body.classList.contains('collateral')) {
            // not on collateral page
            return
        }

        var screen = document.querySelector('#theatre > .theatre-screen'),
            theatreScreen = new TheatreScreen(screen),
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