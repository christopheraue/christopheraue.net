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
    var hoveredElements = {
        _elements: [],
        add: function(el) {
            el.classList.add('hover');
            this._elements.push(el);
        },
        clear: function() {
            this._elements.forEach(function(el) {
                el.classList.remove('hover');
            });
            this._elements = [];
        }
    };

    var eventTarget = function(e){
        if (e.type.substr(0,5) === 'touch') {
            var touch = e.changedTouches[0];
            return document.elementFromPoint(touch.clientX, touch.clientY);
        } else {
            return e.target;
        }
    };

    var targetsFrom = function(e){
        var targets = [],
            target = eventTarget(e);

        do {
            target.classList.add('hover');
            hoveredElements._elements.push(target);
            target = target.parentElement;
        } while (target);

        return targets;
    };

    var updateHover = function(e){
        hoveredElements.clear();
        targetsFrom(e).forEach(function(el){ hoveredElements.add(el); });
        e.preventDefault();
    };

    var endHover = function(e){
        hoveredElements.clear();
        e.preventDefault();
    };

    var body = document.getElementsByTagName('body')[0];
    body.addEventListener('touchstart', updateHover, false);
    body.addEventListener('touchmove', updateHover, false);
    body.addEventListener('touchend', endHover, false);
    body.addEventListener('touchcancel', endHover, false);
    body.addEventListener('mouseenter', updateHover, false);
    body.addEventListener('mousemove', updateHover, false);
    body.addEventListener('mouseleave', endHover, false);
});