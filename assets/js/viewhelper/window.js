define([
    'jquery'
], function($) {
    return {
        $el: $(window),
        
        getTopOffset: function() {
            return this.$el.scrollTop();
        },
        
        getHeight: function() {
            return this.$el.height();
        }
    }
});