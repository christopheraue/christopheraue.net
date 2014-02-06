define([
    'jasmine'
], function() {
    var config = {
            local_base_url: 'http://localhost/christopheraue.net/assets/js/test/_data/',
            isActive: true
        },
        ajaxParent = null,
        ajaxMethod = null,
        ajaxProxy = function(options) {
            //redirect requested url to local filesystem
            var resource_url = options.url.match(/https?:\/\/(.*)/)[1];
            resource_url = resource_url.replace('?', '/');
            options.url = config.local_base_url + resource_url;
            
            //give control back to the actual ajax function
            ajaxParent[ajaxMethod].and.callThrough();
            var xhr = ajaxParent[ajaxMethod](options);
            
            //withdraw control from the actual ajax function again
            ajaxParent[ajaxMethod].and.callFake(ajaxProxy);
            
            return xhr;
        };
    
    return function(object, method) {
        if (!config.isActive)
            return;
        
        ajaxParent = object;
        ajaxMethod = method;
        //withdraw control from the actual ajax function
        spyOn(ajaxParent, ajaxMethod).and.callFake(ajaxProxy);
    };
});