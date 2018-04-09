/*
 * Extensions for Elements
 */

define(function() {
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
                old[i].classList.remove(cls);
            }

            for (i=changedIdx; i<now.length; i++){
                now[i].classList.add(cls);
            }
        }
    };

    Element.prototype.rmvClassFromDescendants = function(cls) {
        this.getElementsByClassName(cls).forEach(function(el){
            el.classList.remove(cls);
        });
    };

    Element.prototype.smoothScrollIntoView = function(anchor, transform){
        var elRect = this.getBoundingClientRect(),
            distance;

        anchor = anchor || 'center';
        transform = transform || '300ms ease';

        switch(anchor) {
            case 'top':
                distance = elRect.top;
                break;
            case 'bottom':
                distance = elRect.bottom - window.innerHeight;
                break;
            default: //case 'center':
                distance = elRect.top + elRect.height/2 - window.innerHeight/2;
                break;
        }

        if (window.TransitionEvent) {
            document.body.style.transform = 'translate(0px, ' + distance + 'px)';
        }

        window.scrollBy(0, distance);

        if (window.TransitionEvent) {
            document.body.style.transition = 'transform ' + transform;
            document.body.style.transform = '';
            this.addEventListener('transitionend', function(){ document.body.style.transition = '' }, false);
        }
    };
});