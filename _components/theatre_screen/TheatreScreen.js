define([
    'core-ext/body',
    'core-ext/Element'
], function() {
    return Object.inherit({
        constructor: function(screen) {
            this.screen = screen;
        },
        isFocused: function() {
            return this.screen.classList.contains('focused');
        },
        focus: function() {
            if (this.isFocused()){ return }
            this.screen.smoothScrollIntoView('center', '1s ease-in-out');
            document.body.disableScrolling();
            this.screen.classList.add('focused');
        },
        unfocus: function() {
            if (!this.isFocused()){ return }
            document.body.enableScrolling();
            this.screen.classList.remove('focused');
        }
    });
});