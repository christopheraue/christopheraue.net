define([
    'core-ext/body'
], function() {
    var PageTransition = function (category, fadeHeader) {
        this.category = category;
        this.fadeHeader = fadeHeader;
    };

    PageTransition.deleteActive = function () {
        var category = window.sessionStorage.getItem('pageTransitionCategory'),
            fadeHeader = eval(window.sessionStorage.getItem('pageTransitionFadeHeader'));
        window.sessionStorage.removeItem('pageTransitionCategory');
        window.sessionStorage.removeItem('pageTransitionFadeHeader');
        return (category ? new PageTransition(category, fadeHeader) : null);
    };

    PageTransition.prototype = {
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
            document.body.classList.add(this.category + '-transition', 'transition-in');
            if (this.fadeHeader) {
                document.body.classList.add('header-fade-transition');
            }

            var fader = document.getElementById('transition-fader');
            var listener = function () {
                this.remove();
                fader.removeEventListener('animationend', listener, false);
            }.bind(this);
            fader.addEventListener('animationend', listener, false);

            return this;
        },
        fadePageOut: function () {
            if (this.category === 'home') {
                document.body.hideScrollbar();
            }
            document.body.classList.add(this.category + '-transition', 'transition-out');
            if (this.fadeHeader) {
                document.body.classList.add('header-fade-transition');
            }
            return this;
        },
        remove: function () {
            document.body.showScrollbar();
            document.body.className.split(' ').forEach(function (cls) {
                if (cls.indexOf('transition') === -1) {
                    return
                }
                document.body.classList.remove(cls);
            });
            return this;
        }
    };

    return PageTransition;
});