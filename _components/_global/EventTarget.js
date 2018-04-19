define(function(){
    return Object.inherit({
        constructor: function() {
            this.eventListeners = {};
        },
        addEventListener: function(name, f) {
            if (!(name in this.eventListeners)) {
                this.eventListeners[name] = []
            }

            this.eventListeners[name].push(f);
        },
        removeEventListener: function(name, f) {
            if (!(name in this.eventListeners)) {
                return;
            }

            var idx = this.eventListeners[name].indexOf(f);
            if (idx !== -1) {
                this.eventListeners[name].splice(idx, 1);
            }

            if (this.eventListeners[name].length === 0) {
                delete this.eventListeners[name];
            }
        },
        dispatchEvent: function(name, data) {
            if (!(name in this.eventListeners)) {
                return;
            }
            var event = new Event(name);
            event.data = data;
            this.eventListeners[name].forEach(function(listener){
                listener(event)
            });
        }
    });
});