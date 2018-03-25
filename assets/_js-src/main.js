require([
    'theatre-video',
    'config',
    'lib/svgxuse',
    'unified-pointer-events'
], function(theatreVideo) {
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
    var theatreVideos = document.getElementsByClassName('js-theatre-video');
    if (theatreVideos.length > 0) {
        for (var i=0; i<theatreVideos.length; i++) {
            new theatreVideo(theatreVideos[i]);
        }
    }
});