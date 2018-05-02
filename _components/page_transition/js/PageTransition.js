define([
    '_components/_global/EventTarget',
    'core-ext/HTMLAnchorElement'
], function(EventTarget) {
    return new (EventTarget.inherit({
        constructor: function() {
            EventTarget.call(this)
        },
        setActive: function (transition) {
            window.sessionStorage.setItem('pageTransition', JSON.stringify(transition));

            // The faded in page transition on unload might be persisted/cached
            // and interferes when navigating the browser history. (e.g. in Safari)
            var listener = function (e) {
                if (!e.persisted) {
                    return
                }
                this.cleanUp(transition);
                window.removeEventListener('pageshow', listener, false);
            }.bind(this);
            window.addEventListener('pageshow', listener, false);

            return this;
        },
        getActive: function () {
            var transitionJSON = window.sessionStorage.getItem('pageTransition');
            return (transitionJSON ? JSON.parse(transitionJSON) : null);
        },
        deleteActive: function () {
            var pageTransition = this.getActive();
            window.sessionStorage.removeItem('pageTransition');
            return pageTransition;
        },
        setUp: function (options) {
            // Immediately start the fade-in transition
            var transition = this.deleteActive();
            if (transition) {
                options.fadePageIn(transition);
            }

            // Hook into all links to control the fade-out transition
            document.getElementsByTagName('a').forEach(function (anchor) {
                if (anchor.leavesWebsite() || anchor.jumpsWithinPage()) {
                    return;
                }

                anchor.addEventListener('click', function () {
                    var transition = options.fadePageOut(anchor);
                    this.setActive(transition);
                }.bind(this));
                anchor.delayLocationChangeUntil(this, 'transitioned');
            }.bind(this));

            // Attach a function to clean up the side effects of a transition
            this.cleanUp = options.cleanUp;

            //reduce white flicker during page transition in IE
            window.addEventListener('beforeunload', function(){});
        }
    }))();
});