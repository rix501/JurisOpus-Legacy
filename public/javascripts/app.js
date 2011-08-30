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
        
        window.ContainerHomeView = Backbone.View.extend({
            template: _.template($("#container-home-template").html()),
            tagName: 'div',
            className: 'container',

            initialize: function() {
                _.bindAll(this, 'render');
                $('li.active').removeClass('active');
                $('li.home').addClass('active');
            },

            render: function() {
                $(this.el).html(this.template());
                
                var formAddView = new FormAddView();
                
                $(this.el).append(formAddView.render().el);
                
                return this;
            }
        });
        
        window.FormAddView = Backbone.View.extend({
            template: _.template($("#form-add-template").html()),
            tagName: 'form',

            initialize: function() {
                _.bindAll(this, 'render');
            },

            render: function() {
                $(this.el).html(this.template());
                return this;
            }
        });
        
        window.FormRemoveView = Backbone.View.extend({
            template: _.template($("#form-remove-template").html()),
            tagName: 'form',

            initialize: function() {
                _.bindAll(this, 'render');
            },

            render: function() {
                $(this.el).html(this.template());
                return this;
            }
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
                '': 'home',
                '/': 'home',
                '/tables': 'table'
            },

            initialize: function() {
                this.pageView = new PageView();
                this.pageView.render();
            },

            home: function() {
                this.containerHomeView = new ContainerHomeView();
                $('#content').empty();
                $('#content').append(this.containerHomeView.render().el);
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