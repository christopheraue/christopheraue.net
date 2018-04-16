!function() {
    var initializeMousePosition = function(e){
        document.initClientX = e.clientX;
        document.initClientY = e.clientY;
        document.removeEventListener('mouseover', initializeMousePosition, false);
    };
    document.addEventListener('mouseover', initializeMousePosition, false);
}();