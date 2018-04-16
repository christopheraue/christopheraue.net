define([
    './js/hover_element',
    './js/instant_tap_click_area',
    'core-ext/document'
], function(HoverElement, InstantTapClickArea) {
    document.ready(function() {
        document.getElementsByTagName('*').forEach(function(el) {
            HoverElement.instanceFor(el).unifyMouseAndTouch();
        });

        new InstantTapClickArea(document.body);
    });
});