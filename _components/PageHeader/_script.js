define([
  './PageHeaderTransition'
], function (PageHeaderTransition) {
  if (requirejs.defined('base-PageTransition')) {
    var PageTransition = require('base-PageTransition');
    document.ready(function () {
      PageTransition.register(new PageHeaderTransition());
    });
  }
});