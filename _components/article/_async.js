define(function() {
    document.ready(function () {
        if (document.getElementById('disqus_thread')) {
            window.disqus_config = function () {
                this.page.url = 'http://christopheraue.net' + location.pathname;
                this.page.identifier = location.pathname;
            };

            // disqus_shortname must be global or else the comment counter breaks.
            disqus_shortname = 'christopheraue';
            require(['//' + disqus_shortname + '.disqus.com/embed.js']);
            require(['//' + disqus_shortname + '.disqus.com/count.js']);
        }
    });
});