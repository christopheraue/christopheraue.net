define([
    './PageHeaderTransition',
    'root-PageTransition'
], function(PageHeaderTransition, PageTransition) {
    document.ready(function() {
        PageTransition.register(new PageHeaderTransition());
    });
});