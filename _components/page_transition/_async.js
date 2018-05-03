define([
    './js/PageTransition',
    'lib/velocity',
    'core-ext/body',
    'core-ext/Location'
], function(PageTransition, Velocity){
    document.ready(function() {
        PageTransition.setUp({
            fadePageIn: function(transition) {
                // transition dependent CSS classes already set in _sync.js
                var fader = document.getElementById('transition-fader');
                Velocity(fader, {opacity: [0, 1]}, 300, 'ease-in-out', function(){
                    PageTransition.cleanUp(transition);
                })
            },
            fadePageOut: function(targetCategory) {
                var header = document.querySelector('body > header'),
                    currentCategory = window.location.extractCategory(),
                    transition = {category: targetCategory, fadeHeader: true};

                if (header && header.inView() && transition.category !== 'home') {
                    document.body.smoothScrollIntoView('top', '300ms ease-in-out');
                    transition.fadeHeader = false;
                }

                if (transition.category === 'home') {
                    document.body.hideScrollbar();
                }

                // Fade page
                document.body.classList.add(transition.category + '-transition');
                var fader = document.getElementById('transition-fader');
                Velocity(fader, {opacity: [1, 0]}, 300, 'ease-in-out', function(){
                    PageTransition.dispatchEvent('transitioned', transition);
                });

                // Transition header
                if (transition.fadeHeader) {
                    document.body.classList.add('header-fade-transition');
                } else if (currentCategory !== transition.category) {
                    // Slide header navigation to selected item
                    var headerNavUl = document.querySelector('body > header nav ul'),
                        headerNavHeight = headerNavUl.children[0].offsetHeight;
                    Velocity(headerNavUl, {translateY: -headerNavHeight + 'px'}, 300, 'ease-in-out')
                }

                return transition;
            },
            cleanUp: function(transition) {
                document.body.showScrollbar();
                document.body.classList.remove(transition.category + '-transition');
                transition.fadeHeader && document.body.classList.remove('header-fade-transition');
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