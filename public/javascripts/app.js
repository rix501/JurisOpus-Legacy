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
        
        window.ContainerEntrarView = Backbone.View.extend({
            template: _.template($("#container-entrar-template").html()),
            tagName: 'div',
            className: 'container',
            
            events: {
                'click .add-on :checkbox' : 'togglePreCheck'
            },

            initialize: function() {
                _.bindAll(this, 'render');
                $('li.active').removeClass('active');
                $('li.entrar').addClass('active');
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
        
        window.ContainerBuscarView = ContainerEntrarView.extend({
           template:  _.template($("#container-buscar-template").html()),
           initialize: function() {
                _.bindAll(this, 'render');
                $('li.active').removeClass('active');
                $('li.buscar').addClass('active');
            },
        });
                
        window.ContainerTablesView = Backbone.View.extend({
            template: _.template($("#container-tables-template").html()),
            tagName: 'div',
            className: 'container',

            initialize: function() {
                _.bindAll(this, 'render');
                $('li.active').removeClass('active');
                $('li.tables').addClass('active');
            },

            render: function() {
                $(this.el).html(this.template());
                
                $(this.el).children('#table_id').dataTable();
                
                return this;
            }
        });
        
        window.Housing = Backbone.Router.extend({
            routes: {
                '': 'entrar',
                '/': 'entrar',
                '/buscar': 'buscar',
                '/demandas': 'table',
                '/informes': 'table',
                '/actualizar': 'table',
                '/resolucion': 'table'
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
            
            table: function(){                
                this.containerTablesView = new ContainerTablesView();
                $('#content').empty();
                $('#content').append(this.containerTablesView.render().el);
            }
        });

        // Kick off the application
        window.App = new Housing();
        Backbone.history.start();
        
    });

})(jQuery);