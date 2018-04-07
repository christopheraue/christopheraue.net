/*
 * unify handling of mouse hover and touch events
 */

define('unified-pointer-events', [
    'core-ext/Element',
    'core-ext/HTMLCollection',
    'core-ext/TouchEvent'
], function() {
    // Unify hover state of mouse and touch to *focused*
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

    // The focused state might be persisted/cached when navigating the browser
    // history (e.g. in Safari). Reset it when the page is re-shown in this way.
    window.addEventListener('pageshow', function (e) {
        if (!e.persisted) { return }
        document.getElementsByClassName('focused').forEach(function (el) {
            el.rmvClass('focused');
        });
    }, false);

    // Set focused states right after page load
    var initFocusedAt = function(x, y) {
        var el = document.elementFromPoint(x, y);
        while (el) {
            var event;
            if(typeof(Event) === 'function') {
                event = new Event('mouseenter');
            } else {
                event = document.createEvent('Event');
                event.initEvent('mouseenter', true, true);
            }

            el.dispatchEvent(event);
            el = el.parentElement;
        }
    };

    if (document.initClientX) {
        initFocusedAt(document.initClientX, document.initClientY);
    } else {
        var initHover = function(){
            initFocusedAt(document.initClientX, document.initClientY);
            document.removeEventListener('mouseover', initHover, false);
        };
        document.addEventListener('mouseover', initHover, false);
    }

    // trigger click instantly when tapping on an element
    !function() {
        var touched = false;

        document.body.addEventListener('touchstart', function(e){
            var touch = e.changedTouches[0];
            touched = {clientX: touch.clientX, clientY: touch.clientY};
        }, true);

        document.body.addEventListener('touchend', function(e){
            if (!touched) { return false; }
            var touch = e.changedTouches[0];
            var offsetX = touched.clientX - touch.clientX;
            var offsetY = touched.clientY - touch.clientY;
            var distance = Math.sqrt(offsetX*offsetX + offsetY*offsetY);

            if (distance < 10) {
                e.stopImmediatePropagation();
                e.preventDefault();
                e.target.click();
            }
            touched = false;
        }, true);

        document.body.addEventListener('touchcancel', function(){
            touched = false;
        }, true);
    }();

    // Let the *focused* state follow the touch point and without causing
    // default behavior like scrolling. (works, but currently unused)
    // document.getElementsByClassName('js-focused-follows-touchmove').forEach(function(el){
    //     el.addEventListener('touchstart', function(e){
    //         e.preventDefault();
    //     }, false);
    //
    //     el.addEventListener('touchmove', function(e){
    //         e.currentTarget.addClassTracingDescendant('focused', e.touchTarget);
    //         e.preventDefault();
    //     }, false);
    //
    //     el.addEventListener('touchend', function(e) {
    //         e.currentTarget.rmvClass('focused');
    //         e.currentTarget.rmvClassFromDescendants('focused');
    //     }, false);
    //
    //     el.addEventListener('touchcancel', function(e) {
    //         e.currentTarget.rmvClass('focused');
    //         e.currentTarget.rmvClassFromDescendants('focused');
    //     }, false);
    // });
});