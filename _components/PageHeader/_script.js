define([
  'base-PageTransition',
  './PageHeaderTransition'
], function (basePageTransition, PageHeaderTransition) {
  document.ready(function () {
    basePageTransition.register(new PageHeaderTransition());
  });
});