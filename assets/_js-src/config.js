require.config({
    paths: {
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