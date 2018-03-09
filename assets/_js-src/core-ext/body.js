/*
 * Extensions for document.body
 */

define(function() {
    var preventTouchScrolling = function(e){
        e.preventDefault();
    };

    document.body.disableScrolling = function(){
        // add a padding to avoid jumps caused by a disappearing sidebar
        this.style['padding-right'] = (window.innerWidth - this.clientWidth) + "px";
        this.style['height'] = "100%";
        this.style['overflow'] = "hidden";
        this.addEventListener('touchmove', preventTouchScrolling, false);
    };

    document.body.enableScrolling = function(){
        this.style['padding-right'] = null;
        this.style['height'] = null;
        this.style['overflow'] = null;
        this.removeEventListener('touchmove', preventTouchScrolling, false);
    };
});