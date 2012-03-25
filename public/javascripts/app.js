$(document).ready(function(){
    window.JurisOpus = Backbone.Router.extend({
        routes: {
            '': 'entrar',
            'entrar': 'entrar',
            'buscar': 'buscar',
            'editar/:caseId': 'editar',
            'demandas/:listName': 'demandas',
            'informes': 'informes'
        },
        initialize: function() {
            this.pageView = new PageView();
            this.pageView.render();
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
            if(listName === 'seleccionar'){
                this.containerDemandasSeleccionarView = new ContainerDemandasSeleccionarView();
                $('#content').empty();
                $('#content').append(this.containerDemandasSeleccionarView.render().el);
            }
            else if(listName === 'actualizar'){
                this.containerDemandasActualizarView = new ContainerDemandasActualizarView();
                $('#content').empty();
                $('#content').append(this.containerDemandasActualizarView.render().el);
            }
        },
        informes: function(){
            this.containerInformesView = new ContainerInformesView();
            $('#content').empty();
            $('#content').append(this.containerInformesView.render().el); 
        }
    });

    // Kick off the application
    window.App = new JurisOpus();
    Backbone.history.start();
});