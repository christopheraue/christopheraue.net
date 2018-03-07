require([
    'config',
    'svgxuse',
    '//www.google-analytics.com/analytics.js'
], function(conf, svg, ga) {
    // google analytics
    ga('create', 'UA-48107803-1', 'christopheraue.net');
    ga('send', 'pageview');

    // disqus comments
    if (document.getElementById('disqus_thread')) {
        console.log('load disqus comments');
        disqus_shortname = 'christopheraue';
        disqus_identifier = location.pathname;
        disqus_url = 'http://christopheraue.net' + location.pathname;
        require(['//' + disqus_shortname + '.disqus.com/embed.js']);
        require(['//' + disqus_shortname + '.disqus.com/count.js']);
    }

    // unify handling of mouse hover and touch events
    var debug = document.getElementById('js-debug');
    debug.idx = 0;
    debug.log = function(msg) {
        debug.innerText += this.idx++ + " " + msg + "\n";
    };

    if (window.TouchEvent) {
        Object.defineProperty(TouchEvent.prototype, 'touchTarget', {
            get: function () {
                var touch = this.changedTouches[0];
                return document.elementFromPoint(touch.clientX, touch.clientY);
            }
        });
    }

    HTMLCollection.prototype.forEach = function(f) {
        /* If f alters the affiliation of the element with the collection
         * this is immediately reflected and causes unforeseen consequences
         * during the subsequent iterations of the loop. For that reason,
         * Iterate over a static representation.
         */
        var staticElements = [];
        for (var i=0; i<this.length; i++) {
            staticElements.push(this[i]);
        }
        staticElements.forEach(f);
    };

    Element.prototype.addClass = function(cls) {
        this.classList.add(cls);
    };

    Element.prototype.rmvClass = function(cls) {
        this.classList.remove(cls);
    };

    /*
     * Find the shortest route to a descendant and update the css class of
     * elements along the way. Remove the class from all other descendants.
     * Only actually changed elements will be touched.
     */
    Element.prototype.addClassTracingDescendant = function(cls, target) {
        /* Elements having the class since the last change */
        var old = [this];
        this.getElementsByClassName(cls).forEach(function(el){
            old.push(el);
        });

        /* Elements that should have the class now */
        var now = [target];
        var el = target;
        while (el) {
            if (el === this) break;
            el = el.parentElement;
            now.push(el);
        }
        now = now.reverse();

        /*
         * old and now will be either identical if no change occurred. Or they
         * will be identical upto a certain index. Elements at a greater index
         * have to be updated.
         */
        var changedIdx = old.findIndex(function(el, idx){
            return el !== now[idx]
        });

        var i;
        if (changedIdx !== -1) {
            for (i=changedIdx; i<old.length; i++){
                old[i].rmvClass(cls);
            }

            for (i=changedIdx; i<now.length; i++){
                now[i].addClass(cls);
            }
        }
    };

    Element.prototype.rmvClassFromDescendants = function(cls) {
        this.getElementsByClassName(cls).forEach(function(el){
            el.rmvClass(cls);
        });
    };

    document.getElementsByTagName('*').forEach(function(el){
        el.addEventListener('touchstart', function(e){
            e.currentTarget.addClass('hover');
        }, false);

        el.addEventListener('touchend', function(e){
            e.currentTarget.rmvClass('hover');
        }, false);

        el.addEventListener('touchcancel', function(e){
            e.currentTarget.rmvClass('hover');
        }, false);

        el.addEventListener('mouseenter', function(e){
            e.currentTarget.addClass('hover');
        }, false);

        el.addEventListener('mouseleave', function(e){
            e.currentTarget.rmvClass('hover');
        }, false);
    });

    document.getElementsByClassName('js-hover-follow-touch').forEach(function(el){
        el.addEventListener('touchstart', function(e){
            e.preventDefault();
        }, false);

        el.addEventListener('touchmove', function(e){
            e.currentTarget.addClassTracingDescendant('hover', e.touchTarget);
            e.preventDefault();
        }, false);

        el.addEventListener('touchend', function(e) {
            e.currentTarget.rmvClass('hover');
            e.currentTarget.rmvClassFromDescendants('hover');
            if (e.currentTarget.contains(e.touchTarget)) {
                e.touchTarget.click();
            }
        }, false);

        el.addEventListener('touchcancel', function(e) {
            e.currentTarget.rmvClass('hover');
            e.currentTarget.rmvClassFromDescendants('hover');
        }, false);
    });
});