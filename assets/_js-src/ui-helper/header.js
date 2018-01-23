define([
    'underscore',
    'jquery',
    'ui-helper/window'
], function(_, $, window) {
    return {
        $el: $('.js-header'),
        
        getHeight: function() {
            var height = this.$el.height();
            //set headerHeight to zero, if it is attached to left and span the complete height
            //of the viewport
            return height < window.getHeight() ? height : 0;
        }
    };
});