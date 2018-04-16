/*
 * Set .activated class on element based on pointer events. Is set up for an
 * element by giving it one of the js-activate-on-* classes.
 */

define([
    'core-ext/document',
    'core-ext/HTMLCollection'
], function(){
    var ActivatableElement = function(el) {
        this.el = el;
        el.activatedState = this;
    };

    ActivatableElement.instanceFor = function(el) {
        return el.activatedState || new ActivatableElement(el);
    };
    
    ActivatableElement.prototype = {
        enable: function () {
            this.el.classList.remove('js-activate-deactivated');
        },
        disable: function () {
            this.el.classList.add('js-activate-deactivated');
            this.deactivate();
        },
        isDisabled: function() {
            return this.el.classList.contains('js-activate-deactivated');
        },
        activate: function() {
            if (this.isActivated() || this.isDisabled()) {
                return;
            }

            this.el.classList.add('activated');
            this.el.style['z-index'] = '999999';

            this.deactivationArea = document.createElement('div');
            this.deactivationArea.style['position'] = 'fixed';
            this.deactivationArea.style['top'] = '0';
            this.deactivationArea.style['left'] = '0';
            this.deactivationArea.style['right'] = '0';
            this.deactivationArea.style['bottom'] = '0';
            this.deactivationArea.style['z-index'] = '999998';
            this.deactivationArea.addEventListener('click', function(){ this.deactivate(); }.bind(this), false);
            this.el.parentNode.insertBefore(this.deactivationArea, this.el);
        },
        deactivate: function() {
            if (!this.isActivated()) {
                return;
            }

            this.el.classList.remove('activated');
            this.el.parentNode.removeChild(this.deactivationArea);
            delete this.deactivationArea;
        },
        isActivated: function() {
            return this.el.classList.contains('activated');
        },
        activateOnMouseDownUp: function() {
            // active on mousedown
            this.el.addEventListener('mousedown',  function(){ this.el.classList.add('active') }.bind(this), false);
            this.el.addEventListener('mouseup',    function(){ this.el.classList.remove('active') }.bind(this), false);
            this.el.addEventListener('mouseleave', function(){ this.el.classList.remove('active') }.bind(this), false);

            // activated on mouseclick
            this.el.addEventListener('click', function(){ this.activate() }.bind(this), false);
        },
        activateOnTouchDownUp: function() {
            // active on touchstart
            this.el.addEventListener('touchstart',  function(){ this.el.classList.add('active') }.bind(this), false);
            this.el.addEventListener('touchend',    function(){ this.el.classList.remove('active') }.bind(this), false);
            this.el.addEventListener('touchcancel', function(){ this.el.classList.remove('active') }.bind(this), false);

            // activated on touchtap
            this.el.addEventListener('click', function(){ this.activate() }.bind(this), false);
        },
        activateOnMouseDown: function() {
            this.el.addEventListener('mousedown',  function(){ this.activate() }.bind(this), false);
            this.el.addEventListener('mouseleave', function(){ this.deactivate() }.bind(this), false);
            this.el.addEventListener('mouseup',    function(){ this.deactivate() }.bind(this), false);
        },
        activateOnTouchDown: function() {
            this.el.addEventListener('touchstart',  function(){ this.activate() }.bind(this), false);
            this.el.addEventListener('touchend',    function(){ this.deactivate() }.bind(this), false);
            this.el.addEventListener('touchcancel', function(){ this.deactivate() }.bind(this), false);
        },
        activateOnMouseOver: function() {
            this.el.addEventListener('mouseenter', function(){ this.activate() }.bind(this), false);
            this.el.addEventListener('mouseleave', function(){ this.deactivate() }.bind(this), false);
        }
    };

    // The activated state might be persisted/cached when navigating the browser
    // history (e.g. in Safari). Reset it when the page is re-shown in this way.
    window.addEventListener('pageshow', function (e) {
        if (!e.persisted) {
            return
        }
        document.getElementsByClassName('activated').forEach(function(el) {
            el.activatedState.deactivate();
        });
    }, false);

    return ActivatableElement;
});