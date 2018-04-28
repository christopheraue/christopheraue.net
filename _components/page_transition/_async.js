define([
    './js/PageTransition',
    'lib/velocity',
    'core-ext/body',
    'core-ext/HTMLAnchorElement',
    'core-ext/HTMLCollection',
    'core-ext/Location'
], function(PageTransition, Velocity){
    var fadePageIn = function(transition, fader) {
            Velocity(fader, {opacity: [0, 1]}, 300, 'ease-in-out', function(){
                PageTransition.events.dispatchEvent('cleanUp', this);
            })
        },
        fadePageOut = function(transition, fader) {
            if (transition.category === 'home') {
                document.body.hideScrollbar();
            }
            document.body.classList.add(transition.category + '-transition');
            transition.fadeHeader && document.body.classList.add('header-fade-transition');

            Velocity(fader, {opacity: [1, 0]}, 300, 'ease-in-out', function(){
                fader.dispatchEvent(new Event('fadedOut'))
            });

            // Slide header navigation to selected item
            var currentCategory = window.location.extractCategory(),
                designToCollateral = currentCategory === 'design' && transition.category === 'collateral',
                collateralToDesign = currentCategory === 'collateral' && transition.category === 'design';
            if (designToCollateral || collateralToDesign) {
                var headerNavUl = document.querySelector('body > header nav ul'),
                    headerNavHeight = headerNavUl.children[0].offsetHeight;
                Velocity(headerNavUl, {translateY: -headerNavHeight + 'px'}, 300, 'ease-in-out')
            }
        };

    PageTransition.events.addEventListener('cleanUp', function() {
        document.body.showScrollbar();
        document.body.className.split(' ').forEach(function (cls) {
            if (cls.indexOf('-transition') === -1) { return }
            document.body.classList.remove(cls);
        });
    });

    document.ready(function() {
        var transition = PageTransition.deleteActive(),
            fader = document.getElementById('transition-fader');

        if (transition) {
            fadePageIn(transition, fader);
        }

        // Hook into all links to control the start of the transition
        document.getElementsByTagName('a').forEach(function(anchor) {
            var targetCategory = anchor.extractCategory();

            if (!targetCategory || anchor.jumpsWithinPage()) {
                // don't transition for links to another website and within the same page
                return;
            }

            anchor.addEventListener('click', function() {
                var header = document.querySelector('body > header'),
                    currentCategory = window.location.extractCategory(),
                    fadeHeader;

                if (currentCategory === 'home') {
                    fadeHeader = true;
                } else if (header.inView() && targetCategory !== 'home') {
                    document.body.smoothScrollIntoView('top', '300ms ease-in-out');
                    fadeHeader = false;
                } else {
                    fadeHeader = true;
                }

                transition = new PageTransition(targetCategory, fadeHeader);
                transition.setActive();
                fadePageOut(transition, fader);
            }, false);

            anchor.delayLocationChangeUntil(fader, 'fadedOut');
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