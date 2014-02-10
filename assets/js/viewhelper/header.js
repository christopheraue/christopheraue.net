define([
    'underscore',
    'jquery',
    'viewhelper/window',
    'viewhelper/backgroundFader',
    'viewhelper/attachable'
], function(_, $, window, bgFader, attachable) {
    var header = Object.create(attachable);
    
    _.extend(header, {
        $el: $('.js-header'),
        
        getHeight: function() {
            var height = this.$el.height();
            //set headerHeight to zero, if it is attached to left and span the complete height
            //of the viewport
            height = height < window.getHeight() ? height : 0;
            return height;
        },
        
        makeOpaque: function() {
            this.$el.addClass('opaque');
        },
        
        makeTransparent: function() {
            this.$el.removeClass('opaque');
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
                
                if (bgFader.isScrolledPast()) {
                    this.makeOpaque();
                } else {
                    this.makeTransparent();
                }
            } else {
                this.detachFromViewport();
            }
        }
    });
    
    return header;
});