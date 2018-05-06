define([
    'lib/velocity',
    'core-ext/body',
    'core-ext/Element'
], function(Velocity) {
    return Object.inherit({
        constructor: function(container) {
            this.container = container;
            this.black = this.container.querySelector('.TheatreScreen-Black');
            this.background = this.container.querySelector('.TheatreScreen-Background');
            this.switch = this.container.querySelector('.TheatreScreen-Switch');
            this.content = this.container.querySelector('.TheatreScreen-Content');
            this.isFocused = false;
        },
        focus: function(duration) {
            if (this.isFocused){ return }
            this.isFocused = true;

            this.content.smoothScrollIntoView({duration: 1000, easing: 'ease-in-out'});
            document.body.disableScrolling();

            this.background.style.display = 'block';

            Velocity(this.black, {opacity: [.9, 0]}, duration, 'ease-in-out');

            var maxWidth = document.getElementsByTagName('main')[0].offsetWidth,
                maxHeight = window.innerHeight - 2*this.switch.offsetHeight,
                maxWidthScale = maxWidth/this.content.offsetWidth,
                maxHeightScale = maxHeight/this.content.offsetHeight;

            Velocity(this.content, {
                scale: [Math.min(maxWidthScale, maxHeightScale), 1],
                boxShadowBlur: [0, '4em']
            }, duration, 'ease-in-out');
        },
        unfocus: function(duration) {
            if (!this.isFocused){ return }
            this.isFocused = false;

            document.body.enableScrolling();

            Velocity(this.black, {opacity: 0}, duration, 'ease-in-out', function() {
                this.background.style.display = '';
            });

            Velocity(this.content, {
                scale: 1,
                boxShadowBlur: ['4em', 0]
            }, duration, 'ease-in-out');
        }
    });
});