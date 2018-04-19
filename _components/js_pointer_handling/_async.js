define([
    './js/HoverElement',
    './js/InstantTapClickArea'
], function(HoverElement, InstantTapClickArea) {
    document.ready(function() {
        document.getElementsByTagName('*').forEach(function(el) {
            HoverElement.instanceFor(el).unifyMouseAndTouch();
        });

        new InstantTapClickArea(document.body);
    });
});