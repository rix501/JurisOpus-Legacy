(function($) {
    //Models and Collections  
    var Models = {};
    
    Models.Caso = Backbone.Model.extend({
        urlRoot: '/casos'
    });
    
    Models.Casos = Backbone.Collection.extend({
        model: Models.Caso,
        
        url: '/casos',
        
        search: function(query, options){
            this.url = '/test';
            
            this.fetch(options);
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
        
        window.ContainerView = Backbone.View.extend({
            tagName: 'div',
            className: 'container',
            render: function() {
                $(this.el).html(this.template());
                
                return this;
            }
        });
        
        window.ContainerMainFormView = ContainerView.extend({
            events: {
                'submit':'submitForm'
            },
            
            render: function(){
                $(this.el).html(this.template());
                
                var datepickers = $(this.el).find(".datepicker");
                
                _.forEach(datepickers, function(datepicker){
                    $(datepicker).datepicker({
                        beforeShow: function(input) {
                            var field = $(input);
                            var left = field.position().left;
                            var top = field.position().top + 28;
                            setTimeout(function(){
                                $('#ui-datepicker-div').css({'top': top +'px', 'left': left + 'px'});      
                            },1);                    
                        },
                        dateFormat: 'yy-mm-dd'
                    });
                });
                          
                return this;
            }
        });
        
        window.ContainerEntrarView = ContainerMainFormView.extend({
            template: _.template($("#container-entrar-template").html()),
            initialize: function() {
                _.bindAll(this, 'render');
                $('li.active').removeClass('active');
                $('li.entrar').addClass('active');
                
                this.loadResidenciales();
                this.loadCausales();
            },
            
            loadResidenciales: function(){
                var residenciales = new Models.Residenciales();
                   
                residenciales.fetch({
                    success: function(collection){
                        collection.each(function(model){
                            var elOptNew = document.createElement('option');
                            elOptNew.text = model.get('residencial');
                            elOptNew.value = model.get('id');
                            var elSel = document.getElementById('residencial');

                            try {
                              elSel.add(elOptNew, null); // standards compliant; doesn't work in IE
                            }
                            catch(ex) {
                              elSel.add(elOptNew); // IE only
                            } 
                        });
                    },
                    error:function(err){
                        console.log(err);
                    }
                });
            },
            
            loadCausales: function(){
                var causales = new Models.Causales();
                
                causales.fetch({
                    success: function(collection){
                        collection.each(function(model){
                            var elOptNew = document.createElement('option');
                            elOptNew.text = model.get('causal');
                            elOptNew.value = model.get('id');
                            var elSel = document.getElementById('causal');

                            try {
                              elSel.add(elOptNew, null); // standards compliant; doesn't work in IE
                            }
                            catch(ex) {
                              elSel.add(elOptNew); // IE only
                            } 
                        });
                    }
                });
            },
            
            submitForm: function(event){
                event.preventDefault();
                
                var caso = new Models.Caso();
            
                caso.save({
                    residencial: $('#residencial').val(),
                    edificio: $('#edificio').val(),
                    apartamento: $('#apartamento').val(),
                    area: $('#area').val(),
                    nombre: $('#nombre').val(),
                    casoRecibido: $('#casoRecibido').val(),
                    seleccionado: $('#seleccionado:checked').length,
                    completado: $('#completado:checked').length,
                    causal: $('#causal').val(),
                    rentaMensual: $('#rentaMensual').val(),
                    mesesAdeudados: $('#mesesAdeudados').val(),
                    deudaRenta: $('#deudaRenta').val(),
                    deudaRentaNegativa: $('#deudaRentaNegativa').val(),
                    deudaRecibida: $('#deudaRecibida').val(),
                    deudaTotal: $('#deudaTotal').val(),
                    ultimoReexamen: $('#ultimoReexamen').val(),
                    incumplimiento: $('#incumplimiento').val(),
                    caso: $('#caso').val(),
                    presentacion: $('#presentacion').val(),
                    diligenciado: $('#diligenciado:checked').length,
                    diligenciadoEn: $('#diligenciadoEn').val(),
                    sala: $('#sala').val(),
                    hora: $('#hora').val(),
                    primeraComparecencia: $('#primeraComparecencia').val(),
                    segundaComparecencia: $('#segundaComparecencia').val(),
                    vistaSegundo: $('#vistaSegundo').val(),
                    sentencia: $('#sentencia').val(),
                    lanzamiento: $('#lanzamiento').val(),
                    observaciones: $('#observaciones').val()
                },{
                    success: function(model){
                        alert('kthxbie');
                    },
                    error: function(){
                        alert('Oops, something didnt work');
                    }
                });
                
                return false;
            }
        });

        window.ContainerBuscarView = ContainerView.extend({
            events: {
                'submit':'submitForm'
            },
            
            template:  _.template($("#container-buscar-template").html()),
            
            initialize: function() {
                _.bindAll(this, 'render');
                $('li.active').removeClass('active');
                $('li.buscar').addClass('active');
            },
            
            submitForm: function(event){
                event.preventDefault();
                
                var resultCasos = new Models.Casos();
                
                resultCasos.search(query, {
                    success:function(){
                    
                    },
                    error: function(){
                    
                    }
                });
                
                return false;
            }
        });
        
        window.ContainerEditarView = ContainerMainFormView.extend({
            template: _.template($("#container-editar-template").html()),
            initialize: function() {
                _.bindAll(this, 'render');
                $('li.active').removeClass('active');
                $('li.entrar').addClass('active');
                
                this.model.bind('change', this.render);
                
                this.model = new Models.Caso({id: this.options.casoId});
                
                this.model.fetch();
            },
            
            submitForm: function(event){
                event.preventDefault();
                
                return false;
            }
        });
        
        window.ContainerDemandasView = ContainerView.extend({
            template:  _.template($("#container-demandas-template").html()),
           
            events: {
                'click .redirect':'redirect'  
            },
           
           redirect: function(event){
                  location.href = '/pdf/SanJuan/'+event.target.id;
            },
           
           initialize: function() {
                _.bindAll(this, 'render');
                $('li.active').removeClass('active');
                $('li.demandas').addClass('active');
            }
        });
        
        window.ContainerDemandasTablesView = ContainerDemandasView.extend({
            events: {
                'click .back.btn':'goBack'  
            },
            
            initialize: function(){
                this.template = _.template($("#demandas-tables-template").html());
                ContainerDemandasView.prototype.initialize.call(this);
            },
            
            goBack: function(){
                App.navigate('/demandas' ,true);
            },
            
            render: function(){
                $(this.el).html(this.template());
                
                var oTable = $(this.el).children('#table_id').dataTable( {
                    "sScrollX": "100%",
                    "sScrollXInner": "1300px",
                    "bScrollCollapse": true,
                    "bProcessing": true,
                    "sAjaxSource": '/casos/true'
                });

                return this;
            }
        });
        
        window.ContainerInformesView = ContainerView.extend({
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
        
        
        window.ContainerInformesView = ContainerView.extend({
            template:  _.template($("#container-informes-template").html()),
           
            events: {
                'click .redirect':'redirect'  
            },
           
           redirect: function(event){
                  location.href = '/test/'+event.target.id;
            },
           
           initialize: function() {
                _.bindAll(this, 'render');
                $('li.active').removeClass('active');
                $('li.informes').addClass('active');
            }
        });
        
        window.ContainerActualizarView = ContainerView.extend({
            template:  _.template($("#container-actualizar-template").html()),
           
            events: {
                'click .redirect':'redirect'  
            },
           
           redirect: function(event){
                  App.navigate('/actualizar/'+event.target.id ,true);
            },
           
           initialize: function() {
                _.bindAll(this, 'render');
                $('li.active').removeClass('active');
                $('li.actualizar').addClass('active');
            }
        });
        
        window.ContainerResolucionView = ContainerView.extend({
            template:  _.template($("#container-resolucion-template").html()),
           
            events: {
                'click .redirect':'redirect'  
            },
           
           redirect: function(event){
                  App.navigate('/resolucion/'+event.target.id ,true);
            },
           
           initialize: function() {
                _.bindAll(this, 'render');
                $('li.active').removeClass('active');
                $('li.resolucion').addClass('active');
            }
        });
        
        //Super => Backbone.Model.prototype.set.call(this, attributes, options);
        
        window.JurisOpus = Backbone.Router.extend({
            routes: {
                '': 'entrar',
                '/': 'entrar',
                '/entrar': 'entrar',
                '/buscar': 'buscar',
                '/editar/:caseId': 'editar',
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
            
            editar: function(casoId){
                this.containerEditaView = new ContainerEditarView({
                    casoId: casoId
                });
                $('#content').empty();
                $('#content').append(this.containerEditaView.render().el);
            },
            
            demandas: function(listName){    
                this.containerTablesView = new ContainerDemandasTablesView();
                $('#content').empty();
                $('#content').append(this.containerTablesView.render().el);
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
        window.App = new JurisOpus();
        Backbone.history.start();
        
    });

})(jQuery);