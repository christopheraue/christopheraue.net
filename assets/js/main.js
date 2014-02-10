require([
    'config'
], function() {
    require([
        'jquery',
        'controller/page',
        'controller/homepage',
        'controller/articlepage'
    ], function($, page, homepage, articlepage) {
        //routing
        if ($('body.home-page').length) {
            homepage.init();
        } else if ($('body.article-page').length) {
            articlepage.init();
        } else {
            page.init();
        }
    });
});