define(function() {
    HTMLCollection.prototype.forEach = function(f) {
        this.toArray().forEach(f);
    };

    HTMLCollection.prototype.toArray = function() {
        return Array.prototype.slice.call(this, 0);
    }
});