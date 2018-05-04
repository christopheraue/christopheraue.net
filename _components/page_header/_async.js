define([
    './PageHeaderTransition',
    '_components/page_transition/PageTransition',
    '_components/_global/ActivatableElement'
], function(PageHeaderTransition, PageTransition, ActivatableElement) {
    document.ready(function() {
        PageTransition.register(new PageHeaderTransition());

        var nav = document.querySelector('body > header nav');
        if (!nav) { return }

        // Make the header navigation activatable
        var activatable = ActivatableElement.instanceFor(nav);
        activatable.activateOnMouseOver();
        activatable.activateOnTouchDownUp();

        // Deactivate the header navigation for its transition
        nav.getElementsByTagName('a').forEach(function(anchor) {
            anchor.addEventListener('click', function() {
                nav.activatedState.disable();
            }, false);
        });

        window.addEventListener('pageshow', function(e) {
            if (!e.persisted) { return }
            nav.activatedState.enable();
        }, false);
    });
});