define([
    'jquery',
    'viewhelper/header'
], function($, header) {
    return {
        init: function() {
            header.init();
            header.update();
            $(window).scroll(this.scrollAction)
            $(window).resize(this.resizeAction)
        },
        scrollAction: function() {
            header.update();
        },
        resizeAction: function() {
            header.update();
        }
    }
});