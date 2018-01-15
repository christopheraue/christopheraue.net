define([
    'underscore',
    'jquery',
    'ui-helper/window',
    'ui-helper/backgroundFader',
    'ui-helper/attachable'
], function(_, $, window, bgFader, attachable) {
    var header = Object.create(attachable);
    
    _.extend(header, {
        $el: $('.js-header'),
        
        getHeight: function() {
            var height = this.$el.height();
            //set headerHeight to zero, if it is attached to left and span the complete height
            //of the viewport
            return height < window.getHeight() ? height : 0;
        },

        isScrolledPast: function() {
            return window.getTopOffset() >= this.getNotAttachedTopOffset();
        },
        
        init: function() {
            var $menuArea = $('.js-menu-area')
            $('.js-menu-button, .js-close-menu-button').click(function() {
                $menuArea.toggleClass('show');
            });
        },
        
        update: function() {
            if (this.isScrolledPast()) {
                this.attachToViewport();
            } else {
                this.detachFromViewport();
            }
        }
    });
    
    return header;
});