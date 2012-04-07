var _ = require('underscore');

var client = require('../db');
var queries = require('../queries');
var utils = require('../utils');
var pdfFactory = require('../pdf/PDFFactory');

module.exports = function(Backbone, Models) {

    Models.Caso = Backbone.Model.extend({
        create: function(resp){
            _.extend(resp,queries.createCaso(
                //this.get('residencial'),
                this.get('residencialId'),
                this.get('edificio'),
                this.get('apartamento'),
                this.get('area'),
                this.get('nombre'),
                this.get('casoRecibido'),
                this.get('seleccionado'),
                this.get('completado'),
                //this.get('causal'),
                this.get('causalId'),
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
                    this.get('residencialId'),
                    this.get('edificio'),
                    this.get('apartamento'),
                    this.get('area'),
                    this.get('nombre'),
                    this.get('casoRecibido'),
                    this.get('seleccionado'),
                    this.get('completado'),
                    this.get('causalId'),
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
            _.each(results, function(result, key){
                if(_.isDate(result)){
                    if(isNaN( result.getTime() )){
                        results[key] = "";
                    }
                    else{
                        results[key] = utils.dateToString(result);
                    }
                }
                if(key === 'insertId' && result != 0){
                    results['id'] = result;
                    delete results['insertId'];
                }
                if(_.isFunction(result) || key === 'affectedRows' || key === 'serverStatus' || key === 'warningCount' || key === 'message'){
                    delete results[key];
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
            var q = null;
            
            if(!_.isEmpty(query.caso)){
                q = queries.getSearchCasosCaso(query.caso);
                options.query = q.query;
                options.args = q.args;
            }
            else if(!_.isEmpty(query.residencial) && !_.isEmpty(query.edificio) && !_.isEmpty(query.apartamento)){
                q = queries.getSearchCasosAptEdifResi(query.apartamento, query.edificio, query.residencial);
                options.query = q.query;
                options.args = q.args;
            }
            else if(!_.isEmpty(query.nombre)){
                q = queries.getSearchCasosNombre(query.nombre);
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
            var resError = options.error;
            
            options.success = function(collection, fields){            
                collection.each(function(model){
                   _.each(model.attributes, function(attribute, key){
                       var attr = {};
                       attr[key] = "";
                       
                       if(_.isDate(attribute) && !isNaN(attribute.getTime()) ){
                           attr[key] = utils.dateToString(attribute, false);
                           model.set(attr);
                       }

                       if(_.isString(attribute) && _.isEmpty(attribute)){
                           attr[key] = '-';
                           model.set(attr);
                       }
                       
                   });           
                });
                
                var data = collection.toJSON();
                
                if(data.length === 0){
                    if(resError) resError('no cases found'); 
                    
                    return;
                }
                
                var pdf = pdfFactory(query.type, query.pdfTemplate, data, resSuccess);
                
                //if(resSuccess) resSuccess(pdf); 
            };
            
            var q;
                    
            switch(query.pdfTemplate){
                case 'informedevistas':
                    q = queries.getCasosInformeDeVistas(query.args);
                    break;
                case 'informeparadiligenciar':
                    q = queries.getCasosInformeParaDiligenciar(query.args);
                    break;
                case 'informependientedeejecucion':
                    q = queries.getCasosInformePendienteDeEjecucion();
                    break;
                case 'informepresentados':
                    q = queries.getCasosInformePresentados();
                    break;
                case 'informefacturacion':
                    q = queries.getCasosInformeFacturacion();
                    break;
                default:
                    break;
            }
             
            options.query = q.query; 
            options.args = q.args;

            this.fetch(options);
            //options.success();
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
                           attr[key] = utils.dateToString(attribute, true);
                           model.set(attr);
                       }  
                   });           
                });
                             
                var data = collection.toJSON();
                
                var pdf = pdfFactory(query.type, '', data, resSuccess);
            };
           
    	    var q = queries.getCasosPdf(query.casos); 
            options.query = q.query; 
            options.args = q.args;

            this.fetch(options);
        }
    });
};