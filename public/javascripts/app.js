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
            options.data = query;
            
            options.url = '/search/casos';
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
            
            getSpinner: function(){
                var opts = { 
                    lines: 12, 
                    length: 2, 
                    width: 2, 
                    radius: 4, 
                    color: '#000', 
                    speed: 1, 
                    trail: 42, 
                    shadow: false
                };
                
                return new Spinner(opts);
            },
            
            successMessage: function(msg){
                $infoMsg = $('#info-msg');
                
                $('#info-msg p').html(msg);
                
                if($infoMsg.hasClass('error')) 
                    $infoMsg.removeClass('error');
                    
                if(!$infoMsg.hasClass('success')) 
                    $infoMsg.addClass('success'); 
                    
                if(!$infoMsg.hasClass('in')) 
                    $infoMsg.addClass('in');      
                                     
				$infoMsg.css('display','block');
                window.setTimeout(function(){
                    $('.alert-message[data-alert] .close').trigger('click');
             	}, 1500);
            },
            
            errorMessage: function(msg){
                $infoMsg = $('.alert-message');
                                        
                $('.alert-message p').html(msg);
                
                if($infoMsg.hasClass('success')) 
                    $infoMsg.removeClass('success');
                    
                if(!$infoMsg.hasClass('error'))
                    $infoMsg.addClass('error');
                
                if(!$infoMsg.hasClass('in')) 
                    $infoMsg.addClass('in');
                
				$infoMsg.css('display','block');
                
				window.setTimeout(function(){
                    $('.alert-message[data-alert] .close').trigger('click');
				}, 3000);
            },
            
            render: function() {
                $(this.el).html(this.template());
                
                return this;
            }
        });
        
        window.ContainerMainFormView = ContainerView.extend({
            events: {
                'submit':'submitForm'
            },
            
            loadResidenciales: function(){
                var that = this;
                
                var residenciales = new Models.Residenciales();
                
                var residencialSpinner = this.getSpinner();
                residencialSpinner.spin($(this.el).find('.residenciales .spinner')[0]);
                
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
                        that.trigger('loaded:residenciales');
                        residencialSpinner.stop();
                    },
                    error:function(err){
                        // console.log(err);
                        residencialSpinner.stop();
                    }
                });
            },
            
            loadCausales: function(){
                var that = this;
                
                var causales = new Models.Causales();
                
                var causalesSpinner = this.getSpinner();
                causalesSpinner.spin($(this.el).find('.causales .spinner')[0]);
                
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
                        causalesSpinner.stop();
                        that.trigger('loaded:causales');
                    },
                    error: function(){
                        causalesSpinner.stop();
                    }
                });
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
                   
                this.loadResidenciales();
                this.loadCausales();   
                                       
                return this;
            }
        });
        
        window.ContainerEntrarView = ContainerMainFormView.extend({
            template: _.template($("#container-entrar-template").html()),
            initialize: function() {
                _.bindAll(this, 'render', 'submitForm' ,'successMessage', 'errorMessage');
                $('li.active').removeClass('active');
                $('li.entrar').addClass('active');
            },
                        
            submitForm: function(event){
                event.preventDefault(); 
                                           
                var submitSpinner = this.getSpinner();
                submitSpinner.spin($('.submit-btns .spinner')[0]);
                
                var caso = new Models.Caso();
                var viewObj = this;
            
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
                        viewObj.successMessage('Caso guardado');
                        submitSpinner.stop();
                    },
                    error: function(){
                        viewObj.errorMessage('<strong>Error:</strong> Hubo un error guardando');
                        submitSpinner.stop();
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
            
            loadResidenciales: function(){
                var residenciales = new Models.Residenciales();
            
                var residencialSpinner = this.getSpinner();
                residencialSpinner.spin($(this.el).find('.residenciales .spinner')[0]);
            
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
                    
                        residencialSpinner.stop();
                    },
                    error:function(err){
                        // console.log(err);
                        residencialSpinner.stop();
                    }
                });
            },
        
            initialize: function() {
                _.bindAll(this, 'render', 'selectRow', 'edit');
                $('li.active').removeClass('active');
                $('li.buscar').addClass('active');  
            },
        
            selectRow: function(event){
                $('.edit.btn').removeClass('disabled');
                $(this.oTable.fnSettings().aoData).each(function (){
                    $(this.nTr).removeClass('row_selected');
                });
                $(event.target.parentNode).addClass('row_selected');
            },
            
            edit: function(){
                if($('.results.btn').hasClass('disabled'))
                    return false;
                    
                var aTrs = this.oTable.fnGetNodes();
                var selectedRow;
                
                _.each(aTrs, function(attribute){
                    if($(attribute).hasClass('row_selected'))
                        selectedRow = attribute;
                });
            
                if(selectedRow){
                    this.collection.each(function(model){
                        if(model.get('caso') === $(selectedRow).children('.caso').text()){
                            $('#results-modal').modal('hide');
                            App.navigate('/editar/' + model.id ,true);
                        }
                    });
                }    
            },
        
            submitForm: function(event){
                event.preventDefault();
            
                var resultCasos = new Models.Casos();
            
                var viewObj = this;
            
                var query = {
                    residencial: $('#residencial').val(),
                    edificio: $('#edificio').val(),
                    apartamento: $('#apartamento').val(),
                    nombre: $('#nombre').val(),
                    caso: $('#caso').val()
                };
            
                var submitSpinner = this.getSpinner();
                submitSpinner.spin($('.submit-btns .spinner')[0]);
            
                resultCasos.search(query, {
                    success:function(collection, resp){
                        if(collection.length === 1){
                            App.navigate('/editar/' + collection.at(0).id ,true);
                        }
                        else{
                            viewObj.collection = collection;
                            
                            submitSpinner.stop();
                        
                            $('#results').show();
                            $('.results.btn').show();
                        
                            viewObj.oTable = $('#results').dataTable({
                                "bDestroy": true,
                                "sDom": 'tp',                      
                                "aoColumns": [                         
                                    { 
                                        "mDataProp": "apartamento",
                                        "sTitle":"Apartamento" 
                                    },
                                    { 
                                        "mDataProp": "area",
                                        "sTitle":"Area" 
                                    },
                                    {
                                        "mDataProp": "caso",
                                        "sTitle":"Caso",
                                        "sClass":"caso"
                                        },
                                    {   
                                        "mDataProp": "causal",
                                        "sTitle":"Causal" 
                                    },
                                    { 
                                        "mDataProp": "edificio",
                                        "sTitle":"Edificio" 
                                    } 
                                ],
                                "aaData":collection.toJSON()
                            });
                            
                            $(viewObj.oTable).find('tbody').click(viewObj.selectRow);
                            
                            $('#results-modal').removeClass('hide');
                            
                            if(!$('#results-modal').hasClass('in'))
                                $('#results-modal').addClass('in');
                            
                            $('#results-modal').modal('show');
                        }    
                    },
                    error: function(collection, resp){
                        submitSpinner.stop();
                        viewObj.errorMessage('<strong>No hubo resultados</strong>');
                    }
                });
                
                return false;
            },
            
            render: function(){
                var that = window.ContainerView.prototype.render.call(this);
                
                this.loadResidenciales();
                
                var modal = $(this.el).find('#results-modal');
                
                modal.modal({
                    backdrop: true,
                    keyboard: true,
                    show: false
                });
                
                $(modal).find('.secondary').click(function(e){
                    $(modal).modal('hide');
                });
                
                $(modal).find('.edit').click(this.edit);
                
                return that;
            }
        });
        
        window.ContainerEditarView = ContainerMainFormView.extend({
            template: _.template($("#container-editar-template").html()),
            initialize: function() {
                _.bindAll(this, 'render', 'submitForm' ,'fillForm', 'error', 'fillResidenciales', 'fillCausales');
                $('li.active').removeClass('active');
                $('li.buscar').addClass('active');
                
                this.model = new Models.Caso({id: this.options.casoId});
                this.model.bind('change', this.fillForm);
                this.model.bind('error', this.error);
                this.model.fetch();                         
            },
            
            error: function(err){
                this.errorMessage('Error buscando caso')
            },
            
            fillResidenciales: function(){
                var model = this.model;
                
                if(this.model.get('residencial')){
                    $('#residencial option').each(function(index, element){
                        if($(element).text() === model.get('residencial')){
                            $('#residencial').val(index + 1);
                        }
                    });
                }
            },
            
            fillCausales: function(){
                var model = this.model;
                
                if(this.model.get('causal')){
                    $('#causal option').each(function(index, element){
                        if($(element).text() === model.get('causal')){
                            $('#causal').val(index + 1);
                        }
                    });
                }
            },
            
            fillForm: function(){
                if($('#residencial option').length === 0){
                    this.bind('loaded:residenciales', this.fillResidenciales);
                }
                else{
                    this.fillResidenciales();
                }
                
                if($('#causal option').length === 0){
                    this.bind('loaded:causales', this.fillCausales);
                }
                else{
                    this.fillCausales();
                }
                
                $('#edificio').val(this.model.get('edificio') ? this.model.get('edificio') : '');
                $('#apartamento').val(this.model.get('apartamento') ? this.model.get('apartamento') : '');
                $('#area').val(this.model.get('area') ? this.model.get('area') : '');
                $('#nombre').val(this.model.get('nombre') ? this.model.get('nombre') : '');
                $('#casoRecibido').val(this.model.get('casoRecibido') ? this.model.get('casoRecibido') : '');
                if(this.model.get('seleccionado')) $('#seleccionado').prop("checked", true);
                if(this.model.get('completado')) $('#completado').prop("checked", true);
                $('#rentaMensual').val(this.model.get('rentaMensual') ? this.model.get('rentaMensual') : '');
                $('#mesesAdeudados').val(this.model.get('mesesAdeudados') ? this.model.get('mesesAdeudados') : '');
                $('#deudaRenta').val(this.model.get('deudaRenta') ? this.model.get('deudaRenta') : '');
                $('#deudaRentaNegativa').val(this.model.get('deudaRentaNegativa') ? this.model.get('deudaRentaNegativa') : '');
                $('#deudaRecibida').val(this.model.get('deudaRecibida') ? this.model.get('deudaRecibida') : '');
                $('#deudaTotal').val(this.model.get('deudaTotal') ? this.model.get('deudaTotal') : '');
                $('#ultimoReexamen').val(this.model.get('ultimoReexamen') ? this.model.get('ultimoReexamen') : '');
                $('#incumplimiento').val(this.model.get('incumplimiento') ? this.model.get('incumplimiento') : '');
                $('#caso').val(this.model.get('caso') ? this.model.get('caso') : '');
                $('#presentacion').val(this.model.get('presentacion') ? this.model.get('presentacion') : '');
                if(this.model.get('diligenciado')) $('#diligenciado').prop("checked", true);                
                $('#diligenciadoEn').val(this.model.get('diligenciadoEn') ? this.model.get('diligenciadoEn') : '');
                $('#sala').val(this.model.get('sala') ? this.model.get('sala') : '');
                $('#hora').val(this.model.get('hora') ? this.model.get('hora') : '');
                $('#primeraComparecencia').val(this.model.get('primeraComparecencia') ? this.model.get('primeraComparecencia') : '');
                $('#segundaComparecencia').val(this.model.get('segundaComparecencia') ? this.model.get('segundaComparecencia') : '');
                $('#vistaSegundo').val(this.model.get('vistaSegundo') ? this.model.get('vistaSegundo') : '');
                $('#sentencia').val(this.model.get('sentencia') ? this.model.get('sentencia') : '');
                $('#lanzamiento').val(this.model.get('lanzamiento') ? this.model.get('lanzamiento') : '');
                $('#observaciones').val(this.model.get('observaciones') ? this.model.get('observaciones') : ''); 
                if(this.model.get('rediligenciar')) $('#rediligenciar').prop("checked", true);
                if(this.model.get('ejecutar')) $('#ejecutar').prop("checked", true);
            },
            
            submitForm: function(event){
                event.preventDefault();
                
                var viewObj = this;
                
                this.model.save({
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
                    observaciones: $('#observaciones').val(),
                    rediligenciar: $('#rediligenciar:checked').length,
                    ejecutar: $('#ejecutar:checked').length
                },{
                    success: function(model){
                        viewObj.successMessage('Caso editado y guardado');
                    },
                    error: function(model,err){
                        viewObj.errorMessage('<strong>Error:</strong> Intente de guardar otra vez');
                    }
                });
                
                return false;
            }
        });
        
        window.ContainerDemandasView = ContainerView.extend({
            template: _.template($("#container-demandas-template").html()),
            
            events: {
                'click .print':'print',
                'click #table_id tr': 'selectRow'
            },
            
            initialize: function(){
                _.bindAll(this, 'render', 'selectRow');
                $('li.active').removeClass('active');
                $('li.demandas').addClass('active');
            },
            
            selectRow: function(event){
                if ( $(event.currentTarget).hasClass('row_selected') ){
                    $(event.currentTarget).removeClass('row_selected');   
                }
                else{
                    $(event.currentTarget).addClass('row_selected');
                }
            },
            
            print: function(){
                var casosString = "";
                var aTrs = this.oTable.fnGetNodes();

                _.each(aTrs, function(aTr){
                    if($(aTr).hasClass('row_selected')){
                        tdCase = $(aTr).children('td')[8];
                        casosString += $(tdCase).text() + "|";
                    }
                });
                
                casosString = casosString.substring(0, casosString.length - 1);
                
                var iframe = document.createElement("iframe");
                iframe.src = "/pdf?type=demandas&casos=" + casosString;
                                
                iframe.style.display = "none";
                document.body.appendChild(iframe);
            },
            
            render: function(){
                $(this.el).html(this.template());
                
                this.oTable = $(this.el).children('#table_id').dataTable( {
                    "sScrollX": "100%",
                    "sScrollXInner": "1300px",
                    "bScrollCollapse": true,
                    "bProcessing": true,
                    "sAjaxSource": '/casos-datatable'
                });
                
                $(this.el).find('#table_id_filter').after('<button class="print btn">Imprimir</button>');

                return this;
            }
        });
        
        window.ContainerInformesView = ContainerView.extend({
            template:  _.template($("#container-informes-template").html()),

            events: {
                'click .print':'print',
                'click .mod' : 'modal',
                'click .redirect':'redirect'
            },

            redirect: function(event){
                  App.navigate('/informes/'+event.target.id ,true);
            },

            initialize: function() {
                _.bindAll(this, 'render');
                $('li.active').removeClass('active');
                $('li.informes').addClass('active');
            },
            
            modal: function(){
                $('#my-modal').modal('show');
            },
            
            print: function(event){
                
                var informesString = "";
                
                var isModal = false;
                var modal = null;
                
                var classList = $(event.target).attr('class');
                
                var template = $.trim(classList.replace(/print/i,'').replace(/primary/i,'').replace(/btn/i,''));
                
                var url = "/pdf?type=informes&pdfTemplate=" + template;         
                
                //It's a modal
                if(event.target.parentNode.className.search(/modal/i) >= 0  ){
                    isModal = true;
                    modal = $(event.target.parentNode.parentNode);
                    
                    var args = "";
                    
                    modal.find('input').each(function(i, elem){
                        args += $(elem).val() + ",";
                    });
                    
                    args = args.substring(0, args.length - 1);
                    
                    //Input values go here
                    url += "&args=" + args; 
                }
                                
                var iframe = document.createElement("iframe");
                
                iframe.src = url;
                                
                iframe.style.display = "none";
                document.body.appendChild(iframe);
                
                if(isModal){
                    modal.modal('hide');
                }
            },
            
            render: function(){
                $(this.el).html(this.template());
                
                var modal = $(this.el).find('#my-modal');
                
                modal.modal({
                    backdrop: true,
                    keyboard: true,
                    show: false
                });
                
                $(modal).find('.secondary').click(function(e){
                    $(modal).modal('hide');
                });
                
                $(modal).find('.print').click(this.print);
                
                var datepickers = $(this.el).find(".datepicker");
                
                _.forEach(datepickers, function(datepicker){
                    $(datepicker).datepicker({
                        beforeShow: function(input) {
                            var field = $(input);
                            var left = field.position().left + 382;
                            var top = field.position().top + 142;
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
        
        window.ContainerActualizarView = ContainerView.extend({
            template:  _.template($("#container-actualizar-template").html()),
            initialize: function() {
            _.bindAll(this, 'render');
                $('li.active').removeClass('active');
                $('li.actualizar').addClass('active');
            }
        });
        
        window.ContainerResolucionView = ContainerView.extend({
            template:  _.template($("#container-resolucion-template").html()),
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
                '/resolucion': 'resolucion',
                '/login':'login' 
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
                this.containerDemandasView = new ContainerDemandasView();
                $('#content').empty();
                $('#content').append(this.containerDemandasView.render().el);
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