define([
    './PageHeaderTransition',
    '_components/PageTransition/PageTransition'
], function(PageHeaderTransition, PageTransition) {
    document.ready(function() {
        PageTransition.register(new PageHeaderTransition());
    });
});