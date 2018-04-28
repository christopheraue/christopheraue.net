define([
    '_components/_global/EventTarget',
    'core-ext/HTMLAnchorElement',
    'core-ext/HTMLCollection'
], function(EventTarget) {
    var PageTransition = Object.inherit({
        constructor: function (category, fadeHeader) {
            this.category = category;
            this.fadeHeader = fadeHeader;
        },
        setActive: function () {
            window.sessionStorage.setItem('pageTransitionCategory', this.category);
            window.sessionStorage.setItem('pageTransitionFadeHeader', this.fadeHeader.toString());

            // The faded in page transition on unload might be persisted/cached
            // and interferes when navigating the browser history. (e.g. in Safari)
            var listener = function (e) {
                if (!e.persisted) { return }
                this.constructor.state.dispatchEvent('cleanUp', this);
                window.removeEventListener('pageshow', listener, false);
            }.bind(this);
            window.addEventListener('pageshow', listener, false);

            return this;
        }
    });

    PageTransition.getActive = function() {
        var category = window.sessionStorage.getItem('pageTransitionCategory'),
            fadeHeader = eval(window.sessionStorage.getItem('pageTransitionFadeHeader'));
        return (category ? new PageTransition(category, fadeHeader) : null);
    };

    PageTransition.deleteActive = function() {
        var pageTransition = this.getActive();
        window.sessionStorage.removeItem('pageTransitionCategory');
        window.sessionStorage.removeItem('pageTransitionFadeHeader');
        return pageTransition;
    };

    PageTransition.state = new EventTarget();

    PageTransition.setUp = function(options) {
        var transition = PageTransition.deleteActive();
        if (transition) {
            options.fadePageIn();
        }

        // Hook into all links to control the start of the transition
        document.getElementsByTagName('a').forEach(function(anchor) {
            if (anchor.leavesWebsite() || anchor.jumpsWithinPage()) {
                return;
            }

            anchor.addEventListener('click', function(){ options.fadePageOut(anchor).setActive() });
            anchor.delayLocationChangeUntil(PageTransition.state, 'transitioned');
        });

        PageTransition.state.addEventListener('cleanUp', function() {
            options.cleanUp();
        });

        //reduce white flicker during page transition in IE
        window.addEventListener('beforeunload', function(){});
    };

    return PageTransition;
});