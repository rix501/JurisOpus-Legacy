var _ = require('underscore');
var Backbone = require('backbone');

var pdfFactory = require('./pdf/PDFFactory');
var client = require('./db');
var queries = require('./queries');

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
    
    options.error = Backbone.utils.wrapError(options.error, model, options);
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
    
    options.error = Backbone.utils.wrapError(options.error, model, options);
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
               data[key] = Backbone.utils.dateToString(attribute);
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

Backbone.utils = {};

Backbone.utils.wrapError = function(onError, model, options) {
    return function(resp) {
        if (onError) {
            onError(model, resp, options);
        } else {
            model.trigger('error', model, resp, options);
        }
    };
};

Backbone.utils.dateToString = function(dateObj, formatString){
    var monthNames = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    
    if(formatString){
        return dateObj.getDate() + " de " + monthNames[dateObj.getMonth()] + " de " +dateObj.getFullYear(); 
    }
    
    return (
        dateObj.getFullYear() + "-" 
        + ( (dateObj.getMonth() + 1).toString().length === 1 ? '0' + (dateObj.getMonth() + 1).toString() : dateObj.getMonth() + 1) + "-"
        + ( (dateObj.getDate() + 1).toString().length === 1 ? '0' + (dateObj.getDate() + 1).toString() : dateObj.getDate() + 1)
    ); 
};

//My models
var Models = {};

Models.Caso = Backbone.Model.extend({
    create: function(resp){
        _.extend(resp,queries.createCaso(
            this.get('residencial'),
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
            this.get('observaciones'))
        );
    },
    upd: function(resp){
        _.extend(resp,queries.updateCaso(
                this.id,
                this.get('residencial'),
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
                this.get('observaciones'),
                this.get('rediligenciar'),
                this.get('ejecutar')
            )
        );
    },
    read: function(resp){
        _.extend(resp,queries.getCaso(this.id));
    },
    parse: function(results){
        _.each(results, function(attribute, key){
            if(_.isDate(attribute)){
                if(isNaN( attribute.getTime() )){
                    results[key] = "";
                }
                else{
                    results[key] = Backbone.utils.dateToString(attribute);
                }
            }
        });
        
        return results;
    },
    pdf: function(){
        var resSuccess = options.success;
        
        options.success = function(model, fields){                 
            var data = model.toJSON();

            var demandaPdf = pdfFactory('SanJuan', 'OcupacionIlegal', data);
            
            if(resSuccess) resSuccess(demandaPdf); 
        };
        
        options.query = 'CALL Search_Casos_PDF(?)';
        options.args = ["^(" + query.casos + ")$"];

        this.fetch(options);
    }
});

Models.Casos = Backbone.Collection.extend({
    model: Models.Caso,
    read: function(resp){
        if(this.seleccionado){
            _.extend(resp,queries.getCasosSeleccion());
        }
        else{
             _.extend(resp,queries.getCasos());
        }            
    },
    search: function(query, options){
        //caso > residencial+apt+edificio > nombre
        if(!_.isEmpty(query.caso)){
            var q = queries.getSearchCasosCaso(query.caso);
            options.query = q.query;
            options.args = q.args;
        }
        else if(!_.isEmpty(query.residencial) && !_.isEmpty(query.edificio) && !_.isEmpty(query.apartamento)){
            var q = queries.getSearchCasosAptEdifResi(query.apartamento, query.edificio, query.residencial);
            options.query = q.query;
            options.args = q.args;
        }
        else if(!_.isEmpty(query.nombre)){
            var q = queries.getSearchCasosNombre(query.nombre);
            options.query = q.query;
            options.args = q.args;
        }
        else{
            options.error('Need info to look');
            return;
        }  
        this.fetch(options);
    },
    bulkEdit: function(query, options){        
        var q = queries.updateBulk(query.ids, query.data.sala, query.data.fecha, query.data.hora);
        options.query = q.query;
        options.args = q.args;
                
        (this.sync || Backbone.sync).call(this, 'update', null, options);
    },
    pdf: function(query, options){
        if(query.type === "demandas")
            this.pdfDemanda(query, options);
        
        if(query.type === "informes")
            this.pdfInforme(query, options);
        
    },
    pdfInforme: function(query, options){
        var resSuccess = options.success;
        
        options.success = function(collection, fields){
            
            var data = {};
            
            data.pdfTemplate = query.pdfTemplate;
            
            var pdf = pdfFactory(query.type, data);
            
            if(resSuccess) resSuccess(pdf); 
        };
        
        options.success();
        // this.fetch(options);
    },
    pdfDemanda: function(query, options){
        var resSuccess = options.success;
        
        options.success = function(collection, fields){    
            
            collection.each(function(model){
               var tribunal = model.get('tribunal').replace(/ /g, "").toLowerCase();
               var causal = model.get('causal').replace(/ /g, "").replace(/-/g, "").toLowerCase();
               
               model.set({
                   pdfTemplate: causal,
                   pdfTribunal: tribunal 
               });
               
               _.each(model.attributes, function(attribute, key){
                   var attr = {};
                   attr[key] = "";
                   
                   if(_.isDate(attribute) && !isNaN(attribute.getTime()) ){
                       attr[key] = Backbone.utils.dateToString(attribute, true);
                       model.set(attr);
                   }  
               })           
            });
                         
            var data = collection.toJSON();
            
            var pdf = pdfFactory(query.type, data);
            
            if(resSuccess) resSuccess(pdf); 
        };
        
        // options.query = 'CALL Search_Casos_PDF(?)';
        // options.args = ["^(" + query.casos + ")$"];

        this.fetch(queries.getCasosPdf(query.casos));
    }
});

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

module.exports = Models;