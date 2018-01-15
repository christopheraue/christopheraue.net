require.config({
    paths: {
        'underscore': 'lib/underscore',
        'jquery': 'lib/jquery'
    },
    shim: {
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