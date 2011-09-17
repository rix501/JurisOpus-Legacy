var _ = require('underscore')._;
var Backbone = require('backbone');

var client = require('./db');

//Backbone Modification
Backbone.Model.prototype.procedure = function(method){
    var resp = {
        query: "",
        args: []        
    };

    switch (method) {
        case "read":
            if(this.read) this.read(resp);
            break;
        case "create":   
            if(this.create) this.create(resp);
            break;
        case "update":
            if(this.upd) this.upd(resp);
            break;
        case "delete":
            if(this.del) this.del(resp);
            break;
    }

    return resp;
};

Backbone.Collection.prototype.procedure = function(method){
    var resp = {
        query: "",
        args: []        
    };

    switch (method) {
        case "read":
            if(this.read) this.read(resp);
            break;
        case "create":   
            if(this.create) this.create(resp);
            break;
        case "update":
            if(this.upd) this.upd(resp);
            break;
        case "delete":
            if(this.del) this.del(resp);
            break;
    }

    return resp;
};

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
    create: function(resp){
        resp.query = 'CALL Create_Caso(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
        resp.args = [
            this.get('edificio'),
            this.get('apartamento'),
            this.get('area'),
            this.get('nombre'),
            this.get('casoRecibido'),
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
    }
});

Models.Casos = Backbone.Collection.extend({
    model: Models.Caso,
    read: function(resp){
        resp.query = 'CALL Get_Casos()';
    }
});

Models.Residencial = Backbone.Model.extend({
});

Models.Residenciales = Backbone.Collection.extend({
    model: Models.Residencial,
    read: function(resp){
        resp.query = 'CALL Get_Residenciales()';
    }
});

Models.Causal = Backbone.Model.extend({
});

Models.Causales = Backbone.Collection.extend({
    model: Models.Causal,
    read: function(resp){
        resp.query = 'CALL Get_Causales()';
    }
});

module.exports = Models;