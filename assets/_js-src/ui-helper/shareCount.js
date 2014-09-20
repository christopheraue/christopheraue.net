define([
  'jquery'
], function($) {
  return {
    init: function() {
      var url = 'http://christopheraue.net' + location.pathname;
      
      this.fbShares(url);
      this.twShares(url);
      this.glShares(url);
    },
    
    fbShares: function(url) {
      $.get(
        '//graph.facebook.com/',
        { id: url },
        function(response) {
          if (response.shares) {
            $('.js-fb-shares').append('<span class="count">'+response.shares+'</span>');
          }
        },
        'jsonp'
      )
    },
    
    twShares: function(url) {
      $.get(
        '//urls.api.twitter.com/1/urls/count.json',
        { url: url },
        function(response) {
          if (response.count) {
            $('.js-tw-shares').append('<span class="count">'+response.count+'</span>');
          }
        },
        'jsonp'
      )
    },
    
    glShares: function(url) {
      //later...
    }
  }
})
