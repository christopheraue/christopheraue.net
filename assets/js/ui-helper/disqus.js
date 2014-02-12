define(function() {
    disqus_shortname = 'christopheraue';
    disqus_identifier = location.pathname;
    disqus_url = 'http://' + location.hostname + location.pathname;
    require(['//' + disqus_shortname + '.disqus.com/embed.js']);
});