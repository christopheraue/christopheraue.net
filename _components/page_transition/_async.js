define([
    './js/PageTransition',
    'core-ext/body',
    'core-ext/HTMLAnchorElement',
    'core-ext/HTMLCollection',
    'core-ext/Location'
], function(PageTransition){
    // Disable page transitions for browsers not supporting CSS animations
    if (!window.AnimationEvent) { return; }

    document.ready(function() {
        var transition = PageTransition.deleteActive();
        if (transition) {
            transition.fadePageIn();
        }

        // Hook into all links to control the start of the transition
        var header = document.querySelector('body > header'),
            fader = document.getElementById('transition-fader'),
            currentCategory = window.location.extractCategory();

        document.getElementsByTagName('a').forEach(function(anchor) {
            var targetCategory = anchor.extractCategory();

            if (!targetCategory || anchor.jumpsWithinPage()) {
                // don't transition for links to another website and within the same page
                return;
            }

            anchor.addEventListener('click', function() {
                var fadeHeader;

                if (currentCategory === 'home') {
                    fadeHeader = true;
                } else if (header.inView() && targetCategory !== 'home') {
                    document.body.smoothScrollIntoView('top', '300ms ease-in-out');
                    fadeHeader = false;
                } else {
                    fadeHeader = true;
                }

                new PageTransition(targetCategory, fadeHeader).setActive().fadePageOut();
            }, false);

            anchor.delayLocationChangeUntil(fader, 'animationend');
        });


        // Deactivate the header navigation for its transition
        var topnav = document.querySelector('body > header nav');
        if (topnav) {
            topnav.getElementsByTagName('a').forEach(function(anchor) {
                anchor.addEventListener('click', function() {
                    topnav.activatedState.disable();
                }, false);
            });

            window.addEventListener('pageshow', function(e) {
                if (!e.persisted) { return }
                topnav.activatedState.enable();
            }, false);
        }

        //reduce white flicker during page transition in IE
        window.addEventListener('beforeunload', function(){});
    }, false);
});