var _ = require('underscore');

var client = require('../db');
var queries = require('../queries');

module.exports = function(Backbone, Models) {

	Models.Residencial = Backbone.Model.extend({
	});

	Models.Residenciales = Backbone.Collection.extend({
	    model: Models.Residencial,
	    read: function(resp){
	        _.extend(resp,queries.getResidenciales());
	    }
	});

	Models.Causal = Backbone.Model.extend({
	});

	Models.Causales = Backbone.Collection.extend({
	    model: Models.Causal,
	    read: function(resp){
	        _.extend(resp,queries.getCausales());
	    }
	});

};