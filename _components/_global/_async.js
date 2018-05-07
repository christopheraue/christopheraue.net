define([
  './HoverElement',
  './InstantTapClickArea'
], function(HoverElement, InstantTapClickArea) {
  document.ready(function() {
    document.getElementsByTagName('*').forEach(function(el) {
      HoverElement.instanceFor(el).unifyMouseAndTouch();
    });

    new InstantTapClickArea(document.body);
  });

  require(['google-analytics'], function(ga){
    ga('create', 'UA-48107803-1', 'christopheraue.net');
    ga('send', 'pageview');
  });
});