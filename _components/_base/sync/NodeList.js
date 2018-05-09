define(function() {
    if (!NodeList.prototype.forEach) {
        NodeList.prototype.forEach = function (f) {
            this.toArray().forEach(f);
        };
    }

    NodeList.prototype.toArray = function() {
        return Array.prototype.slice.call(this, 0);
    }
});