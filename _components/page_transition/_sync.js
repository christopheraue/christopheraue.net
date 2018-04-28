define([
    '_components/page_transition/js/PageTransition'
], function(PageTransition) {
    // Don't transition in browsers not supporting CSS animations
    if (!window.AnimationEvent) { return; }

    var transition = PageTransition.getActive();
    if (transition) {
        document.body.classList.add(transition.category + '-transition');
        transition.fadeHeader && document.body.classList.add('header-fade-transition');
    }
});