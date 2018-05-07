define([
    './PageHeaderTransition',
    'PageTransition'
], function(PageHeaderTransition, PageTransition) {
    document.ready(function() {
        PageTransition.register(new PageHeaderTransition());
    });
});