define([
    'jquery',
    'ui-helper/header'
], function($, header) {
    return {
        loadAction: function() {
            header.init();
            header.calcReferences();
            header.update();
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