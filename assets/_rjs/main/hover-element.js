/*
 * Unify handling of mouse hover and touch events.
 *
 * ATTENTION: Has some inlined code in the <head> it depends on!
 */

define([
    'lib/classList',
    'core-ext/Element',
    'core-ext/HTMLCollection',
    'core-ext/TouchEvent'
], function() {
    var HoverElement = function(el) {
        this.el = el;
        el.hoverState = this;
    };

    HoverElement.instanceFor = function(el) {
        return el.hoverState || new HoverElement(el);
    };
    
    HoverElement.prototype = {
        unifyMouseAndTouch: function() {
            if (this.isUnified) { return }

            this.el.addEventListener('mouseenter',  function(){ this.el.classList.add('hover'); }.bind(this), false);
            this.el.addEventListener('mouseleave',  function(){ this.el.classList.remove('hover'); }.bind(this), false);
            
            this.el.addEventListener('touchstart',  function(){ this.el.classList.add('hover'); }.bind(this), false);
            this.el.addEventListener('touchend',    function(){ this.el.classList.remove('hover'); }.bind(this), false);
            this.el.addEventListener('touchcancel', function(){ this.el.classList.remove('hover'); }.bind(this), false);
            
            this.isUnified = true;
        },
        
        // Let the *hover* state follow the touch point and without causing
        // default behavior like scrolling. (works, but currently unused)
        followTouch: function() {
            this.el.addEventListener('touchstart', function(e) {
                e.preventDefault();
            }.bind(this), false);

            this.el.addEventListener('touchmove', function(e) {
                this.el.addClassTracingDescendant('hover', e.touchTarget);
                e.preventDefault();
            }.bind(this), false);

            this.el.addEventListener('touchend', function() {
                this.el.classList.remove('hover');
                this.el.rmvClassFromDescendants('hover');
            }.bind(this), false);

            this.el.addEventListener('touchcancel', function() {
                this.el.classList.remove('hover');
                this.el.rmvClassFromDescendants('hover');
            }.bind(this), false);
        }
    };

    // The hover state might be persisted/cached when navigating the browser
    // history (e.g. in Safari). Reset it when the page is re-shown in this way.
    window.addEventListener('pageshow', function (e) {
        if (!e.persisted) { return }
        document.getElementsByClassName('hover').forEach(function (el) {
            el.classList.remove('hover');
        });
    }, false);
    
    return HoverElement;
});