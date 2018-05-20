/*
 *  Make sure that the page transition is triggered after all transitioning
 *  blocks have been registered. Or else, the page transition will be
 *  incomplete!
 */
define([
  'root-PageTransition'
], function(PageTransition) {
  document.ready(function() {
    PageTransition.initialize();
  });
});