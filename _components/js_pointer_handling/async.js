define([
    './js/HoverElement',
    './js/InstantTapClickArea',
    'core-ext/document'
], function(HoverElement, InstantTapClickArea) {
    document.ready(function() {
        document.getElementsByTagName('*').forEach(function(el) {
            HoverElement.instanceFor(el).unifyMouseAndTouch();
        });

        new InstantTapClickArea(document.body);
    });
});