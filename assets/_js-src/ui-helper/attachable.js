define({
    $el: null,
    
    getTopOffset: function() {
        return this.$el.offset().top;
    },
    
    getNotAttachedTopOffset: function() {
        return this.notAttachedTopOffset;
    },
    
    getNotAttachedHeight: function() {
        return this.notAttachedHeight;
    },
    
    attachToViewport: function() {
        if (this.isAttachedToViewport())
            return;
        
        this.$el.addClass('attached-to-viewport');
    },
    
    detachFromViewport: function() {
         if (!this.isAttachedToViewport())
            return;
        
        this.$el.removeClass('attached-to-viewport');
    },
    
    isAttachedToViewport: function() {
        return this.$el.hasClass('attached-to-viewport');
    },
    
    getVerticalAttachReference: function() {
        return this.verticalAttachReference;
    },
    
    setAttachedEnvironment: function(attachIt) {
        attachIt !== undefined || (attachIt = true);
        
        var isAttachedToViewport = this.isAttachedToViewport();
            
        this.deactivateTransitions && this.deactivateTransitions();
        if (isAttachedToViewport && !attachIt) {
            this.detachFromViewport();
        } else if (!isAttachedToViewport && attachIt) {
            this.attachToViewport();
        }
        
        //revert it
        var that = this;
        return function() {
            if (isAttachedToViewport && !attachIt) {
                that.attachToViewport();
            } else if (!isAttachedToViewport && attachIt) {
                that.detachFromViewport();
            }
        }
    },
    
    calcReferences: function() {
        var revert = this.setAttachedEnvironment(false);
        this.notAttachedTopOffset = this.getTopOffset();
        this.notAttachedHeight = this.getHeight();
        revert();
        
        var revert = this.setAttachedEnvironment(true);
        this.verticalAttachReference = this.$el.css('top') !== 'auto' ? 'top' : 'bottom';
        revert();
    }
})