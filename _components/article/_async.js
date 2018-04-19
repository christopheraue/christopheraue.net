define(function() {
    document.ready(function () {
        if (document.getElementById('disqus_thread')) {
            disqus_shortname = 'christopheraue';
            disqus_identifier = location.pathname;
            disqus_url = 'http://christopheraue.net' + location.pathname;
            require(['//' + disqus_shortname + '.disqus.com/embed.js']);
            require(['//' + disqus_shortname + '.disqus.com/count.js']);
        }
    });
});