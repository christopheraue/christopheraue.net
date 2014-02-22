define([
    '//www.google-analytics.com/analytics.js'
], function(ga) {
    return {
        init: function() {
            ga('create', 'UA-48107803-1', 'christopheraue.net');
            ga('send', 'pageview');
        }
    }
})