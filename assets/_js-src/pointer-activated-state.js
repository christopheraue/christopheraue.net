/*
 * unify handling of mouse hover and touch events
 */

define('pointer-activated-state', [
    'core-ext/Element',
    'core-ext/HTMLCollection',
    'core-ext/Object'
], function(){
    var activationMethods = {
        activate: function() {
            if (this.isActivated()) {
                return;
            }

            this.addClass('activated');
            this.style['z-index'] = '999999';

            this.deactivationArea = document.createElement('div');
            this.deactivationArea.style['position'] = 'fixed';
            this.deactivationArea.style['top'] = '0';
            this.deactivationArea.style['left'] = '0';
            this.deactivationArea.style['right'] = '0';
            this.deactivationArea.style['bottom'] = '0';
            this.deactivationArea.style['z-index'] = '999998';
            this.deactivationArea.addEventListener('click', function(){ this.deactivate(); }.bind(this), false);
            this.parentNode.insertBefore(this.deactivationArea, this);
        },
        deactivate: function() {
            if (!this.isActivated()) {
                return;
            }

            this.rmvClass('activated');
            this.parentNode.removeChild(this.deactivationArea);
            delete this.deactivationArea;
        },
        isActivated: function() {
            return this.hasClass('activated');
        }
    };

    document.getElementsByClassName('js-activate-on-mousedownup').forEach(function(el){
        el.merge(activationMethods);

        // active on mousedown
        el.addEventListener('mousedown',  function(){ el.addClass('active') }, false);
        el.addEventListener('mouseup',    function(){ el.rmvClass('active') }, false);
        el.addEventListener('mouseleave', function(){ el.rmvClass('active') }, false);

        // activated on mouseclick
        el.addEventListener('click', function(){ el.activate() }, false);
    });

    document.getElementsByClassName('js-activate-on-touchdownup').forEach(function(el){
        el.merge(activationMethods);

        // active on touchstart
        el.addEventListener('touchstart',  function(){ el.addClass('active') }, false);
        el.addEventListener('touchend',    function(){ el.rmvClass('active') }, false);
        el.addEventListener('touchcancel', function(){ el.rmvClass('active') }, false);

        // activated on touchtap
        el.addEventListener('click', function(){ el.activate() }, false);
    });

    // Activation on Pointer Down
    document.getElementsByClassName('js-activate-on-mousedown').forEach(function(el){
        el.merge(activationMethods);

        // activated on mousedown
        el.addEventListener('mousedown',  function(){ el.activate() }, false);
        el.addEventListener('mouseleave', function(){ el.deactivate() }, false);
        el.addEventListener('mouseup',    function(){ el.deactivate() }, false);
    });

    document.getElementsByClassName('js-activate-on-touchdown').forEach(function(el){
        el.merge(activationMethods);

        // activated on touchstart
        el.addEventListener('touchstart',  function(){ el.activate() }, false);
        el.addEventListener('touchend',    function(){ el.deactivate() }, false);
        el.addEventListener('touchcancel', function(){ el.deactivate() }, false);
    });

    // Activation on Pointer Over
    document.getElementsByClassName('js-activate-on-mouseover').forEach(function(el){
        el.merge(activationMethods);

        // activated on mouseover
        el.addEventListener('mouseenter', function(){ el.activate() }, false);
        el.addEventListener('mouseleave', function(){ el.deactivate() }, false);
    });
    // touch over (finger hovering over the display) does not exist

    // The activated state might be persisted/cached when navigating the browser
    // history (e.g. in Safari). Reset it when the page is re-shown in this way.
    window.addEventListener('pageshow', function (e) {
        if (!e.persisted) { return }
        document.getElementsByClassName('activated').forEach(function (el) {
            el.deactivate();
        });
    }, false);
});