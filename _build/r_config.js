({
    baseUrl: '../assets/_js-src/',
    mainConfigFile: '../assets/_js-src/config.js',
    skipDirOptimize: true,
    removeCombined: true,
    name: 'main',
    out: '../assets/main.js',
    paths: {
        'google-analytics': 'empty:',
        'youtube-api': 'empty:'
    }
})