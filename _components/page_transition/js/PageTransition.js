define([
    '_components/_global/EventTarget'
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
                if (!e.persisted) {
                    return
                }
                this.remove();
                window.removeEventListener('pageshow', listener, false);
            }.bind(this);
            window.addEventListener('pageshow', listener, false);

            return this;
        },
        fadePageIn: function () {
            this.constructor.events.dispatchEvent('prepareFadeIn', this);
            document.body.classList.add('transition-in');
            return this;
        },
        fadePageOut: function () {
            this.constructor.events.dispatchEvent('prepareFadeOut', this);
            document.body.classList.add('transition-out');
            return this;
        },
        remove: function () {
            this.constructor.events.dispatchEvent('cleanUp', this);
            document.body.classList.remove('transition-in', 'transition-out');
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

    PageTransition.events = new EventTarget();

    return PageTransition;
});