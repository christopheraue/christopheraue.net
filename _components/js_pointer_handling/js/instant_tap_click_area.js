/*
 * Trigger click instantly when tapping on an element.
 */

define(function() {
    var InstantTapClickArea = function(el) {
        var areaTouched = false;

        el.addEventListener('touchstart', function(e){
            var touch = e.changedTouches[0];
            areaTouched = {clientX: touch.clientX, clientY: touch.clientY};
        }, true);

        el.addEventListener('touchend', function(e){
            if (!areaTouched) { return false; }
            var touch = e.changedTouches[0];
            var offsetX = areaTouched.clientX - touch.clientX;
            var offsetY = areaTouched.clientY - touch.clientY;
            var distance = Math.sqrt(offsetX*offsetX + offsetY*offsetY);

            if (distance < 10) {
                e.stopImmediatePropagation();
                e.preventDefault();
                e.target.click();
            }
            areaTouched = false;
        }, true);

        el.addEventListener('touchcancel', function(){
            areaTouched = false;
        }, true);
    };
    
    return InstantTapClickArea;
});