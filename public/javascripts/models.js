    var Models = {};
    
    Models.Caso = Backbone.Model.extend({
        urlRoot: '/casos'
    });
    
    Models.Casos = Backbone.Collection.extend({
        model: Models.Caso,
        url: '/casos',
        constLanzamiento: 26,
        search: function(query, options){
            options.data = query;
            
            options.url = '/search/casos';
            this.fetch(options);
        },
        saveBulk: function(ids, args, options){
            var oldSuccess = options.success;

            options.success = _.bind(function(){
                //Make changes to models so they reflect on objects
                var idsArray = ids.split(',');

                _.each(idsArray, _.bind(function(id, index){
                    var model = this.get(id);

                    _.each(args, function(arg, value){
                        model.set(value, arg);
                    });
                }, this));

                oldSuccess();
            }, this);

            var url = "/casos/" + ids;

            $.ajax({
                type: "PUT",
                url: url,
                data: args,
                success: options.success,
                error: options.error
            });
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
                return (!_.isEmpty(model.get('primeraComparecencia')));
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
        filterSentencia: function(){
            return this.chain()
            .select(function(model){
                return (model.get('desistido') === 1 || model.get('haLugar') === 1);
            })
            .map(function(model){
                return model.toJSON();
            })
            .value();
        },
        filterHaLugar: function(){
            var lanzamiento = this.constLanzamiento;
            var ms2days = (1000 * 60 * 60 * 24);

            return this.chain()
            .select(function(model){
                return (
                        model.get('haLugar') === 1 && 
                        !_.isEmpty(model.get('sentencia')) &&  
                        ((new Date(model.get('sentencia')) - new Date())/ms2days) < lanzamiento
                    );
            })
            .map(function(model){
                return model.toJSON();
            })
            .value();
        },
        filterLanzamiento: function(){
            return this.chain()
            .select(function(model){
                return (
                        model.get('haLugar') === 1 && 
                        !_.isEmpty(model.get('sentencia')) &&  
                        ((new Date(model.get('sentencia')) - new Date())/ms2days) >= lanzamiento
                    );
            })
            .map(function(model){
                return model.toJSON();
            })
            .value();
        },
        filterCompletado: function(){
            return this.chain()
            .select(function(model){
                return (model.get('completado') === 1);
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