define(function() {
  require(['google-analytics'], function(ga){
    ga('create', 'UA-48107803-1', 'christopheraue.net');
    ga('send', 'pageview');
  });
});