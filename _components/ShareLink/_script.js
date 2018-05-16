define(function() {
  document.ready(function() {
    require(['google-analytics'], function(ga) {
      document.getElementsByClassName('ShareLink').forEach(function(link) {
        link.addEventListener('click', function() {
          ga('send', 'event', 'Share Attempt', link.getAttribute('title'), link.getAttribute('data-url'))
        })
      });
    });
  });
});