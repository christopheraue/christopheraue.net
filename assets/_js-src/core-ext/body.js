/*
 * Extensions for document.body
 */

define(function() {
    document.body.disableScrolling = function(){
        this.dataset.pageYOffset = window.pageYOffset;
        var scrollbarWidth = window.innerWidth - this.clientWidth;
        var paddingRight = parseFloat(window.getComputedStyle(this, null).getPropertyValue('padding-right'));
        // add a padding to avoid jumps caused by a disappearing scrollbar
        this.style['padding-right'] = (paddingRight + scrollbarWidth) + "px";
        this.style['position'] = "fixed";
        this.style['top'] = -this.dataset.pageYOffset + 'px';
        this.style['width'] = "100%";
        this.style['box-sizing'] = "border-box";
    };

    document.body.enableScrolling = function(){
        this.style['padding-right'] = '';
        this.style['position'] = '';
        this.style['top'] = '';
        this.style['width'] = '';
        this.style['box-sizing'] = '';
        window.scrollTo(0, this.dataset.pageYOffset);
        delete this.dataset.pageYOffset;
    };
});