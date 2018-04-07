/*
 * unify handling of mouse hover and touch events
 */

define('pointer-activated-state', [
    'core-ext/Element',
    'core-ext/HTMLCollection'
], function(){
    // Activation on Pointer DownUp (a.k.a *click* for mice)
    var createDeactivationArea = function(e) {
        var el = e.currentTarget;

        if (el.hasClass('activated')) {
            return;
        }

        el.addClass('activated');

        var deactivationArea = document.createElement('div');
        deactivationArea.style['position'] = 'fixed';
        deactivationArea.style['top'] = '0';
        deactivationArea.style['left'] = '0';
        deactivationArea.style['right'] = '0';
        deactivationArea.style['bottom'] = '0';
        deactivationArea.style['z-index'] = '999998';
        el.style['z-index'] = '999999';
        deactivationArea.addEventListener('click', function(){
            el.parentNode.removeChild(deactivationArea);
            el.rmvClass('activated');
        }, false);
        el.parentNode.insertBefore(deactivationArea, el);
    };

    document.getElementsByClassName('js-activate-on-mousedownup').forEach(function(el){
        // active on mousedown
        el.addEventListener('mousedown',  function(){ el.addClass('active') }, false);
        el.addEventListener('mouseup',    function(){ el.rmvClass('active') }, false);
        el.addEventListener('mouseleave', function(){ el.rmvClass('active') }, false);

        // activated on mouseclick
        el.addEventListener('click', createDeactivationArea, false);
    });

    document.getElementsByClassName('js-activate-on-touchdownup').forEach(function(el){
        // active on touchstart
        el.addEventListener('touchstart',  function(){ el.addClass('active') }, false);
        el.addEventListener('touchend',    function(){ el.rmvClass('active') }, false);
        el.addEventListener('touchcancel', function(){ el.rmvClass('active') }, false);

        // activated on touchtap
        el.addEventListener('click', createDeactivationArea, false);
    });

    // Activation on Pointer Down
    document.getElementsByClassName('js-activate-on-mousedown').forEach(function(el){
        // activated on mousedown
        el.addEventListener('mousedown',  function(){ el.addClass('activated') }, false);
        el.addEventListener('mouseleave', function(){ el.rmvClass('activated') }, false);
        el.addEventListener('mouseup',    function(){ el.rmvClass('activated') }, false);
    });

    document.getElementsByClassName('js-activate-on-touchdown').forEach(function(el){
        // activated on touchstart
        el.addEventListener('touchstart',  function(){ el.addClass('activated') }, false);
        el.addEventListener('touchend',    function(){ el.rmvClass('activated') }, false);
        el.addEventListener('touchcancel', function(){ el.rmvClass('activated') }, false);
    });

    // Activation on Pointer Over
    document.getElementsByClassName('js-activate-on-mouseover').forEach(function(el){
        // activated on mouseover
        el.addEventListener('mouseenter', function(){ el.addClass('activated') }, false);
        el.addEventListener('mouseleave', function(){ el.rmvClass('activated') }, false);
    });
    // touch over (finger hovering over the display) does not exist

    // The activated state might be persisted/cached when navigating the browser
    // history (e.g. in Safari). Reset it when the page is re-shown in this way.
    window.addEventListener('pageshow', function (e) {
        if (!e.persisted) { return }
        document.getElementsByClassName('activated').forEach(function (el) {
            el.rmvClass('activated');
        });
    }, false);
});