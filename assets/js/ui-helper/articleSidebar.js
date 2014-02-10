define([
    'underscore',
    'jquery',
    'ui-helper/window',
    'ui-helper/header',
    'ui-helper/attachable'
], function(_, $, window, header, attachable) {
    var articleSidebar = Object.create(attachable);
    
    _.extend(articleSidebar, {
        $el: $('.js-article-sidebar'),
        
        getHeight: function() {
            return this.$el.height();
        },
        
        isScrolledPastHeaderBottom: function(edge) {
            edge !== undefined || (edge = 'top');
            
            var bottomEdgeOfHeader = window.getTopOffset() + header.getHeight(),
                topEdgeOfSidebar = this.getNotAttachedTopOffset(),
                bottomEdgeOfSidebar = topEdgeOfSidebar + this.getNotAttachedHeight();
            
            return bottomEdgeOfHeader >= (edge == 'bottom' ? bottomEdgeOfSidebar : topEdgeOfSidebar);
        },
        
        isScrolledPastWindowBottom: function(edge) {
            edge !== undefined || (edge = 'top');
            
            var bottomEdgeOfWindow = window.getTopOffset() + window.getHeight(),
                topEdgeOfSidebar = this.getNotAttachedTopOffset(),
                bottomEdgeOfSidebar = topEdgeOfSidebar + this.getNotAttachedHeight();
            
            return bottomEdgeOfWindow >= (edge == 'bottom' ? bottomEdgeOfSidebar : topEdgeOfSidebar);
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
        
        shouldBeAttached: function() {
            var attachReference = this.getVerticalAttachReference(),
                shouldBeAttachedToTop = attachReference == 'top' && this.isScrolledPastHeaderBottom('bottom'),
                shouldBeAttachedToBottom = attachReference == 'bottom' && !this.isScrolledPastWindowBottom('top');
            
            return shouldBeAttachedToTop || shouldBeAttachedToBottom;
        },
        
        update: function() {
            if (this.shouldBeAttached()) {
                if (this.isAttachedToViewport())
                    return;
                
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