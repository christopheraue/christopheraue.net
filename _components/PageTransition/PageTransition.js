define([
    'core-ext/HTMLAnchorElement',
    'core-ext/Location'
], function() {
    return new (Object.inherit({
        constructor: function() {
            this.transitions = [];
        },
        setActive: function(transition) {
            window.sessionStorage.setItem('pageTransition', JSON.stringify(transition));

            // The faded in page transition on unload might be persisted/cached
            // and interferes when navigating the browser history. (e.g. in Safari)
            var listener = function(e) {
                if (!e.persisted) { return }
                this.transitions.forEach(function(block) {
                    block.cleanUpTransition(transition);
                });
                window.removeEventListener('pageshow', listener, false);
            }.bind(this);
            window.addEventListener('pageshow', listener, false);

            return this;
        },
        getActive: function() {
            var transitionJSON = window.sessionStorage.getItem('pageTransition');
            return (transitionJSON ? JSON.parse(transitionJSON) : null);
        },
        deleteActive: function() {
            var pageTransition = this.getActive();
            window.sessionStorage.removeItem('pageTransition');
            return pageTransition;
        },
        register: function(block) {
            this.transitions.push(block);
        },
        initialize: function() {
            // Immediately start the fade-in transition
            var transition = this.deleteActive();
            if (transition) {
                this.transitions.forEach(function(block) {
                    block.transitionIn(transition);
                });
            }

            // Hook into all links to control the fade-out transition
            document.getElementsByTagName('a').forEach(function(anchor) {
                if (anchor.leavesWebsite() || anchor.jumpsWithinPage()) {
                    return;
                }

                anchor.addEventListener('click', function(e) {
                    var transition = {
                        from: window.location.extractCategory(),
                        to: anchor.extractCategory()
                    };

                    var transitioning = [].concat(this.transitions),
                        onTransitioned = function(block) {
                            transitioning.splice(transitioning.indexOf(block), 1);
                            if (transitioning.length > 0) { return }
                            window.location = anchor.href; // follow link after all transitions
                                                           // transitioned
                        }.bind(this);

                    this.transitions.forEach(function(block) {
                        block.transitionOut(transition, onTransitioned);
                    });

                    this.setActive(transition);
                    e.preventDefault(); // delay location change until all transitions transitioned
                }.bind(this));
            }.bind(this));

            //reduce white flicker during page transition in IE
            window.addEventListener('beforeunload', function(){});
        }
    }))();
});