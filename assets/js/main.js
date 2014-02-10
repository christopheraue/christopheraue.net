require([
    'config'
], function() {
    require([
        'jquery',
        'ui-controller/page',
        'ui-controller/homepage',
        'ui-controller/articlepage'
    ], function($, page, homepage, articlepage) {
        //routing
        if ($('body.home-page').length) {
            homepage.loadAction();
        } else if ($('body.article-page').length) {
            articlepage.loadAction();
        } else {
            page.loadAction();
        }
    });
});