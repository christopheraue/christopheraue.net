define([
  'base-PageTransition',
  './PageTransition'
], function (basePageTransition, PageTransition) {
  document.ready(function () {
    basePageTransition.register(new PageTransition());
  });
});