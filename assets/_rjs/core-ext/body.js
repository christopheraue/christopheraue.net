/*
 * Extensions for document.body
 */

define(function() {
    document.body.hideScrollbar = function() {
        var scrollbarWidth = window.innerWidth - this.clientWidth;
        var paddingRight = parseFloat(window.getComputedStyle(this, null).getPropertyValue('padding-right'));
        // add a padding to avoid jumps caused by a disappearing scrollbar
        this.style['padding-right'] = (paddingRight + scrollbarWidth) + 'px';
        this.style['overflow'] = 'hidden';
    };

    document.body.showScrollbar = function() {
        this.style['padding-right'] = '';
        this.style['overflow'] = '';
    };

    document.body.disableScrolling = function(){
        this.savedPageYOffset = window.pageYOffset;
        this.hideScrollbar();
        this.style['position'] = "fixed";
        this.style['top'] = -this.savedPageYOffset + 'px';
        this.style['width'] = "100%";
        this.style['box-sizing'] = "border-box";
    };

    document.body.enableScrolling = function(){
        this.showScrollbar();
        this.style['position'] = '';
        this.style['top'] = '';
        this.style['width'] = '';
        this.style['box-sizing'] = '';
        window.scrollTo(0, this.savedPageYOffset);
        delete this.savedPageYOffset;
    };
});