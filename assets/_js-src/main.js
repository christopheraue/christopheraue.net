require([
    'theatre-mode',
    'config',
    'lib/svgxuse',
    'unified-hover'
], function(theatreMode) {
    require(['google-analytics'], function(ga){
        ga('create', 'UA-48107803-1', 'christopheraue.net');
        ga('send', 'pageview');
    });

    // disqus comments
    if (document.getElementById('disqus_thread')) {
        disqus_shortname = 'christopheraue';
        disqus_identifier = location.pathname;
        disqus_url = 'http://christopheraue.net' + location.pathname;
        require(['//' + disqus_shortname + '.disqus.com/embed.js']);
        require(['//' + disqus_shortname + '.disqus.com/count.js']);
    }

    // darken background of playing videos
    var theatreModeVideos = document.getElementsByClassName('js-theatre-mode');
    if (theatreModeVideos.length > 0) {
        theatreMode.init();
        for (var i=0; i<theatreModeVideos.length; i++) {
            theatreMode.initVideo(theatreModeVideos[i]);
        }
    }
});