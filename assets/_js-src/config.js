require.config({
    paths: {
        'svgxuse': 'lib/svgxuse'
    },
    shim: {
        '//www.google-analytics.com/analytics.js': {
            exports: 'ga'
        }
    }
});