/*
 * Unify handling of mouse hover and touch events.
 */

define([
    './HoverElement/classHelper',
    'core-ext/TouchEvent'
], function(classHelper) {
    var HoverElement = Object.inherit({
        constructor: function(el) {
            this.el = el;
            el.hoverState = this;
        },
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
                classHelper.addClassTracingDescendant(this.el, 'hover', e.touchTarget);
                e.preventDefault();
            }.bind(this), false);

            this.el.addEventListener('touchend', function() {
                this.el.classList.remove('hover');
                classHelper.rmvClassFromDescendants(this.el, 'hover');
            }.bind(this), false);

            this.el.addEventListener('touchcancel', function() {
                this.el.classList.remove('hover');
                classHelper.rmvClassFromDescendants(this.el, 'hover');
            }.bind(this), false);
        }
    });

    HoverElement.instanceFor = function(el) {
        return el.hoverState || new HoverElement(el);
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