({
    baseUrl: '../assets/_js-src/',
    mainConfigFile: '../assets/_js-src/config.js',
    dir: '../assets/js',
    skipDirOptimize: true,
    removeCombined: true,
    fileExclusionRegExp: /^(test)/,
    modules: [{
        name: 'main'
    },{
        name: 'ui-controller/articlepage'
    },{
        name: 'ui-controller/page'
    }]
})