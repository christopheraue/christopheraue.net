define([
    '_components/page_transition/js/PageTransition'
], function(PageTransition) {
    // Don't transition in browsers not supporting CSS animations
    if (!window.AnimationEvent) { return; }

    var transition = PageTransition.deleteActive();
    if (transition) {
        transition.fadePageIn();
    }
});