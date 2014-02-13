require([
    'config'
], function() {
    require([
        'jquery'
    ], function($) {
        //routing
        if ($('body.home-page').length) {
            require([
                'ui-controller/homepage'
            ],function(homepage) {
                homepage.loadAction();
            });
        } else if ($('body.article-page').length) {
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
});