define({
    init: function() {
        this.loadComments();
        this.loadCount();
    },
    
    loadComments: function() {
        disqus_shortname = 'christopheraue';
        disqus_identifier = location.pathname;
        disqus_url = 'http://' + location.hostname + location.pathname;
        require(['//' + disqus_shortname + '.disqus.com/embed.js']);
    },
    
    loadCount: function() {
        disqus_shortname = 'christopheraue';
        require(['//' + disqus_shortname + '.disqus.com/count.js']);
    }
});