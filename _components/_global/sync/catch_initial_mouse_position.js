/*
 *  Watching the initial mouse position must happen ASAP. Therefore, it is
 *  not wrapped in a define() call. Since define() delays the execution of
 *  its function one event loop tick that might already be too late for
 *  this code to run.
 */
!function() {
  var initializeMousePosition = function(e){
    document.initClientX = e.clientX;
    document.initClientY = e.clientY;
    document.removeEventListener('mouseover', initializeMousePosition, false);
  };
  document.addEventListener('mouseover', initializeMousePosition, false);
}();