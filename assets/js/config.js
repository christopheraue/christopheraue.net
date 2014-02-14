require.config({
    paths: {
        'backbone': 'lib/backbone',
        'underscore': 'lib/underscore',
        'jquery': 'lib/jquery',
        'text': 'lib/require/text'
    },
    shim: {
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone',
            init: function(_, $) {
                Backbone.$ = $;
                return Backbone.noConflict();
            }
        },
        underscore: {
            exports: '_',
            init: function() {
                return _.noConflict();
            }
        },
        '//www.google-analytics.com/analytics.js': {
            exports: 'ga'
        }
    },
    map: {
        '*': {
            'jquery': 'lib/jquery-private'
        },
        'lib/jquery-private': {
            'jquery': 'jquery'
        }
    }
});