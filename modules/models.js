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
                resp.query = 'CALL Create_Case(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
                resp.args = [
                    this.get('edificio'),
                    this.get('apartamento'),
                    this.get('area'),
                    this.get('nombre'),
                    this.get('casoRecibidO'),
                    this.get('seleccionado'),
                    this.get('completado'),
                    this.get('causal'),
                    this.get('rentaMensual'),
                    this.get('mesesAdeudados'),
                    this.get('deudaRenta'),
                    this.get('deudaRentaNegativa'),
                    this.get('deudaRecibida'),
                    this.get('deudaTotal'),
                    this.get('ultimoReexamen'),
                    this.get('incumplimiento'),
                    this.get('caso'),
                    this.get('presentacion'),
                    this.get('diligenciado'),
                    this.get('diligenciadoEn'),
                    this.get('sala'),
                    this.get('hora'),
                    this.get('primeraComparecencia'),
                    this.get('segundaComparecencia'),
                    this.get('vistaSegundo'),
                    this.get('sentencia'),
                    this.get('lanzamiento'),
                    this.get('observaciones')
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

Models.Residencial = Backbone.Model.extend({
});

Models.Residenciales = Backbone.Collection.extend({
    model: Models.Residencial
});

Models.Causal = Backbone.Model.extend({
});

Models.Causales = Backbone.Collection.extend({
    model: Models.Causal
});

module.exports = Models;