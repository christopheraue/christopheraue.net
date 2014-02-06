require([
    '../config'
], function() {
    require.config({
        baseUrl: '../',
        paths: {
            'jasmine': 'test/lib/jasmine',
            'jasmine-html': 'test/lib/jasmine-html',
            'jasmine-boot': 'test/lib/jasmine-boot',
            'ajaxproxy': 'test/lib/ajaxproxy'
        },
        shim: {
            'jasmine': {
                exports: 'jasmine'
            },
            'jasmine-html': ['jasmine'],
            'jasmine-boot': ['jasmine', 'jasmine-html']
        }
    });

    require([
        'jasmine',
        'jasmine-html',
        'jasmine-boot'
    ], function(jasmine) {      
        require([
            'test/model/tweet',
            'test/model/tweet/collection',
            'test/view/tweet',
            'test/view/tweet/collection'
        ], window.onload); //kicking of Jasmine is bound to the window onload event in jasmine-boot
    });
});