/*
 * Extensions for Objects
 */

define(function() {
    Object.prototype.merge = function(source) {
        Object.keys(source).forEach(function(key){ this[key] = source[key]; }.bind(this));
        return this;
    };
});