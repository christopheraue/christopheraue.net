define([
    './js/PageTransition',
    '_components/_global/Page',
    'home/_components/home/Homepage.js',
    'core-ext/Location'
], function(PageTransition, Page, Homepage){
    document.ready(function() {
        var category = window.location.extractCategory(),
            pageClass = (category === 'home') ? Homepage : Page,
            page = new pageClass(category);

        PageTransition.setUpFor(page);

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