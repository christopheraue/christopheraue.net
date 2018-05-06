define([
    'core-ext/body',
    'core-ext/Element'
], function() {
    return Object.inherit({
        constructor: function(container) {
            this.container = container;
            this.switch = this.container.querySelector('.TheatreScreen-Switch')
            this.content = this.container.querySelector('.TheatreScreen-Content');
        },
        isFocused: function() {
            return this.container.classList.contains('focused');
        },
        focus: function() {
            if (this.isFocused()){ return }
            this.container.smoothScrollIntoView('center', '1s ease-in-out');
            document.body.disableScrolling();
            this.container.classList.add('focused');

            var maxWidth = document.getElementsByTagName('main')[0].offsetWidth,
                maxHeight = window.innerHeight - 2*this.switch.offsetHeight,
                maxWidthScale = maxWidth/this.content.offsetWidth,
                maxHeightScale = maxHeight/this.content.offsetHeight;

            this.content.style.transform = 'scale(' + Math.min(maxWidthScale, maxHeightScale) + ')';
        },
        unfocus: function() {
            if (!this.isFocused()){ return }
            document.body.enableScrolling();
            this.container.classList.remove('focused');
            this.content.style.transform = '';
        }
    });
});