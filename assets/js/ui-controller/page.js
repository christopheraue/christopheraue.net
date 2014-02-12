define([
    'jquery',
    'ui-helper/header',
    'ui-helper/backToTopButton',
    'ui-helper/adaptiveImages'
], function($, header, backToTopButton, adaptiveImages) {
    return {
        loadAction: function() {
            header.init();
            header.calcReferences();
            header.update();
            backToTopButton.init();
            adaptiveImages.init();
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