define({
    $el: null,
    
    getTopOffset: function() {
        return this.$el.offset().top;
    },
    
    getNotAttachedTopOffset: function() {
        var isAttachedToViewport = this.isAttachedToViewport(),
            topOffset;
            
        this.deactivateTransitions && this.deactivateTransitions();
        isAttachedToViewport && this.detachFromViewport();
        
        topOffset = this.getTopOffset();
        
        isAttachedToViewport && this.attachToViewport();
        
        return topOffset;
    },
    
    getNotAttachedHeight: function() {
        var isAttachedToViewport = this.isAttachedToViewport(),
            height;
        
        if (isAttachedToViewport) this.detachFromViewport();
        height = this.getHeight();
        if (isAttachedToViewport) this.attachToViewport();
        
        return height;
    },
    
    attachToViewport: function() {
        this.$el.addClass('attached-to-viewport');
    },
    
    detachFromViewport: function() {
        this.$el.removeClass('attached-to-viewport');
    },
    
    isAttachedToViewport: function() {
        return this.$el.hasClass('attached-to-viewport');
    }
})