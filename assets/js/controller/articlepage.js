define([
    'underscore',
    'controller/page',
    'viewhelper/articleSidebar'
], function(_, page, articleSidebar) {
    var articlepage = Object.create(page),
        __parent = page;
    
    _.extend(articlepage, {
        init: function() {
            __parent.init.call(this);
            articleSidebar.init();
            articleSidebar.update();
        },
        scrollAction: function() {
            __parent.scrollAction();
            articleSidebar.update();
        },
        resizeAction: function() {
            __parent.resizeAction();
            articleSidebar.update();
        }
    });
    
    return articlepage;
});