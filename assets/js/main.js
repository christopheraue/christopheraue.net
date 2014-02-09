require([
    'config'
], function() {
    var initMenuButtons = function($) {
            var $menuArea = $('.js-menu-area')
            $('.js-menu-button, .js-close-menu-button').click(function() {
                $menuArea.toggleClass('show');
            });
        },
        initHeaderScrollBehaviour = function($) {
            var $header = $('.js-header'),
                $window = $(window),
                $backgroundFade = $('.start-background-fade'),
                backgroundFadePos,
                headerPos;
                
                updateReferenceValues = function() {
                    if ($header.hasClass('attached-to-top')) {
                        $header.removeClass('attached-to-top');
                        headerPos = $header.position();
                        $header.addClass('attached-to-top');
                    } else {
                        headerPos = $header.position();
                    }
                    
                    backgroundFadePos = $backgroundFade.offset();
                },
                checkHeaderState = function() {
                    var scrollTop = $window.scrollTop();
                    
                    if (scrollTop >= headerPos.top) {
                        $header.addClass('attached-to-top');
                        
                        if (scrollTop > backgroundFadePos.top) {
                            $header.addClass('opaque');
                        } else {
                            $header.removeClass('opaque');
                        }
                    } else {
                        $header.removeClass('attached-to-top');
                    }
                };
            
            updateReferenceValues();
            checkHeaderState();
            
            $window.resize(function() {
                updateReferenceValues();
                checkHeaderState();
            });
            
            $window.scroll(checkHeaderState);
        },
        initTwitterTimeline = function() {
            require([
                'model/tweet/collection',
                'view/tweet/collection'
            ], function(TweetCollection, TweetCollectionView) {
                var tweetCollection = new TweetCollection(),
                    tweetCollectionView = new TweetCollectionView({
                        el: '.js-twitter-timeline-home',
                        collection: tweetCollection
                    });
                    
                tweetCollection.fetch({
                    success: function() {
                        tweetCollectionView.render()
                    }
                });
            })
        },
        initArticleSidebarBehaviour = function($) {
            var $articleSidebar = $('.js-article-sidebar'),
                $articleContent = $('.js-article-content'),
                $window = $(window),
                $header = $('.js-header'),
                articleContentPos,
                headerHeight,
                
                //update header height in case it changed after resizing the viewport
                updateReferenceValues = function() {
                    var oldHeaderHeight = headerHeight;
                    
                    headerHeight = $header.height();
                    //set headerHeight to zero, if it is attached to left and span the complete height
                    //of the viewport
                    headerHeight = headerHeight < $window.height() ? headerHeight : 0;
                    
                    articleContentPos = $articleContent.offset();
                },
                //attach article sidebar to the viewport if it would scroll out of view otherwise
                updateSidebarAttachment = function() {
                    var scrollTop = $window.scrollTop();
                    
                    if (scrollTop + headerHeight >= articleContentPos.top) {
                        $articleSidebar.addClass('attached-to-viewport');
                    } else {
                        $articleSidebar.removeClass('attached-to-viewport');
                    }
                }
            
            updateReferenceValues();
            updateSidebarAttachment();
            
            $window.resize(function() {
                updateReferenceValues();
                updateSidebarAttachment();
            });
            
            $window.scroll(updateSidebarAttachment);
            
            $('.js-article-sidebar-handle').click(function() {
                $articleSidebar.toggleClass('collapsed');
            });
        };
    
    require([
        'jquery'
    ], function($) {
        initMenuButtons($);
        initHeaderScrollBehaviour($);
        
        if ($('.js-twitter-timeline-home').length) {
            initTwitterTimeline();
        }
        
        if ($('.js-article-sidebar').length) {
            initArticleSidebarBehaviour($);
        }
    });
});