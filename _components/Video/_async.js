define([
    './HTMLVideo'
], function(HTMLVideo) {
    document.ready(function () {
        document.getElementsByClassName('Video').forEach(function (el) {
            var video = new HTMLVideo(el);

            if (el.classList.contains('minimal-controls')) {
                video.addMinimalControls();
            }
        });
    })
});