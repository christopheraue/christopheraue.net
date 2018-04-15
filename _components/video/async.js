define([
    './js/video',
    'core-ext/document'
], function(Video) {
    document.ready(function () {
        document.getElementsByClassName('video').forEach(function (el) {
            var video = new Video(el);

            if (el.classList.contains('minimal-controls')) {
                video.addMinimalControls();
            }
        });
    })
});