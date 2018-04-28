require.config({
    paths: {
        'core-ext': '_components/_global/core-ext',
        'lib': '_components/_global/lib',
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