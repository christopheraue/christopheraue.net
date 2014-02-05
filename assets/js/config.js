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
            init: function() {
                return Backbone.noConflict();
            }
        },
        underscore: {
            exports: '_',
            init: function() {
                return _.noConflict();
            }
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