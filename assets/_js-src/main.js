require([
    'config',
    'svgxuse',
    '//www.google-analytics.com/analytics.js',
    'unified-hover'
], function(conf, svg, ga) {
    // google analytics
    ga('create', 'UA-48107803-1', 'christopheraue.net');
    ga('send', 'pageview');

    // disqus comments
    if (document.getElementById('disqus_thread')) {
        console.log('load disqus comments');
        disqus_shortname = 'christopheraue';
        disqus_identifier = location.pathname;
        disqus_url = 'http://christopheraue.net' + location.pathname;
        require(['//' + disqus_shortname + '.disqus.com/embed.js']);
        require(['//' + disqus_shortname + '.disqus.com/count.js']);
    }

    // on page debug output
    var debug = document.getElementById('js-debug');
    debug.idx = 0;
    debug.log = function(msg) {
        debug.innerText += this.idx++ + " " + msg + "\n";
    };
});