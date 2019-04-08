define([
  'base-PageTransition/main',
  './PageHeaderTransition'
], function (basePageTransition, PageHeaderTransition) {
  document.ready(function () {
    basePageTransition.register(new PageHeaderTransition());
  });
});