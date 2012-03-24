var Backbone = require('backbone');
var _ = require('underscore');

var client = require('../db');
var utils = require('../utils');

//Backbone Modification
Backbone.Model.prototype.fetch = function(options){
    options || (options = {});
    var model = this;
    var success = options.success;
    options.success = function(results, fields) {
        if(_.isArray(results)) {
            if (!model.set(model.parse(results[0]), options)) return false;
        }
        else {
            if (!model.set(model.parse(results), options)) return false;
        }
        if (success) success(model, fields);
    };
    
    options.error = utils.wrapError(options.error, model, options);
    return (this.sync || Backbone.sync).call(this, 'read', this, options);
};

Backbone.Model.prototype.procedure = Backbone.Collection.prototype.procedure = function(method){
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
        if(_.isArray(results)) {
            if (!model.set(model.parse(results[0]), options)) return false;
        }
        else {
            if (!model.set(model.parse(results), options)) return false;
        }        
        if (success) success(model, fields);
    };
    
    options.error = utils.wrapError(options.error, model, options);
    var method = this.isNew() ? 'create' : 'update';
    return (this.sync || Backbone.sync).call(this, method, this, options);
};

Backbone.Model.prototype.toDatatableColumns = function(){
    var dt = { aoColumns : [] };
    
    dt.aoColumns = _.map(this.toJSON(), function(attribute, key){
        return {sTitle: key};
    });
    
    return dt;
};

Backbone.Model.prototype.toDatatableArray = function(){
    var fields = [ 'residencial', 'edificio', 'apartamento', 'casoRecibido', 'seleccionado', 'causal', 'deudaTotal', 'incumplimiento', 'caso', 'presentacion', 'observaciones' ];
    
    // var data = _.select(this.toJSON(), function(attribute,key){
    //     return fields.indexOf(key) !== -1;
    // });
    
    var data = this.toJSON();
        
    _.each(data, function(attribute, key){
       if(attribute === null){
           data[key] = "";
       }
       
       if(_.isDate(attribute)){
           if(isNaN( attribute.getTime() )){
               data[key] = "";
           }
           else{
               data[key] = utils.dateToString(attribute);
           }
       }
             
       return  attribute;
    });
    
    return data;
};

Backbone.Collection.prototype.toDatatableColumns = function(){
    return this.at(0).toDatatableColumns();
};

Backbone.Collection.prototype.toDatatableArray = function(){
    
    _.each(this.models, function(model, key, models){
        models[key] = model.toDatatableArray();
    });
            
    return this.models;
};

Backbone.sync = function(method, model, options) {
    var procedure;
    
    if(!options.query){
        procedure = model.procedure(method);
    }
    else{
        procedure = {
            query: options.query,
            args: options.args
        };
    }
            
    client.query(procedure.query, procedure.args, function(err, results, fields){        
        if(err) {
            console.log(err);
            options.error(err);
        }        
        else{
            options.success(results, fields);
        }
    });
};

module.exports = Backbone;