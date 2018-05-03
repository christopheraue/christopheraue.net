define([
    './js/PageTransition',
    '_components/_global/Page',
    'home/_components/home/Homepage.js',
    'core-ext/Location'
], function(PageTransition, Page, Homepage){
    document.ready(function() {
        PageTransition.setUp({
            fadePageIn: function(transition) {
                var category = window.location.extractCategory();
                if (category === 'home') {
                    (new Homepage(category)).transitionIn(transition);
                } else {
                    (new Page(category)).transitionIn(transition);
                }
            },
            fadePageOut: function(targetCategory) {
                var category = window.location.extractCategory();
                if (category === 'home') {
                    return (new Homepage(category)).transitionOut(targetCategory);
                } else {
                    return (new Page(category)).transitionOut(targetCategory);
                }
            },
            cleanUp: function(transition) {
                var category = window.location.extractCategory();
                if (category === 'home') {
                    (new Homepage(category)).cleanUpTransition(transition);
                } else {
                    (new Page(category)).cleanUpTransition(transition);
                }
            }
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
    }, false);
});