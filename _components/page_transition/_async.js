define([
    './PageTransition',
    './PageTransition/Fader'
], function(PageTransition, Fader){
    document.ready(function() {
        PageTransition.register(new Fader());
        PageTransition.initialize();
    });
});