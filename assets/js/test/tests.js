require.config({
    baseUrl: '../',
    paths: {
        'qunit': 'test/_assets/qunit',
        'text': 'test/_assets/text'
    }
});

require([
    'qunit'
], function(/*qunit does not return itself...*/) {
    /* 
     * QUnit is stored in the global variable QUnit.
     * Kick it off...
     */
    QUnit.load();
    
    //Here come the tests...
    require([
        'test/model/tweet'
    ]);
});