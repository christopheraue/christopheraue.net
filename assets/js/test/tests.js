require.config({
    baseUrl: '../',
    paths: {
        'text': 'test/lib/text',
        'jasmine': 'test/lib/jasmine',
        'jasmine-html': 'test/lib/jasmine-html',
        'jasmine-boot': 'test/lib/jasmine-boot'
    },
    shim: {
        'jasmine': {
            exports: 'jasmine'
        },
        'jasmine-html': {
            deps: ['jasmine'],
            exports: 'jasmine'
        },
        'jasmine-boot': {
            deps: ['jasmine', 'jasmine-html'],
            exports: 'jasmine'
        }
    }
});

require([
    'jasmine',
    'jasmine-html',
    'jasmine-boot'
], function(jasmine) {
    require([
        'test/model/tweet',
        'test/model/tweet/collection'
    ], window.onload); //kicking of Jasmine is bound to the window onload event in jasmine-boot
});