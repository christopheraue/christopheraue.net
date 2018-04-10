require([
    'main/instant-tap-click-area',
    'main/hover-element',
    'main/activatable-element',
    'main/theatre-video',
    'main/mouse-control',

    'config',

    /* core extensions */
    'core-ext/body',
    'core-ext/document',
    'core-ext/Element',
    'core-ext/HTMLAnchorElement',
    'core-ext/HTMLCollection',
    'core-ext/Location',
    'core-ext/Object',
    'core-ext/TouchEvent',

    /* libraries */
    'lib/classList'
], function(InstantTapClickArea, HoverElement, ActivatableElement, TheatreVideo, mouseControl) {
    if(typeof(Event) === 'function') {
        document.dispatchEvent(new Event('APIsAvailable'));
    } else {
        var apiEvent = document.createEvent('Event');
        apiEvent.initEvent('APIsAvailable', true, true);
        document.dispatchEvent(apiEvent);
    }


    document.ready(function() {
        new InstantTapClickArea(document.body);
    });

    document.ready(function() {
        document.getElementsByTagName('*').forEach(function(el) {
            HoverElement.instanceFor(el).unifyMouseAndTouch();
        });
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
        mouseControl.triggerMouseEnterAfterPageLoad();
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