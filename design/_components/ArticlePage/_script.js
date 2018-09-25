define(function() {
    document.ready(function () {
        var hostname = 'christopheraue.net';

        if (location.hostname === hostname && document.getElementById('disqus_thread')) {
            window.disqus_config = function () {
                this.page.url = location.href;
                this.page.identifier = location.pathname;
            };

            // disqus_shortname must be global or else the comment counter breaks.
            disqus_shortname = 'christopheraue';
            require(['//' + disqus_shortname + '.disqus.com/embed.js']);
            require(['//' + disqus_shortname + '.disqus.com/count.js']);
        }
    });
});