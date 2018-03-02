require([
    'config',
    'jquery',
    'svgxuse'
], function(_, $) {
    //routing
    if ($('body.article-page').length) {
        require([
            'ui-controller/articlepage'
        ], function(articlepage) {
            articlepage.loadAction();
        });
    } else {
        require([
            'ui-controller/page'
        ], function(page) {
            page.loadAction();
        });
    }
});