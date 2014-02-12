define([
    'jquery'
], function($) {
    return {
        init: function() {
            $('.js-back-to-top-button').click(function() {
                $(window).scrollTop(0);
            });
        }
    }
});