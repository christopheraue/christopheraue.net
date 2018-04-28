define([
    './js/PageTransition',
    'lib/velocity',
    'core-ext/body',
    'core-ext/HTMLAnchorElement',
    'core-ext/HTMLCollection',
    'core-ext/Location'
], function(PageTransition, Velocity){
    document.ready(function() {
        PageTransition.setUp({
            fadePageIn: function() {
                // transition dependent CSS classes already set in _sync.js
                var fader = document.getElementById('transition-fader');
                Velocity(fader, {opacity: [0, 1]}, 300, 'ease-in-out', function(){
                    PageTransition.state.dispatchEvent('cleanUp', this);
                })
            },
            fadePageOut: function(anchor) {
                var header = document.querySelector('body > header'),
                    currentCategory = window.location.extractCategory(),
                    targetCategory = anchor.extractCategory(),
                    fadeHeader;

                if (currentCategory === 'home') {
                    fadeHeader = true;
                } else if (header.inView() && targetCategory !== 'home') {
                    document.body.smoothScrollIntoView('top', '300ms ease-in-out');
                    fadeHeader = false;
                } else {
                    fadeHeader = true;
                }

                var transition = new PageTransition(targetCategory, fadeHeader);

                if (transition.category === 'home') {
                    document.body.hideScrollbar();
                }
                document.body.classList.add(transition.category + '-transition');
                transition.fadeHeader && document.body.classList.add('header-fade-transition');

                // Fade page
                var fader = document.getElementById('transition-fader');
                Velocity(fader, {opacity: [1, 0]}, 300, 'ease-in-out', function(){
                    PageTransition.state.dispatchEvent('transitioned', this);
                });

                // Slide header navigation to selected item
                var designToCollateral = currentCategory === 'design' && transition.category === 'collateral',
                    collateralToDesign = currentCategory === 'collateral' && transition.category === 'design';
                if (designToCollateral || collateralToDesign) {
                    var headerNavUl = document.querySelector('body > header nav ul'),
                        headerNavHeight = headerNavUl.children[0].offsetHeight;
                    Velocity(headerNavUl, {translateY: -headerNavHeight + 'px'}, 300, 'ease-in-out')
                }

                return transition;
            },
            cleanUp: function() {
                document.body.showScrollbar();
                document.body.className.split(' ').forEach(function (cls) {
                    if (cls.indexOf('-transition') === -1) { return }
                    document.body.classList.remove(cls);
                });
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