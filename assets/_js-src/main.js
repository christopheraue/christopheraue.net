require([
    'instant-tap-click-area',
    'hover-element',
    'activatable-element',
    'theatre-video',
    'core-ext/document',
    'config',
    'lib/svgxuse'
], function(InstantTapClickArea, HoverElement, ActivatableElement, TheatreVideo) {
    document.ready(function() {
        new InstantTapClickArea(document.body);
    });

    document.ready(function() {
        document.getElementsByTagName('*').forEach(function(el) {
            HoverElement.instanceFor(el).unifyMouseAndTouch();
        });
        HoverElement.setAfterPageLoad();
    });

    document.ready(function() {
        document.getElementsByClassName('js-activate-on-mousedownup').forEach(function (el) {
            ActivatableElement.instanceFor(el).activateOnMouseDownUp();
        });

        document.getElementsByClassName('js-activate-on-touchdownup').forEach(function (el) {
            ActivatableElement.instanceFor(el).activateOnTouchDownUp();
        });

        document.getElementsByClassName('js-activate-on-mousedown').forEach(function (el) {
            ActivatableElement.instanceFor(el).activateOnMouseDown();
        });

        document.getElementsByClassName('js-activate-on-touchdown').forEach(function (el) {
            ActivatableElement.instanceFor(el).activateOnTouchDown();
        });

        document.getElementsByClassName('js-activate-on-mouseover').forEach(function (el) {
            ActivatableElement.instanceFor(el).activateOnMouseOver();
        });

        // touch over (finger hovering over the display) does not exist
    });

    document.ready(function() {
        document.getElementsByClassName('js-theatre-video').forEach(function(video) {
            new TheatreVideo(video);
        });
    });

    document.ready(function() {
        if (document.getElementById('disqus_thread')) {
            disqus_shortname = 'christopheraue';
            disqus_identifier = location.pathname;
            disqus_url = 'http://christopheraue.net' + location.pathname;
            require(['//' + disqus_shortname + '.disqus.com/embed.js']);
            require(['//' + disqus_shortname + '.disqus.com/count.js']);
        }
    });

    require(['google-analytics'], function(ga){
        ga('create', 'UA-48107803-1', 'christopheraue.net');
        ga('send', 'pageview');
    });
});