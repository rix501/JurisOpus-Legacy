var Models = {};

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
    saveModal: function(ids, args, options){
        //Remove blank args
        var realArgs = {};
        _.each(args, function(value, arg){
            if(_.isString(value) && _.isEmpty(value)){
                //Do nothing
            }
            else{
                realArgs[arg] = value;
            }
        });
        args = realArgs;

        if(ids.indexOf(',') === -1){
            this.get(ids).save(args, options);
        }
        else{
            this.saveBulk(ids, args, options);
        }
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
            return (model.get('completado') == 0 && _.isEmpty(model.get('presentacion')) || model.get('presentacion') == '00-00-0000');
        })
        .map(function(model){
            return model.toJSON();
        })
        .value();                        
    },
    filterSalaHoraDia: function(){
        return this.chain()
        .select(function(model){
            return (
                model.get('completado') == 0 && 
                _.isEmpty(model.get('sala')) && 
                !_.isEmpty(model.get('presentacion')) && 
                model.get('presentacion') !== '00-00-0000'
            );
        })
        .map(function(model){
            return model.toJSON();
        })
        .value();
    },
    filterInfoPrimeraVista: function(date){
        return this.chain()
        .select(function(model){
            return ( 
                model.get('completado') == 0 && 
                !_.isEmpty(model.get('primeraComparecencia')) && 
                model.get('primeraComparecencia') !== '00-00-0000' && 
                model.get('desistido') != 1 && 
                model.get('haLugar') != 1 && 
                model.get('rebeldia') != 1
            );
        })
        .map(function(model){
            return model.toJSON();
        })
        .value();
    },
    filterSentencia: function(){
        return this.chain()
        .select(function(model){
            return (
                model.get('completado') == 0 &&
                model.get('desistido') == 0 &&
                (model.get('haLugar') == 1 || model.get('rebeldia') == 1 ) &&
                ( _.isEmpty(model.get('sentencia')) || model.get('sentencia')  == '00-00-0000' )
            );
        })
        .map(function(model){
            return model.toJSON();
        })
        .value();
    },
    filterHaLugar: function(){
        var lanzamiento = 26;
        var ms2days = (1000 * 60 * 60 * 24);

        return this.chain()
        .select(function(model){
            return (
                    model.get('completado') == 0 &&
                    (model.get('haLugar') == 1 || model.get('rebeldia') == 1 ) && 
                    !_.isEmpty(model.get('sentencia')) &&  
                    model.get('sentencia')  !== '00-00-0000' &&
                    ((new Date() - (new Date(model.get('sentencia').replace(/-/gi,'/'))))/ms2days) < lanzamiento
                );
        })
        .map(function(model){
            return model.toJSON();
        })
        .value();
    },
    filterLanzamiento: function(){
        var lanzamiento = 26;
        var ms2days = (1000 * 60 * 60 * 24);

        return this.chain()
        .select(function(model){
            return (
                    model.get('completado') == 0 &&
                    (model.get('haLugar') == 1 || model.get('rebeldia') == 1 ) && 
                    !_.isEmpty(model.get('sentencia')) &&  
                    model.get('sentencia')  !== '00-00-0000' &&
                    ((new Date() - (new Date(model.get('sentencia').replace(/-/gi,'/'))))/ms2days) >= lanzamiento
                );
        })
        .map(function(model){
            return model.toJSON();
        })
        .value();
    },
    filterCompletado: function(marked){
        return this.chain()
        .select(function(model){
            if(marked){
                return (model.get('completado') == 1);
            }

            return (model.get('completado') == 0);
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
        .select(function(model){
            return ((_.isEmpty(model.get('presentacion')) || model.get('presentacion') == '00-00-0000'));
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
    url: '/residenciales',
    comparator: function(residencial){
        return residencial.get('residencial');
    }
});

Models.Causal = Backbone.Model.extend({
});

Models.Causales = Backbone.Collection.extend({
    model: Models.Causal,
    url: '/causales',
    comparator: function(causal){
        return causal.get('causal');
    }
});