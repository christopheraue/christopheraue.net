define(function() {
    Function.prototype.inherit = function(methods) {
        var constructor;

        if (typeof methods === 'undefined') {
            constructor = function(){};
        } else if (typeof methods.constructor === 'undefined') {
            constructor = function(){};
        } else if (typeof methods.constructor !== 'function') {
            throw "constructor no function";
        } else {
            constructor = methods.constructor;
        }

        constructor.superconstructor = this;
        constructor.prototype = Object.create(this.prototype);

        Object.defineProperty(constructor.prototype, 'constructor', {
            enumerable: false,
            value: constructor
        });

        if (typeof methods !== 'undefined') {
            for (var key in methods)  {
                if (methods.hasOwnProperty(key)) {
                    constructor.prototype[key] = methods[key];
                }
            }
        }

        return constructor;
    };
});