/*
 * Extension for HTMLCollections.
 */

define(function() {
    HTMLCollection.prototype.forEach = function(f) {
        /* If f alters the affiliation of the element with the collection
         * this is immediately reflected and causes unforeseen consequences
         * during the subsequent iterations of the loop. For that reason,
         * Iterate over a static representation.
         */
        var staticElements = [];
        for (var i=0; i<this.length; i++) {
            staticElements.push(this[i]);
        }
        staticElements.forEach(f);
    }
});