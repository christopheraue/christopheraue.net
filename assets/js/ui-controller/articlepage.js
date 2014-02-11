define([
    'underscore',
    'ui-controller/page',
    'ui-helper/articleSidebar',
    '//platform.twitter.com/widgets.js'
], function(_, page, articleSidebar) {
    var articlepage = Object.create(page),
        __parent = page;
    
    _.extend(articlepage, {
        loadAction: function() {
            __parent.loadAction.call(this);
            articleSidebar.init();
            articleSidebar.calcReferences();
            articleSidebar.update();
        },
        scrollAction: function() {
            __parent.scrollAction();
            articleSidebar.update();
        },
        resizeAction: function() {
            __parent.resizeAction();
            articleSidebar.calcReferences();
            articleSidebar.update();
        }
    });
    
    return articlepage;
});