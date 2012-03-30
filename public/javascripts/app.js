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
            'informes': 'informes'
        },
        initialize: function() {
            this.pageView = new PageView();
            this.pageView.render();

            this.residenciales = new Models.Residenciales();;
            this.causales = new Models.Causales();
            this.casos = new Models.Casos();

            this.residenciales.fetch({
                success: function(){
                    dispatcher.trigger('loaded:residenciales');
                },
                error:function(err){
                    dispatcher.trigger('error:residenciales');
                    console.log(err);
                }
            });

            this.causales.fetch({
                success: function(){
                    dispatcher.trigger('loaded:causales');
                },
                error:function(err){
                    dispatcher.trigger('error:causales');
                    console.log(err);
                }
            });

            this.casos.fetch({
                success: function(){
                    dispatcher.trigger('loaded:casos');
                },
                error:function(err){
                    dispatcher.trigger('error:casos');
                    console.log(err);
                }
            });

            this.currentView = null;
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
            else if(listName === 'actualizar'){
                this.containerDemandasActualizarView = new ContainerDemandasActualizarView();
                $('#content').empty();
                $('#content').append(this.containerDemandasActualizarView.render().el);
                this.addedToDOM('demandas');
                this.addedToDOM('demandas-actualizar'); 
            }
        },
        informes: function(){
            this.containerInformesView = new ContainerInformesView();
            $('#content').empty();
            $('#content').append(this.containerInformesView.render().el); 
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