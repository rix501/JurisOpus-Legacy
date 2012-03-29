    var Models = {};

    Backbone.Model.prototype.toDatatableArray = function(){
        var fields = [ 'residencial', 'edificio', 'apartamento', 'casoRecibido', 'seleccionado', 'causal', 'deudaTotal', 'incumplimiento', 'caso', 'presentacion', 'observaciones' ];
        
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

    Backbone.Collection.prototype.toDatatableArray = function(){  
        _.each(this.models, function(model, key, models){
            models[key] = model.toDatatableArray();
        });
                
        return this.models;
    };
    
    Models.Caso = Backbone.Model.extend({
        urlRoot: '/casos'
    });
    
    Models.Casos = Backbone.Collection.extend({
        model: Models.Caso,
        url: '/casos',
        search: function(query, options){
            options.data = query;
            
            options.url = '/search/casos';
            this.fetch(options);
        },
        markComplete: function(query, options){
            options.data = query;
            
            options.url = '/search/casos';
            this.fetch(options);
        },
        filterFechaPresentacion: function(){
            return this.chain()
            .select(function(model){
                return (_.isEmpty(model.get('presentacion')) && model.get('seleccionado') === 1);
            })
            .map(function(model){
                return model.toJSON();
            })
            .value();                        
        },
        filterSalaHoraDia: function(){
            return this.chain()
            .select(function(model){
                return (_.isEmpty(model.get('sala')) && !_.isEmpty(model.get('presentacion')));
            })
            .map(function(model){
                return model.toJSON();
            })
            .value();
        },
        filterInfoPrimeraVista: function(date){
            return this.chain()
            .select(function(model){
                return (model.get('primeraComparecencia') === date);
            })
            .map(function(model){
                return model.toJSON();
            })
            .value();
        },
        filterRediligenciar: function(){
            return this.chain()
            .select(function(model){
                return (model.get('rediligenciar') === 1);
            })
            .map(function(model){
                return model.toJSON();
            })
            .value();
        },
        filterCausal: function(iniciales){
            iniciales = iniciales.toLowerCase();

            return this.chain()
            .select(function(model){
                return (model.get('causalIniciales').toLowerCase() === iniciales);
            })
            .map(function(model){
                return model.toJSON();
            })
            .value();
        }
    });
    
    Models.Residencial = Backbone.Model.extend({
    });

    Models.Residenciales = Backbone.Collection.extend({
        model: Models.Residencial,
        url: '/residenciales'
    });

    Models.Causal = Backbone.Model.extend({
    });

    Models.Causales = Backbone.Collection.extend({
        model: Models.Causal,
        url: '/causales'
    });