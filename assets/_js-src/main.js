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
        var staticElements = [];
        for (var i=0; i<this.length; i++) {
            staticElements.push(this[i]);
        }
        staticElements.forEach(f);
    };

    Node.prototype.forEachAncestor = function(f, opts) {
        opts = opts === undefined ? {} : opts;
        var upto = (opts.upto === undefined) ? null : opts.upto;
        var includeSelf = (opts.includeSelf === undefined) ? false : opts.includeSelf;
        var el = this;

        if (includeSelf) {
            f(el);
        }

        while(el) {
            if (el === upto) break;
            el = el.parentElement;
            f(el);
        }
    };

    Node.prototype.addClass = function(cls) {
        this.classList.add(cls);
    };

    Node.prototype.rmvClass = function(cls) {
        this.classList.remove(cls);
    };

    Node.prototype.addClassToAncestors = function(cls, opts) {
        this.forEachAncestor(function(el){
            el.addClass(cls);
        }, opts);
    };

    Node.prototype.rmvClassFromDescendents = function(cls) {
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
            e.currentTarget.rmvClassFromDescendents('hover');
            if (e.currentTarget.contains(e.touchTarget)) {
                e.touchTarget.addClassToAncestors('hover', {upto: e.currentTarget, includeSelf: true});
            }
            e.preventDefault();
        }, false);

        el.addEventListener('touchend', function(e) {
            e.currentTarget.rmvClass('hover');
            e.currentTarget.rmvClassFromDescendents('hover');
            if (e.currentTarget.contains(e.touchTarget)) {
                e.touchTarget.click();
            }
        }, false);

        el.addEventListener('touchcancel', function(e) {
            e.currentTarget.rmvClass('hover');
            e.currentTarget.rmvClassFromDescendents('hover');
        }, false);
    });
});