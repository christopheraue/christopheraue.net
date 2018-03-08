require([
    'config',
    'lib/svgxuse',
    'unified-hover'
], function() {
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
});