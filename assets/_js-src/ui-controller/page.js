define([
    'jquery',
    'ui-helper/header',
    'ui-helper/backToTopButton',
    'ui-helper/googleAnalytics'
], function($, header, backToTopButton, googleAnalytics) {
    return {
        loadAction: function() {
            header.init();
            header.calcReferences();
            header.update();
            backToTopButton.init();
            googleAnalytics.init();
            $(window).scroll(this.scrollAction)
            $(window).resize(this.resizeAction)
        },
        scrollAction: function() {
            header.update();
        },
        resizeAction: function() {
            header.calcReferences();
            header.update();
        }
    }
});