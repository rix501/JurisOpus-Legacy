(function($) {
    
    //Models and Collections go here
    
    
    //Views and Router
    $(document).ready(function(){
        window.PageView = Backbone.View.extend({
            template: _.template($("#page-template").html()),
            el: 'body',

            initialize: function() {
                _.bindAll(this, 'render');
            },

            render: function() {
                $(this.el).html(this.template());
                return this;
            }
        });
        
        window.ContainerMainFormView = Backbone.View.extend({
            tagName: 'div',
            className: 'container',
            
            events: {
                'click .add-on :checkbox' : 'togglePreCheck'
            },
            
            togglePreCheck: function(){
                if ($('.add-on :checkbox').attr('checked')) {
                    $('.add-on :checkbox').parents('.add-on').addClass('active');
                } else {
                    $('.add-on :checkbox').parents('.add-on').removeClass('active');
                }
            },

            render: function() {
                $(this.el).html(this.template());
                
                return this;
            }
        });
        
        window.ContainerEntrarView = ContainerMainFormView.extend({
           template: _.template($("#container-entrar-template").html()),
           initialize: function() {
                _.bindAll(this, 'render');
                $('li.active').removeClass('active');
                $('li.entrar').addClass('active');
            }
        });

        window.ContainerBuscarView = ContainerMainFormView.extend({
           template:  _.template($("#container-buscar-template").html()),
           initialize: function() {
                _.bindAll(this, 'render');
                $('li.active').removeClass('active');
                $('li.buscar').addClass('active');
            }
        });
        
        window.ContainerDemandasView = ContainerMainFormView.extend({
           template:  _.template($("#container-demandas-template").html()),
           
            events: {
                'click .redirect':'redirect'  
            },
           
           redirect: function(event){
                  App.navigate('/demandas/'+event.target.id ,true);
            },
           
           initialize: function() {
                _.bindAll(this, 'render');
                $('li.active').removeClass('active');
                $('li.demandas').addClass('active');
            }
        });
        
        window.ContainerDemandasTablesView = ContainerDemandasView.extend({
            initialize: function(){
                this.template = _.template($("#demandas-" + this.options.listName+  "-tables-template").html());
                ContainerDemandasView.prototype.initialize.call(this);
            },
            
            render: function(){
                $(this.el).html(this.template());
                
                $(this.el).children('#table_id').dataTable();
                
                return this;
            }
        });
        
        window.ContainerInformesView = ContainerMainFormView.extend({
           template:  _.template($("#container-informes-template").html()),
           
            events: {
                'click .redirect':'redirect'  
            },
           
           redirect: function(event){
                  App.navigate('/informes/'+event.target.id ,true);
            },
           
           initialize: function() {
                _.bindAll(this, 'render');
                $('li.active').removeClass('active');
                $('li.informes').addClass('active');
            }
        });
        
        
                window.ContainerInformesView = ContainerMainFormView.extend({
           template:  _.template($("#container-informes-template").html()),
           
            events: {
                'click .redirect':'redirect'  
            },
           
           redirect: function(event){
                  App.navigate('/informes/'+event.target.id ,true);
            },
           
           initialize: function() {
                _.bindAll(this, 'render');
                $('li.active').removeClass('active');
                $('li.informes').addClass('active');
            }
        });
        
        window.ContainerActualizarView = ContainerMainFormView.extend({
           template:  _.template($("#container-actualizar-template").html()),
           
            events: {
                'click .redirect':'redirect'  
            },
           
           redirect: function(event){
                  App.navigate('/informes/'+event.target.id ,true);
            },
           
           initialize: function() {
                _.bindAll(this, 'render');
                $('li.active').removeClass('active');
                $('li.actualizar').addClass('active');
            }
        });
        
        window.ContainerResolucionView = ContainerMainFormView.extend({
           template:  _.template($("#container-resolucion-template").html()),
           
            events: {
                'click .redirect':'redirect'  
            },
           
           redirect: function(event){
                  App.navigate('/informes/'+event.target.id ,true);
            },
           
           initialize: function() {
                _.bindAll(this, 'render');
                $('li.active').removeClass('active');
                $('li.resolucion').addClass('active');
            }
        });
        
        //Super => Backbone.Model.prototype.set.call(this, attributes, options);
        
        window.Housing = Backbone.Router.extend({
            routes: {
                '': 'entrar',
                '/': 'entrar',
                '/buscar': 'buscar',
                '/demandas': 'demandas',
                '/demandas/:listName': 'demandas',
                '/informes': 'informes',
                '/actualizar': 'actualizar',
                '/resolucion': 'resolucion'
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
            
            demandas: function(listName){    
                if(listName){
                    this.containerTablesView = new ContainerDemandasTablesView({
                        listName:listName
                    });
                    $('#content').empty();
                    $('#content').append(this.containerTablesView.render().el);
                }
                else{
                    this.containerDemandasView = new ContainerDemandasView();
                    $('#content').empty();
                    $('#content').append(this.containerDemandasView.render().el);  
                }
            },
            
            informes: function(){
                this.containerInformesView = new ContainerInformesView();
                $('#content').empty();
                $('#content').append(this.containerInformesView.render().el); 
            },
            
            actualizar: function(){
                this.containerActualizarView = new ContainerActualizarView();
                $('#content').empty();
                $('#content').append(this.containerActualizarView.render().el);                 
            },
            
            resolucion: function(){
                this.containerResolucionView = new ContainerResolucionView();
                $('#content').empty();
                $('#content').append(this.containerResolucionView.render().el);                 
            }
            
        });

        // Kick off the application
        window.App = new Housing();
        Backbone.history.start();
        
    });

})(jQuery);