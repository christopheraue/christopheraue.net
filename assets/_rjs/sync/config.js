require.config({
    paths: {
        'core-ext': 'assets/_rjs/core-ext',
        'lib': 'assets/_rjs/lib',
        'sync': 'assets/_rjs/sync',
        'async': 'assets/_rjs/async',
        'google-analytics': '//www.google-analytics.com/analytics',
        'youtube-api': '//www.youtube.com/iframe_api?noext'
    },
    shim: {
        'google-analytics': {
            exports: 'ga'
        },
        'youtube-api': {
            exports: 'YT'
        }
    }
});