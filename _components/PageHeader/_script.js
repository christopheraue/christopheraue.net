define([
  './PageHeaderTransition'
], function (PageHeaderTransition) {
  if (requirejs.defined('PageTransition')) {
    var PageTransition = require('PageTransition');
    document.ready(function () {
      PageTransition.register(new PageHeaderTransition());
    });
  }
});