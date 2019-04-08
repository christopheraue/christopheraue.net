define([
  'base-PageTransition/main',
  './PageTransition',
  'base/ScrollControl'
], function (basePageTransition, PageTransition, ScrollControl) {
  document.ready(function () {
    basePageTransition.register(new PageTransition());
    ScrollControl.scrollToHashAnchors('1s');
  });
});