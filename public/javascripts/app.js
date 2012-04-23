$(document).ready(function(){

    window.dispatcher = object = {};
    _.extend(object, Backbone.Events);

    window.JurisOpus = Backbone.Router.extend({
        routes: {
            '': 'entrar',
            'entrar': 'entrar',
            'buscar': 'buscar',
            'editar/:caseId': 'editar',
            'demandas': 'demandas',
            'demandas/:listName': 'demandas',
            'informes': 'informes',
            'informes/:informeName': 'informes'
        },
        initialize: function() {
            this.pageView = new PageView();
            this.pageView.render();

            this.residenciales = new Models.Residenciales();;
            this.causales = new Models.Causales();
            this.casos = new Models.Casos();

            $('#loading-modal').modal({
                keyboard: false,
                backdrop: 'static',
                show: true
            });

            var that = this;

            this.residenciales.fetch({
                success: function(){
                    dispatcher.trigger('loaded:residenciales');
                    that.loaded();
                },
                error:function(err){
                    dispatcher.trigger('error:residenciales');
                    console.log(err);
                }
            });

            this.causales.fetch({
                success: function(){
                    dispatcher.trigger('loaded:causales');
                    that.loaded();
                },
                error:function(err){
                    dispatcher.trigger('error:causales');
                    console.log(err);
                }
            });

            this.casos.fetch({
                success: function(){
                    dispatcher.trigger('loaded:casos');
                    that.loaded();
                },
                error:function(err){
                    dispatcher.trigger('error:casos');
                    console.log(err);
                }
            });

            this.currentView = null;
        },
        loadedCount: 0,
        loaded: function(){
            this.loadedCount++;
            if(this.loadedCount == 3){
                $('#loading-modal').modal('hide');
            }
        },
        entrar: function() {
            this.containerEntrarView = new ContainerEntrarView();
            $('#content').empty();
            $('#content').append(this.containerEntrarView.render().el);    
        },
        buscar: function() {
            this.containerBuscarView = new ContainerBuscarView();
            $('#content').empty();
            $('#content').append(this.containerBuscarView.render().el);
        },
        editar: function(casoId){
            this.containerEditarView = new ContainerEditarView({
                casoId: casoId
            });
            $('#content').empty();
            $('#content').append(this.containerEditarView.render().el);
        },
        demandas: function(listName){
            if(!listName){
                this.containerDemandasView = new ContainerDemandasView();
                $('#content').empty();
                $('#content').append(this.containerDemandasView.render().el);
            }
            else if(listName === 'seleccionar'){
                this.containerDemandasSeleccionarView = new ContainerDemandasSeleccionarView();
                $('#content').empty();
                $('#content').append(this.containerDemandasSeleccionarView.render().el);
                this.addedToDOM('demandas');
                this.addedToDOM('demandas-seleccionar'); 
            }
            else if(listName === 'actualizar-fechapresentacion'){
                this.containerDemandasActualizarFechaPresentacionView = new ContainerDemandasActualizarFechaPresentacionView();
                $('#content').empty();
                $('#content').append(this.containerDemandasActualizarFechaPresentacionView.render().el);
                this.addedToDOM('demandas');
                this.addedToDOM('demandas-actualizar'); 
            }
            else if(listName === 'actualizar-salahoracomparecencia'){
                this.containerDemandasActualizarSalaHoraComparecenciaView = new ContainerDemandasActualizarSalaHoraComparecenciaView();
                $('#content').empty();
                $('#content').append(this.containerDemandasActualizarSalaHoraComparecenciaView.render().el);
                this.addedToDOM('demandas');
                this.addedToDOM('demandas-actualizar'); 
            }
            else if(listName === 'actualizar-informacionvista'){
                this.containerDemandasActualizarInformacionVistaView = new ContainerDemandasActualizarInformacionVistaView();
                $('#content').empty();
                $('#content').append(this.containerDemandasActualizarInformacionVistaView.render().el);
                this.addedToDOM('demandas');
                this.addedToDOM('demandas-actualizar'); 
            }
            else if(listName === 'actualizar-fechasentencia'){
                this.containerDemandasActualizarFechaSentenciaView = new ContainerDemandasActualizarFechaSentenciaView();
                $('#content').empty();
                $('#content').append(this.containerDemandasActualizarFechaSentenciaView.render().el);
                this.addedToDOM('demandas');
                this.addedToDOM('demandas-actualizar'); 
            }
            else if(listName === 'actualizar-sentenciahalugar'){
                this.containerDemandasActualizarSentenciaHaLugarView = new ContainerDemandasActualizarSentenciaHaLugarView();
                $('#content').empty();
                $('#content').append(this.containerDemandasActualizarSentenciaHaLugarView.render().el);
                this.addedToDOM('demandas');
                this.addedToDOM('demandas-actualizar'); 
            }
            else if(listName === 'actualizar-lanzamiento'){
                this.containerDemandasActualizarLanzamientoView = new ContainerDemandasActualizarLanzamientoView();
                $('#content').empty();
                $('#content').append(this.containerDemandasActualizarLanzamientoView.render().el);
                this.addedToDOM('demandas');
                this.addedToDOM('demandas-actualizar'); 
            }
            else if(listName === 'actualizar-completado'){
                this.containerDemandasActualizarCompletadoView = new ContainerDemandasActualizarCompletadoView();
                $('#content').empty();
                $('#content').append(this.containerDemandasActualizarCompletadoView.render().el);
                this.addedToDOM('demandas');
                this.addedToDOM('demandas-actualizar'); 
            }
            else if(listName === 'actualizar-todos'){
                this.containerDemandasActualizarTodosView = new ContainerDemandasActualizarTodosView();
                $('#content').empty();
                $('#content').append(this.containerDemandasActualizarTodosView.render().el);
                this.addedToDOM('demandas');
                this.addedToDOM('demandas-actualizar'); 
            }
        },
        informes: function(informeName){
            if(!informeName){
                this.containerInformesView = new ContainerInformesView();
                $('#content').empty();
                $('#content').append(this.containerInformesView.render().el); 
            }
            else {
                this.containerInformesFormView = new ContainerInformesFormView();
                $('#content').empty();
                $('#content').append(this.containerInformesFormView.render().el); 
            }
        },
        addedToDOM: function(view){
            _.defer(function(){
                dispatcher.trigger('render:' + view)
            });
        }
    });

    // Kick off the application
    window.App = new JurisOpus();
    Backbone.history.start();
});