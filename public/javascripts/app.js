(function($) {
    
    
    
    
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
            },

            render: function() {
                $(this.el).html(this.template());
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
                $('li.active').removeClass('active');
                $('li.home').addClass('active');
                
                this.containerHomeView = new ContainerHomeView();
                this.formAddView = new FormAddView();
                
                $('#content').empty();
                $('#content').append(this.containerHomeView.render().el);
                $('#content .container').append(this.formAddView.render().el);
            },
            
            table: function(){
                $('li.active').removeClass('active');
                $('li.tables').addClass('active');
                
                this.containerTablesView = new ContainerTablesView();
                
                $('#content').empty();
                $('#content').append(this.containerTablesView.render().el);
                
            	$('#table_id').dataTable();
            }
        });

        // Kick off the application
        window.App = new Housing();
        Backbone.history.start();
    });

})(jQuery);