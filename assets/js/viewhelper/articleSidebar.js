define([
    'underscore',
    'jquery',
    'viewhelper/window',
    'viewhelper/header',
    'viewhelper/attachable'
], function(_, $, window, header, attachable) {
    var articleSidebar = Object.create(attachable);
    
    _.extend(articleSidebar, {
        $el: $('.js-article-sidebar'),
        
        getHeight: function() {
            return this.$el.height();
        },
        
        isScrolledPast: function() {
            return window.getTopOffset() + header.getHeight() >= this.getNotAttachedTopOffset() + this.getNotAttachedHeight();
        },
        
        activateTransitions: function() {
            this.$el.addClass('animate');
        },
        
        deactivateTransitions: function() {
            this.$el.removeClass('animate');
        },
        
        isAnimated: function() {
            return this.$el.hasClass('animate');
        },
        
        collapse: function() {
            this.$el.addClass('collapsed');
        },
        
        init: function() {
            var that = this;
            $('.js-article-sidebar-handle').click(function() {
                that.activateTransitions();
                that.$el.toggleClass('collapsed');
            });
        },
        
        update: function() {
            if (this.isScrolledPast()) {
                if (this.isAttachedToViewport()) return
                this.attachToViewport();
                this.collapse();
            } else {
                this.detachFromViewport();
                this.deactivateTransitions();
            }
        }
    });
    
    return articleSidebar;
});