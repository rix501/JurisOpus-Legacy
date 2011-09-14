var _ = require('underscore')._;
var Backbone = require('backbone');

var client = require('./db');

//Backbone Modification

Backbone.Model.prototype.save = function(attrs, options) {
    options || (options = {});
    
    if (attrs && !this.set(attrs, options)) return false;
    
    var model = this;
    var success = options.success;
    
    options.success = function(results, fields) {
        //TODO Need to fix, for checking return values
        //if (!model.set(model.parse(results[0]), options)) return false;
        
        if (success) success(model, fields);
    };
    
    var method = this.isNew() ? 'create' : 'update';
    
    return (this.sync || Backbone.sync).call(this, method, this, options);
};


Backbone.sync = function(method, model, options) {
    var procedure = model.procedure(method);
      
    client.query(procedure.query, procedure.args, function(err, results, fields){
        if(err) options.error(err);
        options.success(results, fields);
    });
};

//My models

var Models = {};

Models.Caso = Backbone.Model.extend({
    procedure: function(method){
        var resp = {
            query: "",
            args: []        
        };

        switch (method) {
            case "read":
                resp.query = 'CALL product(?)';
                resp.args = [this.id];

                break;
            case "create":
                resp.query = 'CALL Create_Case(?,?,?,?,?)';
                resp.args = [
                    this.get('edificio'), 
                    this.get('apartamento'),
                    this.get('area'),
                    this.get('nombre'),
                    this.get('caso')
                ];
                                
                break;
            case "update":

                break;
            case "delete":

                break;
        }

        return resp;
    }
});

Models.Casos = Backbone.Collection.extend({
    model: Models.Caso
});

module.exports = Models;