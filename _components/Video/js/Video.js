define([
    'base/EventTarget'
], function(EventTarget){
    return EventTarget.inherit({
        state: 'initializing',
        constructor: function() {
            EventTarget.call(this);

            // Track state
            this.addEventListener('stateChange', function(e){
                this.state = e.data.to
            }.bind(this));
        }
    });
});