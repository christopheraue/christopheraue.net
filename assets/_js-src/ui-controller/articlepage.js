define([
    'underscore',
    'ui-controller/page',
    'ui-helper/articleSidebar',
    'ui-helper/disqus',
    '//platform.twitter.com/widgets.js'
], function(_, page, articleSidebar, disqus) {
    var articlepage = Object.create(page),
        __parent = page;
    
    _.extend(articlepage, {
        loadAction: function() {
            __parent.loadAction.call(this);
            articleSidebar.init();
            articleSidebar.calcReferences();
            articleSidebar.update();
            disqus.init();
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
