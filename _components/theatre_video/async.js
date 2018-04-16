define([
    './js/theatre_video'
], function(TheatreVideo) {
    document.ready(function() {
        document.getElementsByClassName('js-theatre-video').forEach(function(video) {
            new TheatreVideo(video);
        });
    });
});