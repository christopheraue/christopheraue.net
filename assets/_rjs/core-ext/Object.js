define(function() {
    Object.prototype.merge = function(o) {
        for (var key in o)  {
            if (o.hasOwnProperty(key)) {
                this[key] = o[key];
            }
        }
    };
});