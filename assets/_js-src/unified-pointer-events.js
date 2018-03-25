/*
 * unify handling of mouse hover and touch events
 */

define('unified-pointer-events', [
    'core-ext/Element',
    'core-ext/HTMLCollection',
    'core-ext/TouchEvent'
], function () {
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

    // Set focused states right after page load
    var initFocusedAt = function(x, y) {
        var el = document.elementFromPoint(x, y);
        while (el) {
            el.dispatchEvent(new Event('mouseenter'));
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
    document.getElementsByTagName('*').forEach(function(el) {
        var touched = false;

        var wasTap = function(touchend) {
            if (!touched) { return false; }
            var touch = touchend.changedTouches[0];
            var offsetX = touched.clientX - touch.clientX;
            var offsetY = touched.clientY - touch.clientY;
            var distance = Math.sqrt(offsetX*offsetX + offsetY*offsetY);
            return distance < 10
        };

        el.addEventListener('touchstart', function (e){
            var touch = e.changedTouches[0];
            touched = {clientX: touch.clientX, clientY: touch.clientY};
        }, false);

        el.addEventListener('touchend', function (e){
            if (wasTap(e)) {
                el.click();

                var preventDelayedClick = function(e){
                    el.removeEventListener('click', preventDelayedClick);
                    e.preventDefault();
                };
                el.addEventListener('click', preventDelayedClick, false);
            }
            touched = false;
        }, false);

        el.addEventListener('touchcancel', function (e){
            touched = false;
        }, false);
    });

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