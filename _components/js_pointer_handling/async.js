define([
    './js/trigger_mouse_enter_at',
    './js/hover_element',
    './js/instant_tap_click_area',
    'core-ext/document'
], function(triggerMouseEnterAt, HoverElement, InstantTapClickArea) {
    document.ready(function() {
        document.getElementsByTagName('*').forEach(function(el) {
            HoverElement.instanceFor(el).unifyMouseAndTouch();
        });

        new InstantTapClickArea(document.body);

        if (document.initClientX) {
            triggerMouseEnterAt(document.initClientX, document.initClientY);
        } else {
            var initHover = function(){
                triggerMouseEnterAt(document.initClientX, document.initClientY);
                document.removeEventListener('mouseover', initHover, false);
            };
            document.addEventListener('mouseover', initHover, false);
        }
    });
});