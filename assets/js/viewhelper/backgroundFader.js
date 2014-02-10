define([
    'jquery',
    'viewhelper/window'
], function($, window) {
    return {
        $el: $('.start-background-fade'),
        
        getTopOffset: function() {
            return this.$el.offset().top;
        },
        
        isScrolledPast: function() {
            return window.getTopOffset() >= this.getTopOffset();
        }
    }
});