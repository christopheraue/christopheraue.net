define([
    'lib/underscore',
    'lib/backbone'
], function() {
    var Backbone = this.Backbone.noConflict();
    Backbone.Model.Collection = Backbone.Collection;
    return Backbone.Model;
});