require([
    'config',
    'svgxuse',
    '//www.google-analytics.com/analytics.js'
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

    // simulate hover states for touch screens
    var elements = document.getElementsByTagName('*');
    for (var i=0; i < elements.length; i++) {
        elements[i].addEventListener('touchstart', function(){ this.classList.add('hover') });
        elements[i].addEventListener('touchend', function(){ this.classList.remove('hover') });
        elements[i].addEventListener('touchcancel', function(){ this.classList.remove('hover') });
    }
});