/*
 * unify handling of mouse hover and touch events
 */

define('unified-hover', [
    'core-ext/Element',
    'core-ext/HTMLCollection',
    'core-ext/TouchEvent'
], function () {
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