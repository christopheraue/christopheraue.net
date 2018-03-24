/*
 * unify handling of mouse hover and touch events
 */

define('unified-hover', [
    'core-ext/Element',
    'core-ext/HTMLCollection',
    'core-ext/TouchEvent'
], function () {
    // Set hover states right after page load
    var initHoverAt = function(x, y) {
        var html = document.getElementsByTagName('html')[0];
        var target = document.elementFromPoint(x, y);
        html.addClassTracingDescendant('hover', target);
    };

    if (document.initClientX) {
        initHoverAt(document.initClientX, document.initClientY);
    } else {
        var initHover = function(){
            initHoverAt(document.initClientX, document.initClientY);
            document.removeEventListener('mouseover', initHover, false);
        };
        document.addEventListener('mouseover', initHover, false);
    }

    // Update hover states on events
    document.getElementsByTagName('*').forEach(function(el) {
        el.addEventListener('mouseenter', function (e) {
            e.currentTarget.addClass('focused');
        }, false);

        el.addEventListener('mouseleave', function (e) {
            e.currentTarget.rmvClass('focused');
        }, false);

        el.addEventListener('touchstart', function (e) {
            e.currentTarget.addClass('focused');
        }, false);

        el.addEventListener('touchend', function (e) {
            e.currentTarget.rmvClass('focused');
        }, false);

        el.addEventListener('touchcancel', function (e) {
            e.currentTarget.rmvClass('focused');
        }, false);
    });

    document.getElementsByClassName('js-focused-follows-touchmove').forEach(function(el){
        el.addEventListener('touchstart', function(e){
            e.preventDefault();
        }, false);

        el.addEventListener('touchmove', function(e){
            e.currentTarget.addClassTracingDescendant('focused', e.touchTarget);
            e.preventDefault();
        }, false);

        el.addEventListener('touchend', function(e) {
            e.currentTarget.rmvClass('focused');
            e.currentTarget.rmvClassFromDescendants('focused');
        }, false);

        el.addEventListener('touchcancel', function(e) {
            e.currentTarget.rmvClass('focused');
            e.currentTarget.rmvClassFromDescendants('focused');
        }, false);
    });

    document.getElementsByClassName('js-click-on-touchend').forEach(function(el){
        el.addEventListener('touchend', function(e) {
            if (e.currentTarget.contains(e.touchTarget)) {
                e.touchTarget.click();
            }
        }, false);
    });
});