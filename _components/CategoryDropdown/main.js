define([
    'base-_base/lib/velocity'
], function(Velocity) {
    return Object.inherit({
        constructor: function(el) {
            this.nav = el;
            this.list = this.nav.children[0];
        },
        disable: function() {
            this.nav.activatedState.disable();
        },
        enable: function() {
            this.nav.activatedState.enable();
        },
        slideTo: function(category, duration) {
            var categoryItem = this.list.querySelector('.CategoryDropdown-Item.' + category),
                categoryItemIdx = Array.prototype.indexOf.call(this.list.children, categoryItem),
                itemHeight = this.list.children[0].offsetHeight;

            categoryItem.classList.add('current');
            Velocity(this.list.children[0], {marginTop: -categoryItemIdx*itemHeight + 'px'}, duration, 'ease-in-out');
        },
        releaseSlide: function() {
            this.list.children.forEach(function(item) {
                item.classList.remove('current');
            });
            this.list.children[0].classList.add('current');
            this.list.children[0].style['margin-top'] = '';
        }
    })
});