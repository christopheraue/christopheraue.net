/*
 * Extensions for Elements
 */

define(function() {
    // Add classList to all elements (HTML, SVG, ...) in IE 11
    if (!Object.getOwnPropertyDescriptor(Element.prototype, 'classList')){
        var classListProp = HTMLElement && Object.getOwnPropertyDescriptor(HTMLElement.prototype,'classList');
        if (classListProp){
            Object.defineProperty(Element.prototype, 'classList', classListProp);
        }
    }

    Element.prototype.addClass = function(cls) {
        if (!this.hasClass(cls)) {
            this.classList.add(cls);
        }
    };

    Element.prototype.rmvClass = function(cls) {
        if (this.hasClass(cls)) {
            this.classList.remove(cls);
        }
    };

    Element.prototype.hasClass = function(cls) {
        return this.classList.contains(cls);
    };

    /*
     * Find the shortest route to a descendant and update the css class of
     * elements along the way. Remove the class from all other descendants.
     * Only actually changed elements will be touched.
     */
    Element.prototype.addClassTracingDescendant = function(cls, target) {
        /* Elements having the class since the last change */
        var old = [this];
        this.getElementsByClassName(cls).forEach(function(el){
            old.push(el);
        });

        /* Elements that should have the class now */
        var now = [target];
        var el = target;
        while (el) {
            if (el === this) break;
            el = el.parentElement;
            now.push(el);
        }
        now = now.reverse();

        /*
         * old and now will be either identical if no change occurred. Or they
         * will be identical upto a certain index. Elements at a greater index
         * have to be updated.
         */
        var changedIdx = now.findIndex(function(el, idx){
            return el !== old[idx]
        });

        var i;
        if (changedIdx !== -1) {
            for (i=changedIdx; i<old.length; i++){
                old[i].rmvClass(cls);
            }

            for (i=changedIdx; i<now.length; i++){
                now[i].addClass(cls);
            }
        }
    };

    Element.prototype.rmvClassFromDescendants = function(cls) {
        this.getElementsByClassName(cls).forEach(function(el){
            el.rmvClass(cls);
        });
    };
});