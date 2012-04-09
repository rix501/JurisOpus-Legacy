//Views and Router
$(document).ready(function(){

    function SetDatepickers(datepickers, leftCoordinate, topCoordinate){
        _.forEach(datepickers, function(datepicker){
            $(datepicker).datepicker({
                beforeShow: function(input) {
                    var field = $(input);
                    var left = field.offset().left + leftCoordinate;
                    var top = field.offset().top + topCoordinate;
                    setTimeout(function(){
                        $('#ui-datepicker-div').css({'top': top +'px', 'left': left + 'px'});      
                    },1);                    
                },
                dateFormat: 'mm-dd-yy'
            });
        });
    };

    window.PageView = Backbone.View.extend({
        template: _.template($("#page-template").html()),
        el: 'body',
        initialize: function() {
            _.bindAll(this, 'render');
        },
        render: function() {
            this.$el.html(this.template());
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
            
            $('.alert span').html(msg);
            
            if($infoMsg.hasClass('alert-error')) 
                $infoMsg.removeClass('alert-error');
                
            if(!$infoMsg.hasClass('alert-success')) 
                $infoMsg.addClass('alert-success'); 
                
            if(!$infoMsg.hasClass('in')) 
                $infoMsg.addClass('in');      
                                 
            $infoMsg.css('display','block');
            window.setTimeout(function(){
                $('.alert .close').trigger('click'); 
            }, 1500);
        },
        errorMessage: function(msg){
            $infoMsg = $('.alert');
                                    
            $('.alert span').html(msg);
            
            if($infoMsg.hasClass('alert-success')) 
                $infoMsg.removeClass('alert-success');
                
            if(!$infoMsg.hasClass('alert-error'))
                $infoMsg.addClass('alert-error');
            
            if(!$infoMsg.hasClass('in')) 
                $infoMsg.addClass('in');
            
            $infoMsg.css('display','block');
            
            window.setTimeout(function(){
               $('.alert .close').trigger('click');
            }, 3000);
        },
        render: function() {
            this.$el.html(this.template());
            
            return this;
        }
    });
    
    window.ContainerMainFormView = ContainerView.extend({
        events: {
            'submit':'submitForm'
        },
        template: _.template($("#container-form-template").html()),
        loadResidenciales: function(){
            this.residencialSpinner = this.getSpinner();
            if(App.residenciales.length == 0){
                this.residencialSpinner.spin(this.$el.find('.residencial.spinner')[0]);
                dispatcher.on('loaded:residenciales', _.bind(this.addResidenciales,this));
            }
            else{
                this.addResidenciales();
            }           
        },
        addResidenciales: function(){
            dispatcher.off('loaded:residenciales');

            var that = this;
            App.residenciales.each(function(model){
                var elOptNew = document.createElement('option');
                elOptNew.text = model.get('residencial');
                elOptNew.value = model.get('id');
                var elSel = that.$el.find('#residencial')[0];

                try {
                  elSel.add(elOptNew, null); // standards compliant; doesn't work in IE
                }
                catch(ex) {
                  elSel.add(elOptNew); // IE only
                } 
            });
            this.residencialSpinner.stop();
            dispatcher.trigger('added:residenciales');
        },
        loadCausales: function(){
            this.causalesSpinner = this.getSpinner();
            if(App.causales.length == 0){
                this.causalesSpinner.spin(this.$el.find('.causal.spinner')[0]);
                dispatcher.on('loaded:causales', _.bind(this.addCausales,this));
            }
            else{
                this.addCausales();
            }    
        },
        addCausales: function(){
            dispatcher.off('loaded:causales');

            var that = this;
            App.causales.each(function(model){
                var elOptNew = document.createElement('option');
                elOptNew.text = model.get('causal');
                elOptNew.value = model.get('id');
                var elSel = that.$el.find('#causal')[0];

                try {
                  elSel.add(elOptNew, null); // standards compliant; doesn't work in IE
                }
                catch(ex) {
                  elSel.add(elOptNew); // IE only
                } 
            });
            this.causalesSpinner.stop();
            dispatcher.trigger('added:causales');
        },
        render: function(){
            this.$el.html(this.template({isEdit: this.isEdit}));
            
            var datepickers = this.$el.find(".datepicker");
            
            SetDatepickers(datepickers, 0, 28);
               
            this.loadResidenciales();
            this.loadCausales();   
                                   
            return this;
        }
    });
    
    window.ContainerEntrarView = ContainerMainFormView.extend({
        initialize: function() {
            _.bindAll(this, 'render', 'submitForm' ,'successMessage', 'errorMessage');
            $('li.active').removeClass('active');
            $('li.entrar').addClass('active');
        },
        isEdit: false,
        submitForm: function(event){
            event.preventDefault(); 
                                       
            var submitSpinner = this.getSpinner();
            submitSpinner.spin($('.submit-btns .spinner')[0]);
            
            var viewObj = this;
        
            App.casos.create({
                residencial: App.residenciales.get($('#residencial').val()).get('residencial'),
                residencialId: $('#residencial').val(),
                edificio: $('#edificio').val(),
                apartamento: $('#apartamento').val(),
                area: $('#area').val(),
                nombre: $('#nombre').val(),
                casoRecibido: $('#casoRecibido').val(),
                seleccionado: $('#seleccionado:checked').length,
                completado: $('#completado:checked').length,
                causal: App.causales.get($('#causal').val()).get('causal'),
                causalId: $('#causal').val(),
                causalIniciales: App.causales.get($('#causal').val()).get('siglas').toLowerCase(),
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
                wait: true,
                success: function(model){
                    $('.main-form')[0].reset();
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
            'click button':'submitForm'
        },
        template:  _.template($("#container-buscar-template").html()),
        loadResidenciales: function(){
            this.residencialSpinner = this.getSpinner();
            if(App.residenciales.length == 0){
                this.residencialSpinner.spin(this.$el.find('.residencial.spinner')[0]);
                dispatcher.on('loaded:residenciales', _.bind(this.addResidenciales,this));
            }
            else{
                this.addResidenciales();
            }           
        },
        addResidenciales: function(){
            dispatcher.off('loaded:residenciales');
            
            //Load blank
            var elOptNew = document.createElement('option');
            elOptNew.text = '';
            elOptNew.value = '';
            var elSel = this.$el.find('#residencial')[0];

            try {
              elSel.add(elOptNew, null); // standards compliant; doesn't work in IE
            }
            catch(ex) {
              elSel.add(elOptNew); // IE only
            } 

            var that = this;
            App.residenciales.each(function(model){
                var elOptNew = document.createElement('option');
                elOptNew.text = model.get('residencial');
                elOptNew.value = model.get('id');
                var elSel = that.$el.find('#residencial')[0];

                try {
                  elSel.add(elOptNew, null); // standards compliant; doesn't work in IE
                }
                catch(ex) {
                  elSel.add(elOptNew); // IE only
                } 
            });
            this.residencialSpinner.stop();
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
            var casoId;

            _.each(aTrs, function(attribute){
                if($(attribute).hasClass('row_selected'))
                    casoId = $(attribute).attr('class').replace(/row_selected/i, '').replace(/odd/i, '').replace(/even/i, '').trim();
            });
        
            if(casoId){
                $('#results-modal').modal('hide');
                App.navigate('/editar/' + casoId ,true);
            }  
        },
        submitForm: function(event){
            event.preventDefault();
        
            var searchType = $(event.currentTarget).attr('id');
            var data = this.search(searchType);

            var submitSpinner = this.getSpinner();
            submitSpinner.spin($('.submit-btns .spinner')[0]);
        
            if(data.length === 1){
                App.navigate('/editar/' + data[0].id ,true);
            }
            else{                           
                submitSpinner.stop();
            
                $('#results').show();
                $('.results.btn').show();
            
                this.oTable = $('#results').dataTable({
                    "bDestroy": true,
                    "sDom": 'tp',
                    "fnRowCallback": this.assignRow,                      
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
                            "sTitle":"Caso"
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
                    "aaData": data
                });
                
                $(this.oTable).find('tbody').click(this.selectRow);
                
                $('#results-modal').removeClass('hide');
                
                if(!$('#results-modal').hasClass('in'))
                    $('#results-modal').addClass('in');
                
                $('#results-modal').modal('show');
            }    
            
            return false;
        },
        search: function(searchType){
            var data = null;

            var namePattern = new RegExp('.*' + $('#nombre').val() + '.*', 'gi');
            var casePattern = new RegExp('.*' + $('#caso').val() + '.*', 'gi');
            var residencialPattern = new RegExp('.*' + $('#residencial option:selected').text() + '.*', 'gi');
            var edificioPattern = new RegExp('.*' + $('#edificio').val() + '.*', 'gi');
            var apartamentoPattern = new RegExp('.*' + $('#apartamento').val() + '.*', 'gi');

            switch(searchType) {
                case 'search-direccion':
                    data = App.casos.select(function(model){
                        return model.get('residencial').match(residencialPattern) && model.get('edificio').match(edificioPattern) && model.get('apartamento').match(apartamentoPattern);
                    }).map(function(model){
                        return model.toJSON();
                    });
                    break;
                case 'search-caso':
                    data = App.casos.select(function(model){
                        return model.get('caso').match(casePattern);
                    }).map(function(model){
                        return model.toJSON();
                    });
                    break;
                case 'search-nombre':
                    data = App.casos.select(function(model){
                        return model.get('nombre').match(namePattern);
                    }).map(function(model){
                        return model.toJSON();
                    });
                    break;
                default:
            }

            return data;
        },
        assignRow: function(nRow, aData, iDisplayIndex, iDisplayIndexFull){
            $(nRow).addClass(aData.id.toString());
        },
        render: function(){
            var that = window.ContainerView.prototype.render.call(this);
            
            this.loadResidenciales();
            
            var modal = this.$el.find('#results-modal');
            
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
        initialize: function() {
            _.bindAll(this, 'render', 'submitForm' ,'fillForm', 'error', 'fillResidenciales', 'fillCausales');
            $('li.active').removeClass('active');
            $('li.buscar').addClass('active');                         
        },
        isEdit: true,
        error: function(err){
            this.errorMessage('Error buscando caso');
        },
        fillResidenciales: function(){
            dispatcher.off('added:residenciales');

            var model = this.model;
            
            if(this.model.get('residencial')){
                this.$el.find('#residencial option').each(_.bind(function(index, element){
                    if($(element).text() === model.get('residencial')){
                        this.$el.find('#residencial').val(index + 1);
                    }
                },this));
            }
        },
        fillCausales: function(){
            dispatcher.off('added:causales');

            var model = this.model;
            
            if(this.model.get('causal')){
                this.$el.find('#causal option').each(_.bind(function(index, element){
                    if($(element).text() === model.get('causal')){
                        this.$el.find('#causal').val(index + 1);
                    }
                },this));
            }
        },
        fillForm: function(){
            if(this.$el.find('#residencial option').length === 0){
                dispatcher.on('added:residenciales', _.bind(this.fillResidenciales,this));
            }
            else{
                this.fillResidenciales();
            }
            
            if(this.$el.find('#causal option').length === 0){
                dispatcher.on('added:causales', _.bind(this.fillCausales,this));
            }
            else{
                this.fillCausales();
            }
            
            this.$el.find('#edificio').val(this.model.get('edificio') ? this.model.get('edificio') : '');
            this.$el.find('#apartamento').val(this.model.get('apartamento') ? this.model.get('apartamento') : '');
            this.$el.find('#area').val(this.model.get('area') ? this.model.get('area') : '');
            this.$el.find('#nombre').val(this.model.get('nombre') ? this.model.get('nombre') : '');
            this.$el.find('#casoRecibido').val(this.model.get('casoRecibido') ? this.model.get('casoRecibido') : '');
            if(this.model.get('seleccionado')) this.$el.find('#seleccionado').prop("checked", true);
            if(this.model.get('completado')) this.$el.find('#completado').prop("checked", true);
            this.$el.find('#rentaMensual').val(this.model.get('rentaMensual') ? this.model.get('rentaMensual') : '');
            this.$el.find('#mesesAdeudados').val(this.model.get('mesesAdeudados') ? this.model.get('mesesAdeudados') : '');
            this.$el.find('#deudaRenta').val(this.model.get('deudaRenta') ? this.model.get('deudaRenta') : '');
            this.$el.find('#deudaRentaNegativa').val(this.model.get('deudaRentaNegativa') ? this.model.get('deudaRentaNegativa') : '');
            this.$el.find('#deudaRecibida').val(this.model.get('deudaRecibida') ? this.model.get('deudaRecibida') : '');
            this.$el.find('#deudaTotal').val(this.model.get('deudaTotal') ? this.model.get('deudaTotal') : '');
            this.$el.find('#ultimoReexamen').val(this.model.get('ultimoReexamen') ? this.model.get('ultimoReexamen') : '');
            this.$el.find('#incumplimiento').val(this.model.get('incumplimiento') ? this.model.get('incumplimiento') : '');
            this.$el.find('#caso').val(this.model.get('caso') ? this.model.get('caso') : '');
            this.$el.find('#presentacion').val(this.model.get('presentacion') ? this.model.get('presentacion') : '');
            if(this.model.get('diligenciado')) this.$el.find('#diligenciado').prop("checked", true);                
            this.$el.find('#diligenciadoEn').val(this.model.get('diligenciadoEn') ? this.model.get('diligenciadoEn') : '');
            this.$el.find('#sala').val(this.model.get('sala') ? this.model.get('sala') : '');
            this.$el.find('#hora').val(this.model.get('hora') ? this.model.get('hora') : '');
            this.$el.find('#primeraComparecencia').val(this.model.get('primeraComparecencia') ? this.model.get('primeraComparecencia') : '');
            this.$el.find('#segundaComparecencia').val(this.model.get('segundaComparecencia') ? this.model.get('segundaComparecencia') : '');
            this.$el.find('#vistaSegundo').val(this.model.get('vistaSegundo') ? this.model.get('vistaSegundo') : '');
            this.$el.find('#sentencia').val(this.model.get('sentencia') ? this.model.get('sentencia') : '');
            this.$el.find('#lanzamiento').val(this.model.get('lanzamiento') ? this.model.get('lanzamiento') : '');
            this.$el.find('#observaciones').val(this.model.get('observaciones') ? this.model.get('observaciones') : ''); 
            if(this.model.get('rediligenciar')) this.$el.find('#rediligenciar').prop("checked", true);
            if(this.model.get('ejecutar')) this.$el.find('#ejecutar').prop("checked", true);
        },
        submitForm: function(event){
            event.preventDefault();
            
            var viewObj = this;
            
            this.model.save({
                residencialId: $('#residencial').val(),
                residencial: App.residenciales.get($('#residencial').val()).get('residencial'),
                edificio: $('#edificio').val(),
                apartamento: $('#apartamento').val(),
                area: $('#area').val(),
                nombre: $('#nombre').val(),
                casoRecibido: $('#casoRecibido').val(),
                seleccionado: $('#seleccionado:checked').length,
                completado: $('#completado:checked').length,
                causalId: $('#causal').val(),
                causal: App.causales.get($('#causal').val()).get('causal'),
                causalId: $('#causal').val(),
                causalIniciales: App.causales.get($('#causal').val()).get('siglas').toLowerCase(),
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
        },
        render: function(){
            ContainerMainFormView.prototype.render.call(this);
            
            if(App.casos.length == 0){
                dispatcher.on('loaded:casos', _.bind(function(){
                    dispatcher.off('loaded:casos');
                    this.model = App.casos.get(this.options.casoId);
                    this.fillForm();
                },this));
            }
            else{
                this.model = App.casos.get(this.options.casoId);
                this.fillForm();
            }
                        
            return this;
        }
    });
    
    window.ContainerDemandasView = ContainerView.extend({
        template: _.template($("#container-demandas-template").html()),
        //add event to collection for when a model is removed       
        initialize: function(){
            _.bindAll(this, 'render');
            $('li.active').removeClass('active');
            $('li.demandas').addClass('active');
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
        modal: function(event){
            var classList = $(event.target).attr('class');
            
            var template = $.trim(classList.replace(/mod/i,'').replace(/btn-primary/i,'').replace(/btn/i,''));

            $('#' + template + '-modal').modal('show');
        },
        print: function(event){ 
            var informesString = "";
            
            var isModal = false;
            var modal = null;
            
            var classList = $(event.target).attr('class');
            
            var template = $.trim(classList.replace(/print/i,'').replace(/btn-primary/i,'').replace(/btn/i,''));
            
            var url = "/pdf?type=informes&pdfTemplate=" + template;         
            
            //It's a modal
            if(event.target.parentNode.className.search(/modal/i) >= 0  ){
                isModal = true;
                modal = this.$el.find('#actualizar-bulk-modal');
                
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
            this.$el.html(this.template());

            var that = this;
            
            this.$el.find('.modal').each(function(i, modal){
                $(modal).modal({
                    backdrop: true,
                    keyboard: true,
                    show: false
                });
                
                $(modal).find('.secondary').click(function(e){
                    $(modal).modal('hide');
                });
                
                $(modal).find('.print').click(that.print);
                
                var datepickers = $(that.el).find(".datepicker");
                SetDatepickers(datepickers, 0, 28);
            });
            
            return this;                
        }
    });

    window.ContainerCasosTableView = ContainerView.extend({
        events: {
            'click .nav li a': 'selectNav'
        },
        selectNav: function(event){
            event.preventDefault();
            $('.nav li.active').removeClass('active');
            
            var liNode = $(event.target).parent('li');
            
            var type = liNode.attr('class');
            
            liNode.addClass('active');

            return type;
        },
        selectRow: function(event){
            if ( $(event.currentTarget).hasClass('row_selected') ){
                $(event.currentTarget).removeClass('row_selected');

                if($('#casos-table .row_selected').length === 0)
                    $('.dataTables_wrapper .action').addClass('disabled');
            }
            else if(!$(event.currentTarget).children('td').hasClass('dataTables_empty')){
                $(event.currentTarget).addClass('row_selected');
                $('.dataTables_wrapper .action').removeClass('disabled');
            }
        },
        deselectRows: function(){
            $('.dataTables_wrapper .action').addClass('disabled');
            $('tr').removeClass('row_selected');
        },
        selectRows: function(){
            if(!$('td').hasClass('dataTables_empty')){
                $('.dataTables_wrapper .action').removeClass('disabled');
                $('tr').addClass('row_selected');
            }
        },
        assignRow: function(nRow, aData, iDisplayIndex, iDisplayIndexFull){
            $(nRow).addClass(aData.id.toString());
        },
        filterTable:function(data){
            if(this.oTable){
                this.oTable.fnClearTable();
                this.oTable.fnAddData(data);
                this.oTable.fnAdjustColumnSizing();
                this.oTable.fnDraw();
            }
        },
        loadTable: function(type, data, options){
            this.oTable = null;

            var opts = {
                "sScrollX": "100%",
                "sScrollXInner": "1300px",
                "bScrollCollapse": true,
                "fnRowCallback": this.assignRow,
                "aoColumns": [                 
                    {   
                        "mDataProp": "nombre",
                        "sTitle":"Nombre" 
                    },
                    {
                        "mDataProp": "residencial",
                        "sTitle":"Residencial"
                    },
                    { 
                        "mDataProp": "edificio",
                        "sTitle":"Edificio" 
                    },
                    { 
                        "mDataProp": "apartamento",
                        "sTitle":"Apartamento" 
                    },
                    { 
                        "mDataProp": "casoRecibido",
                        "sTitle":"Ingresado" 
                    },
                    { 
                        "mDataProp": "presentacion",
                        "sTitle":"Fecha Presentacion" 
                    }
                ],
                "oLanguage": {
                    "sSearch": "Buscar"
                },
                "aaData": data
            };

            opts = _.defaults(options, opts);

            this.oTable = this.$el.find('#casos-table').dataTable(opts);
            
            this.$el.find('#casos-table_wrapper').addClass('active');
            
            this.oTable.fnAdjustColumnSizing();
            this.oTable.fnDraw();
            
            this.$el.find('#casos-table').on('click', 'tr', this.selectRow);
        },
        render: function(){
            this.$el.html(this.template());
  
            this.collection = App.casos;    

            dispatcher.on('render:demandas', _.bind(function(){
                dispatcher.off('render:demandas');

                if(this.collection.length == 0){
                    dispatcher.on('loaded:casos', _.bind(this.loadTable, this));
                }
                else{
                    this.loadTable();
                }
            }, this));

            return this;
        }
    });

    window.ContainerDemandasSeleccionarView = ContainerCasosTableView.extend({
        template: _.template($("#container-demandas-seleccionar-template").html()),
        //add event to collection for when a model is removed       
        initialize: function(){
            _.bindAll(this, 'render', 'selectRow', 'loadTable', 'print');
            $('li.active').removeClass('active');
            $('li.demandas').addClass('active');
        },
        selectNav: function(event){
            var demandaType = ContainerCasosTableView.prototype.selectNav.call(this, event);
            this.filterTable(this.collection.filterCausal(demandaType));
            $('.dataTables_wrapper .action').addClass('disabled');
        },
        print: function(){
            if($('.dataTables_wrapper .action').hasClass('disabled'))
                return;

            var casosString = "";
            
            var liNode = $('.nav-tabs li.active');
            
            var demandaType = liNode.attr('class').replace(/active/i, '').trim();
                            
            var aTrs = this.oTable.fnGetNodes();
            
            _.each(aTrs, function(aTr){
                if($(aTr).hasClass('row_selected')){             
                    var casoId = $(aTr).attr('class').replace(/row_selected/i, '').replace(/odd/i, '').replace(/even/i, '').trim();                                     
                    casosString += casoId + "|";
                }
            });
            
            casosString = casosString.substring(0, casosString.length - 1);
                            
            var iframe = document.createElement("iframe");
            iframe.src = "/pdf?type=demandas&casos=" + casosString;
                            
            iframe.style.display = "none";
            document.body.appendChild(iframe);
        },          
        loadTable: function(collection, reponse){
            var data = this.collection.filterCausal('ic');
            var options = {};
            ContainerCasosTableView.prototype.loadTable.call(this, 'seleccionar', data, options);
                   
            this.$el.find('#casos-table_filter').after('<button class="action btn-primary btn disabled print">Imprimir</button>');
            this.$el.find('#casos-table_filter').after('<button class="btn deselect">Deseleccionar Todos</button>');
            this.$el.find('#casos-table_filter').after('<button class="btn select">Seleccionar Todos</button>');
            this.$el.find('.dataTables_wrapper .action').click(this.print);
            this.$el.find('.dataTables_wrapper .deselect').click(this.deselectRows);
            this.$el.find('.dataTables_wrapper .select').click(this.selectRows);
        },
        render: function(){
            return ContainerCasosTableView.prototype.render.call(this);
        }
    });
    
    window.ContainerDemandasActualizarView = ContainerCasosTableView.extend({
        template:  _.template($("#container-demandas-actualizar-template").html()),
        initialize: function() {
            _.bindAll(this, 'render', 'selectNav', 'selectRow','loadTable', 'modalFilter', 'modalEdit');
            $('li.active').removeClass('active');
            $('li.demandas').addClass('active');
        },
        editRow: function(event){
            if($('.dataTables_wrapper .action').hasClass('disabled'))
                return;
            
            var $selectRow = $('#casos-table .row_selected');
            
            if($selectRow.length === 1){
                $('#actualizar-bulk-modal').removeClass('hide');
                                    
                if(!$('#actualizar-bulk-modal').hasClass('in'))
                    $('#actualizar-bulk-modal').addClass('in');
            
                $('#actualizar-bulk-modal').modal('show'); 
            }
            else{
                $('#actualizar-bulk-modal').removeClass('hide');
                                    
                if(!$('#actualizar-bulk-modal').hasClass('in'))
                    $('#actualizar-bulk-modal').addClass('in');
            
                $('#actualizar-bulk-modal').modal('show');
            }
        },
        selectNav: function(event){
            var filterType = ContainerCasosTableView.prototype.selectNav.call(this, event);
            
            switch(filterType){
                case 'presentacion':
                    this.filterTable(this.collection.filterFechaPresentacion());
                    break;
                case 'salahora':
                    this.filterTable(this.collection.filterSalaHoraDia());
                    break;
                case 'primeravista':
                    $('#actualizar-modal').removeClass('hide');
                                        
                    if(!$('#actualizar-modal').hasClass('in'))
                        $('#actualizar-modal').addClass('in');
                
                    $('#actualizar-modal').modal('show');
                    break;
                case 'rediligenciar':
                    this.filterTable(this.collection.filterRediligenciar());
                    break;
            }
        },
        modalFilter: function(event){
            var liNode = $('.nav-pills li.active');
            
            var filterType = liNode.attr('class').replace(/active/i, "").trim();
            
            var modal = this.$el.find('#actualizar-bulk-modal');
            
            var args = "";
            
            modal.find('input').each(function(i, elem){
                args += $(elem).val() + ",";
            });
            
            args = args.substring(0, args.length - 1);
            
            switch(filterType){
                case 'primeravista':
                    this.filterTable(this.collection.filterInfoPrimeraVista(args));
                    $(modal).modal('hide');
                    break;
                default:
                    $(modal).modal('hide');
                    break;
            }
        },
        modalEdit: function(event){
            var modal = this.$el.find('#actualizar-bulk-modal');
            
            var args;
            
            args = {
                hora: $('#hora').val(),
                sala: $('#sala').val(),
                fecha: $('#fecha').val()
            };
            
            var url = "/casos/";
            
            $("#casos-table .row_selected").each(function(){
                var id = $(this)
                .attr('class')
                .replace(/row_selected/i, '')
                .replace(/odd/i, '')
                .replace(/even/i, '')
                .trim();
                url += id + ",";
            });
            
            url = url.substring(0, url.length - 1);
            
            var submitSpinner = this.getSpinner();
            submitSpinner.spin($('.modal-footer .spinner')[0]);
            
            $.ajax({
                type: "put",
                url: url,
                data: args,
                success: function(data){
                    submitSpinner.stop(); 
                    $(modal).find('.modal-footer .label')
                     .attr('class','label success')
                     .html('Guardado')
                     .show();
                    window.setTimeout(function(){
                        $(modal).modal('hide');
                    }.bind(this), 2000);
                },
                error: function(err){
                    console.log(err);
                    $(modal).find('.modal-footer .label')
                    .attr('class','label important')
                    .html('Hubo error guardando')
                    .show();
                    submitSpinner.stop();
                }
            });
        },
        loadTable: function(collection, resp){
            var data = this.collection.filterFechaPresentacion();
            var options = {};
            ContainerCasosTableView.prototype.loadTable.call(this, 'actualizar', data, options);

            this.$el.find('#casos-table_filter').after('<button class="action btn-primary btn disabled">Editar</button>');
            this.$el.find('#casos-table_filter').after('<button class="btn deselect">Deseleccionar Todos</button>');
            this.$el.find('#casos-table_filter').after('<button class="btn select">Seleccionar Todos</button>');
            this.$el.find('.dataTables_wrapper .action').click(this.editRow);
            this.$el.find('.dataTables_wrapper .deselect').click(this.deselectRows);
            this.$el.find('.dataTables_wrapper .select').click(this.selectRows);
        },
        render: function(){
            ContainerCasosTableView.prototype.render.call(this)
            
            var modalFilter = this.$el.find('#actualizar-modal');
            var modalBulk = this.$el.find('#actualizar-bulk-modal');
            
            modalFilter.modal({
                backdrop: true,
                keyboard: true,
                show: false
            });
            
            modalBulk.modal({
                backdrop: true,
                keyboard: true,
                show: false
            });
            
            $(modalFilter).find('.filter').click(this.modalFilter);
            
            $(modalFilter).find('.secondary').click(function(e){
                $(modalFilter).modal('hide');
            });
            
            $(modalBulk).find('.edit').click(this.modalEdit);
            
            $(modalBulk).find('.secondary').click(function(e){
                $(modalBulk).modal('hide');
            });
            
            $(modalBulk).bind('hidden', function () {
                $(modalBulk).find('.modal-footer .label').hide();
            });
            
            var datepickers = this.$el.find(".datepicker");           
            SetDatepickers(datepickers, 0, 28);
                            
            return this;
        }
    });
    
    window.ContainerDemandasActualizarFechaPresentacionView = ContainerCasosTableView.extend({
        template:  _.template($("#container-demandas-actualizar-fechapresentacion-template").html()),
        initialize: function() {
            _.bindAll(this, 'render', 'selectRow','loadTable', 'modalEdit');
            $('li.active').removeClass('active');
            $('li.demandas').addClass('active');
        },
        editRow: function(event){
            if($('.dataTables_wrapper .action').hasClass('disabled'))
                return;
            
            var $selectRow = $('#casos-table .row_selected');
            
            if($selectRow.length === 1){
                $('#actualizar-bulk-modal').removeClass('hide');
                                    
                if(!$('#actualizar-bulk-modal').hasClass('in'))
                    $('#actualizar-bulk-modal').addClass('in');
            
                $('#actualizar-bulk-modal').modal('show'); 
            }
            else{
                $('#actualizar-bulk-modal').removeClass('hide');
                                    
                if(!$('#actualizar-bulk-modal').hasClass('in'))
                    $('#actualizar-bulk-modal').addClass('in');
            
                $('#actualizar-bulk-modal').modal('show');
            }
        },
        modalEdit: function(event){
            var modal = this.$el.find('#actualizar-bulk-modal');
            
            var args = {
                fechaPresentacion: $('#fecha').val()
            };
            
            var ids = '';
            
            $("#casos-table .row_selected").each(function(){
                var id = $(this)
                .attr('class')
                .replace(/row_selected/i, '')
                .replace(/odd/i, '')
                .replace(/even/i, '')
                .trim();
                ids += id + ",";
            });
            
            ids = ids.substring(0, ids.length - 1);
            
            var submitSpinner = this.getSpinner();
            submitSpinner.spin($('.modal-footer .spinner')[0]);
            
            this.updateBulk(ids, args, {
                success: _.bind(function(data){
                    submitSpinner.stop(); 
                    $(modal).find('.modal-footer .label')
                    .attr('class','label success')
                    .html('Guardado')
                    .show();
                    window.setTimeout(_.bind(function(){
                        $(modal).modal('hide');
                    }, this), 2000);
                }, this),
                error: _.bind(function(err){
                    console.log(err);
                    $(modal).find('.modal-footer .label')
                    .attr('class','label important')
                    .html('Hubo error guardando')
                    .show();
                    submitSpinner.stop();
                }, this)
            });
        },
        filterData: function(){
            return this.collection.filterFechaPresentacion();
        },
        loadTable: function(collection, resp){
            var data = this.filterData();
            var options = {
                "aoColumns": [                 
                    {   
                        "mDataProp": "nombre",
                        "sTitle":"Nombre" 
                    },
                    { 
                        "mDataProp": "causal",
                        "sTitle":"Causal" 
                    },
                    {
                        "mDataProp": "residencial",
                        "sTitle":"Residencial"
                    },
                    { 
                        "mDataProp": "edificio",
                        "sTitle":"Edificio" 
                    },
                    { 
                        "mDataProp": "apartamento",
                        "sTitle":"Apartamento" 
                    },
                    { 
                        "mDataProp": "casoRecibido",
                        "sTitle":"Ingresado" 
                    }
                ]
            };
            ContainerCasosTableView.prototype.loadTable.call(this, 'actualizar', data, options);

            this.$el.find('#casos-table_filter').after('<button class="action btn-primary btn disabled">Editar</button>');
            this.$el.find('#casos-table_filter').after('<button class="btn deselect">Deseleccionar Todos</button>');
            this.$el.find('#casos-table_filter').after('<button class="btn select">Seleccionar Todos</button>');
            this.$el.find('.dataTables_wrapper .action').click(this.editRow);
            this.$el.find('.dataTables_wrapper .deselect').click(this.deselectRows);
            this.$el.find('.dataTables_wrapper .select').click(this.selectRows);
        },
        render: function(){
            ContainerCasosTableView.prototype.render.call(this)
            
            var modalBulk = this.$el.find('#actualizar-bulk-modal');
            
            modalBulk.modal({
                backdrop: true,
                keyboard: true,
                show: false
            });
            
            $(modalBulk).find('.edit').click(this.modalEdit);
            
            $(modalBulk).find('.secondary').click(function(e){
                $(modalBulk).modal('hide');
            });
            
            $(modalBulk).bind('hidden', function () {
                $(modalBulk).find('.modal-footer .label').hide();
            });
            
            var datepickers = this.$el.find(".datepicker");           
            SetDatepickers(datepickers, 0, 28);
                            
            return this;
        }
    });

    window.ContainerDemandasActualizarSalaHoraComparecenciaView = ContainerCasosTableView.extend({
        template:  _.template($("#container-demandas-actualizar-salahoracomparecencia-template").html()),
        initialize: function() {
            _.bindAll(this, 'render', 'selectRow','loadTable', 'modalEdit');
            $('li.active').removeClass('active');
            $('li.demandas').addClass('active');
        },
        editRow: function(event){
            if($('.dataTables_wrapper .action').hasClass('disabled'))
                return;
            
            var $selectRow = $('#casos-table .row_selected');
            
            if($selectRow.length === 1){
                $('#actualizar-bulk-modal').removeClass('hide');
                                    
                if(!$('#actualizar-bulk-modal').hasClass('in'))
                    $('#actualizar-bulk-modal').addClass('in');
            
                $('#actualizar-bulk-modal').modal('show'); 
            }
            else{
                $('#actualizar-bulk-modal').removeClass('hide');
                                    
                if(!$('#actualizar-bulk-modal').hasClass('in'))
                    $('#actualizar-bulk-modal').addClass('in');
            
                $('#actualizar-bulk-modal').modal('show');
            }
        },
        modalEdit: function(event){
            var modal = this.$el.find('#actualizar-bulk-modal');
            
            var args;
            
            args = {
                hora: $('#hora').val(),
                sala: $('#sala').val(),
                fecha: $('#fecha').val()
            };
            
            var url = "/casos/";
            
            $("#casos-table .row_selected").each(function(){
                var id = $(this)
                .attr('class')
                .replace(/row_selected/i, '')
                .replace(/odd/i, '')
                .replace(/even/i, '')
                .trim();
                url += id + ",";
            });
            
            url = url.substring(0, url.length - 1);
            
            var submitSpinner = this.getSpinner();
            submitSpinner.spin($('.modal-footer .spinner')[0]);
            
            $.ajax({
                type: "put",
                url: url,
                data: args,
                success: function(data){
                    submitSpinner.stop(); 
                    $(modal).find('.modal-footer .label')
                     .attr('class','label success')
                     .html('Guardado')
                     .show();
                    window.setTimeout(function(){
                        $(modal).modal('hide');
                    }.bind(this), 2000);
                },
                error: function(err){
                    console.log(err);
                    $(modal).find('.modal-footer .label')
                    .attr('class','label important')
                    .html('Hubo error guardando')
                    .show();
                    submitSpinner.stop();
                }
            });
        },
        filterData: function(){
            return this.collection.filterSalaHoraDia();
        },
        loadTable: function(collection, resp){
            var data = this.filterData();
            var options = {};
            ContainerCasosTableView.prototype.loadTable.call(this, 'actualizar', data, options);

            this.$el.find('#casos-table_filter').after('<button class="action btn-primary btn disabled">Editar</button>');
            this.$el.find('#casos-table_filter').after('<button class="btn deselect">Deseleccionar Todos</button>');
            this.$el.find('#casos-table_filter').after('<button class="btn select">Seleccionar Todos</button>');
            this.$el.find('.dataTables_wrapper .action').click(this.editRow);
            this.$el.find('.dataTables_wrapper .deselect').click(this.deselectRows);
            this.$el.find('.dataTables_wrapper .select').click(this.selectRows);
        },
        render: function(){
            ContainerCasosTableView.prototype.render.call(this)
            
            var modalBulk = this.$el.find('#actualizar-bulk-modal');
            
            modalBulk.modal({
                backdrop: true,
                keyboard: true,
                show: false
            });
            
            $(modalBulk).find('.edit').click(this.modalEdit);
            
            $(modalBulk).find('.secondary').click(function(e){
                $(modalBulk).modal('hide');
            });
            
            $(modalBulk).bind('hidden', function () {
                $(modalBulk).find('.modal-footer .label').hide();
            });
            
            var datepickers = this.$el.find(".datepicker");           
            SetDatepickers(datepickers, 0, 28);
                            
            return this;
        }
    });

    window.ContainerDemandasActualizarInformacionVistaView = ContainerCasosTableView.extend({
        template:  _.template($("#container-demandas-actualizar-informacionvista-template").html()),
        initialize: function() {
            _.bindAll(this, 'render', 'selectRow','loadTable', 'modalEdit');
            $('li.active').removeClass('active');
            $('li.demandas').addClass('active');
        },
        editRow: function(event){
            if($('.dataTables_wrapper .action').hasClass('disabled'))
                return;
            
            var $selectRow = $('#casos-table .row_selected');
            
            if($selectRow.length === 1){
                $('#actualizar-bulk-modal').removeClass('hide');
                                    
                if(!$('#actualizar-bulk-modal').hasClass('in'))
                    $('#actualizar-bulk-modal').addClass('in');
            
                $('#actualizar-bulk-modal').modal('show'); 
            }
            else{
                $('#actualizar-bulk-modal').removeClass('hide');
                                    
                if(!$('#actualizar-bulk-modal').hasClass('in'))
                    $('#actualizar-bulk-modal').addClass('in');
            
                $('#actualizar-bulk-modal').modal('show');
            }
        },
        modalEdit: function(event){
            var modal = this.$el.find('#actualizar-bulk-modal');
            
            var args;
            
            args = {
                hora: $('#hora').val(),
                sala: $('#sala').val(),
                fecha: $('#fecha').val()
            };
            
            var url = "/casos/";
            
            $("#casos-table .row_selected").each(function(){
                var id = $(this)
                .attr('class')
                .replace(/row_selected/i, '')
                .replace(/odd/i, '')
                .replace(/even/i, '')
                .trim();
                url += id + ",";
            });
            
            url = url.substring(0, url.length - 1);
            
            var submitSpinner = this.getSpinner();
            submitSpinner.spin($('.modal-footer .spinner')[0]);
            
            $.ajax({
                type: "put",
                url: url,
                data: args,
                success: function(data){
                    submitSpinner.stop(); 
                    $(modal).find('.modal-footer .label')
                     .attr('class','label success')
                     .html('Guardado')
                     .show();
                    window.setTimeout(function(){
                        $(modal).modal('hide');
                    }.bind(this), 2000);
                },
                error: function(err){
                    console.log(err);
                    $(modal).find('.modal-footer .label')
                    .attr('class','label important')
                    .html('Hubo error guardando')
                    .show();
                    submitSpinner.stop();
                }
            });
        },
        filterData: function(){
            return this.collection.filterInfoPrimeraVista();
        },
        loadTable: function(collection, resp){
            var data = this.filterData();
            var options = {
                "aoColumns": [                 
                    {   
                        "mDataProp": "caso",
                        "sTitle":"Caso" 
                    },
                    { 
                        "mDataProp": "nombre",
                        "sTitle":"Nombre" 
                    },
                    { 
                        "mDataProp": "sala",
                        "sTitle":"Sala" 
                    },
                    {
                        "mDataProp": "hora",
                        "sTitle":"Hora"
                    },
                    { 
                        "mDataProp": "primeraComparecencia",
                        "sTitle":"Primera Comparecencia" 
                    }
                ]
            };
            ContainerCasosTableView.prototype.loadTable.call(this, 'actualizar', data, options);

            this.$el.find('#casos-table_filter').after('<button class="action btn-primary btn disabled">Editar</button>');
            this.$el.find('#casos-table_filter').after('<button class="btn deselect">Deseleccionar Todos</button>');
            this.$el.find('#casos-table_filter').after('<button class="btn select">Seleccionar Todos</button>');
            this.$el.find('.dataTables_wrapper .action').click(this.editRow);
            this.$el.find('.dataTables_wrapper .deselect').click(this.deselectRows);
            this.$el.find('.dataTables_wrapper .select').click(this.selectRows);
        },
        render: function(){
            ContainerCasosTableView.prototype.render.call(this)
            
            var modalBulk = this.$el.find('#actualizar-bulk-modal');
            
            modalBulk.modal({
                backdrop: true,
                keyboard: true,
                show: false
            });
            
            $(modalBulk).find('.edit').click(this.modalEdit);
            
            $(modalBulk).find('.secondary').click(function(e){
                $(modalBulk).modal('hide');
            });
            
            $(modalBulk).bind('hidden', function () {
                $(modalBulk).find('.modal-footer .label').hide();
            });
            
            var datepickers = this.$el.find(".datepicker");           
            SetDatepickers(datepickers, 0, 28);
                            
            return this;
        }
    });

    window.ContainerDemandasActualizarFechaSentenciaView = ContainerCasosTableView.extend({
        template:  _.template($("#container-demandas-actualizar-notificacionsentencia-template").html()),
        initialize: function() {
            _.bindAll(this, 'render', 'selectRow','loadTable', 'modalEdit');
            $('li.active').removeClass('active');
            $('li.demandas').addClass('active');
        },
        editRow: function(event){
            if($('.dataTables_wrapper .action').hasClass('disabled'))
                return;
            
            var $selectRow = $('#casos-table .row_selected');
            
            if($selectRow.length === 1){
                $('#actualizar-bulk-modal').removeClass('hide');
                                    
                if(!$('#actualizar-bulk-modal').hasClass('in'))
                    $('#actualizar-bulk-modal').addClass('in');
            
                $('#actualizar-bulk-modal').modal('show'); 
            }
            else{
                $('#actualizar-bulk-modal').removeClass('hide');
                                    
                if(!$('#actualizar-bulk-modal').hasClass('in'))
                    $('#actualizar-bulk-modal').addClass('in');
            
                $('#actualizar-bulk-modal').modal('show');
            }
        },
        modalEdit: function(event){
            var modal = this.$el.find('#actualizar-bulk-modal');
            
            var args;
            
            args = {
                hora: $('#hora').val(),
                sala: $('#sala').val(),
                fecha: $('#fecha').val()
            };
            
            var url = "/casos/";
            
            $("#casos-table .row_selected").each(function(){
                var id = $(this)
                .attr('class')
                .replace(/row_selected/i, '')
                .replace(/odd/i, '')
                .replace(/even/i, '')
                .trim();
                url += id + ",";
            });
            
            url = url.substring(0, url.length - 1);
            
            var submitSpinner = this.getSpinner();
            submitSpinner.spin($('.modal-footer .spinner')[0]);
            
            $.ajax({
                type: "put",
                url: url,
                data: args,
                success: function(data){
                    submitSpinner.stop(); 
                    $(modal).find('.modal-footer .label')
                     .attr('class','label success')
                     .html('Guardado')
                     .show();
                    window.setTimeout(function(){
                        $(modal).modal('hide');
                    }.bind(this), 2000);
                },
                error: function(err){
                    console.log(err);
                    $(modal).find('.modal-footer .label')
                    .attr('class','label important')
                    .html('Hubo error guardando')
                    .show();
                    submitSpinner.stop();
                }
            });
        },
        filterData: function(){
            return this.collection.filterSentencia();
        },
        loadTable: function(collection, resp){
            var data = this.filterData();
            var options = {};
            ContainerCasosTableView.prototype.loadTable.call(this, 'actualizar', data, options);

            this.$el.find('#casos-table_filter').after('<button class="action btn-primary btn disabled">Editar</button>');
            this.$el.find('#casos-table_filter').after('<button class="btn deselect">Deseleccionar Todos</button>');
            this.$el.find('#casos-table_filter').after('<button class="btn select">Seleccionar Todos</button>');
            this.$el.find('.dataTables_wrapper .action').click(this.editRow);
            this.$el.find('.dataTables_wrapper .deselect').click(this.deselectRows);
            this.$el.find('.dataTables_wrapper .select').click(this.selectRows);
        },
        render: function(){
            ContainerCasosTableView.prototype.render.call(this)
            
            var modalBulk = this.$el.find('#actualizar-bulk-modal');
            
            modalBulk.modal({
                backdrop: true,
                keyboard: true,
                show: false
            });
            
            $(modalBulk).find('.edit').click(this.modalEdit);
            
            $(modalBulk).find('.secondary').click(function(e){
                $(modalBulk).modal('hide');
            });
            
            $(modalBulk).bind('hidden', function () {
                $(modalBulk).find('.modal-footer .label').hide();
            });
            
            var datepickers = this.$el.find(".datepicker");           
            SetDatepickers(datepickers, 0, 28);
                            
            return this;
        }
    });

    window.ContainerDemandasActualizarSentenciaHaLugarView = ContainerCasosTableView.extend({
        template:  _.template($("#container-demandas-actualizar-sentenciahalugar-template").html()),
        initialize: function() {
            _.bindAll(this, 'render', 'selectRow','loadTable', 'modalEdit');
            $('li.active').removeClass('active');
            $('li.demandas').addClass('active');
        },
        editRow: function(event){
            if($('.dataTables_wrapper .action').hasClass('disabled'))
                return;
            
            var $selectRow = $('#casos-table .row_selected');
            
            if($selectRow.length === 1){
                $('#actualizar-bulk-modal').removeClass('hide');
                                    
                if(!$('#actualizar-bulk-modal').hasClass('in'))
                    $('#actualizar-bulk-modal').addClass('in');
            
                $('#actualizar-bulk-modal').modal('show'); 
            }
            else{
                $('#actualizar-bulk-modal').removeClass('hide');
                                    
                if(!$('#actualizar-bulk-modal').hasClass('in'))
                    $('#actualizar-bulk-modal').addClass('in');
            
                $('#actualizar-bulk-modal').modal('show');
            }
        },
        modalEdit: function(event){
            var modal = this.$el.find('#actualizar-bulk-modal');
            
            var args;
            
            args = {
                hora: $('#hora').val(),
                sala: $('#sala').val(),
                fecha: $('#fecha').val()
            };
            
            var url = "/casos/";
            
            $("#casos-table .row_selected").each(function(){
                var id = $(this)
                .attr('class')
                .replace(/row_selected/i, '')
                .replace(/odd/i, '')
                .replace(/even/i, '')
                .trim();
                url += id + ",";
            });
            
            url = url.substring(0, url.length - 1);
            
            var submitSpinner = this.getSpinner();
            submitSpinner.spin($('.modal-footer .spinner')[0]);
            
            $.ajax({
                type: "put",
                url: url,
                data: args,
                success: function(data){
                    submitSpinner.stop(); 
                    $(modal).find('.modal-footer .label')
                     .attr('class','label success')
                     .html('Guardado')
                     .show();
                    window.setTimeout(function(){
                        $(modal).modal('hide');
                    }.bind(this), 2000);
                },
                error: function(err){
                    console.log(err);
                    $(modal).find('.modal-footer .label')
                    .attr('class','label important')
                    .html('Hubo error guardando')
                    .show();
                    submitSpinner.stop();
                }
            });
        },
        filterData: function(){
            return this.collection.filterHaLugar();
        },
        loadTable: function(collection, resp){
            var data = this.filterData();
            var options = {};
            ContainerCasosTableView.prototype.loadTable.call(this, 'actualizar', data, options);

            this.$el.find('#casos-table_filter').after('<button class="action btn-primary btn disabled">Editar</button>');
            this.$el.find('#casos-table_filter').after('<button class="btn deselect">Deseleccionar Todos</button>');
            this.$el.find('#casos-table_filter').after('<button class="btn select">Seleccionar Todos</button>');
            this.$el.find('.dataTables_wrapper .action').click(this.editRow);
            this.$el.find('.dataTables_wrapper .deselect').click(this.deselectRows);
            this.$el.find('.dataTables_wrapper .select').click(this.selectRows);
        },
        render: function(){
            ContainerCasosTableView.prototype.render.call(this)
            
            var modalBulk = this.$el.find('#actualizar-bulk-modal');
            
            modalBulk.modal({
                backdrop: true,
                keyboard: true,
                show: false
            });
            
            $(modalBulk).find('.edit').click(this.modalEdit);
            
            $(modalBulk).find('.secondary').click(function(e){
                $(modalBulk).modal('hide');
            });
            
            $(modalBulk).bind('hidden', function () {
                $(modalBulk).find('.modal-footer .label').hide();
            });
            
            var datepickers = this.$el.find(".datepicker");           
            SetDatepickers(datepickers, 0, 28);
                            
            return this;
        }
    });

    window.ContainerDemandasActualizarLanzamientoView = ContainerCasosTableView.extend({
        template:  _.template($("#container-demandas-actualizar-lanzamiento-template").html()),
        initialize: function() {
            _.bindAll(this, 'render', 'selectRow','loadTable', 'modalEdit');
            $('li.active').removeClass('active');
            $('li.demandas').addClass('active');
        },
        editRow: function(event){
            if($('.dataTables_wrapper .action').hasClass('disabled'))
                return;
            
            var $selectRow = $('#casos-table .row_selected');
            
            if($selectRow.length === 1){
                $('#actualizar-bulk-modal').removeClass('hide');
                                    
                if(!$('#actualizar-bulk-modal').hasClass('in'))
                    $('#actualizar-bulk-modal').addClass('in');
            
                $('#actualizar-bulk-modal').modal('show'); 
            }
            else{
                $('#actualizar-bulk-modal').removeClass('hide');
                                    
                if(!$('#actualizar-bulk-modal').hasClass('in'))
                    $('#actualizar-bulk-modal').addClass('in');
            
                $('#actualizar-bulk-modal').modal('show');
            }
        },
        modalEdit: function(event){
            var modal = this.$el.find('#actualizar-bulk-modal');
            
            var args;
            
            args = {
                hora: $('#hora').val(),
                sala: $('#sala').val(),
                fecha: $('#fecha').val()
            };
            
            var url = "/casos/";
            
            $("#casos-table .row_selected").each(function(){
                var id = $(this)
                .attr('class')
                .replace(/row_selected/i, '')
                .replace(/odd/i, '')
                .replace(/even/i, '')
                .trim();
                url += id + ",";
            });
            
            url = url.substring(0, url.length - 1);
            
            var submitSpinner = this.getSpinner();
            submitSpinner.spin($('.modal-footer .spinner')[0]);
            
            $.ajax({
                type: "put",
                url: url,
                data: args,
                success: function(data){
                    submitSpinner.stop(); 
                    $(modal).find('.modal-footer .label')
                     .attr('class','label success')
                     .html('Guardado')
                     .show();
                    window.setTimeout(function(){
                        $(modal).modal('hide');
                    }.bind(this), 2000);
                },
                error: function(err){
                    console.log(err);
                    $(modal).find('.modal-footer .label')
                    .attr('class','label important')
                    .html('Hubo error guardando')
                    .show();
                    submitSpinner.stop();
                }
            });
        },
        filterData: function(){
            return this.collection.filterLanzamiento();
        },
        loadTable: function(collection, resp){
            var data = this.filterData();
            var options = {};
            ContainerCasosTableView.prototype.loadTable.call(this, 'actualizar', data, options);

            this.$el.find('#casos-table_filter').after('<button class="action btn-primary btn disabled">Editar</button>');
            this.$el.find('#casos-table_filter').after('<button class="btn deselect">Deseleccionar Todos</button>');
            this.$el.find('#casos-table_filter').after('<button class="btn select">Seleccionar Todos</button>');
            this.$el.find('.dataTables_wrapper .action').click(this.editRow);
            this.$el.find('.dataTables_wrapper .deselect').click(this.deselectRows);
            this.$el.find('.dataTables_wrapper .select').click(this.selectRows);
        },
        render: function(){
            ContainerCasosTableView.prototype.render.call(this)
            
            var modalBulk = this.$el.find('#actualizar-bulk-modal');
            
            modalBulk.modal({
                backdrop: true,
                keyboard: true,
                show: false
            });
            
            $(modalBulk).find('.edit').click(this.modalEdit);
            
            $(modalBulk).find('.secondary').click(function(e){
                $(modalBulk).modal('hide');
            });
            
            $(modalBulk).bind('hidden', function () {
                $(modalBulk).find('.modal-footer .label').hide();
            });
            
            var datepickers = this.$el.find(".datepicker");           
            SetDatepickers(datepickers, 0, 28);
                            
            return this;
        }
    });

    window.ContainerDemandasActualizarCompletadoView = ContainerCasosTableView.extend({
        template:  _.template($("#container-demandas-actualizar-completado-template").html()),
        initialize: function() {
            _.bindAll(this, 'render', 'selectRow','loadTable', 'modalEdit');
            $('li.active').removeClass('active');
            $('li.demandas').addClass('active');
        },
        editRow: function(event){
            if($('.dataTables_wrapper .action').hasClass('disabled'))
                return;
            
            var $selectRow = $('#casos-table .row_selected');
            
            if($selectRow.length === 1){
                $('#actualizar-bulk-modal').removeClass('hide');
                                    
                if(!$('#actualizar-bulk-modal').hasClass('in'))
                    $('#actualizar-bulk-modal').addClass('in');
            
                $('#actualizar-bulk-modal').modal('show'); 
            }
            else{
                $('#actualizar-bulk-modal').removeClass('hide');
                                    
                if(!$('#actualizar-bulk-modal').hasClass('in'))
                    $('#actualizar-bulk-modal').addClass('in');
            
                $('#actualizar-bulk-modal').modal('show');
            }
        },
        modalEdit: function(event){
            var modal = this.$el.find('#actualizar-bulk-modal');
            
            var args;
            
            args = {
                hora: $('#hora').val(),
                sala: $('#sala').val(),
                fecha: $('#fecha').val()
            };
            
            var url = "/casos/";
            
            $("#casos-table .row_selected").each(function(){
                var id = $(this)
                .attr('class')
                .replace(/row_selected/i, '')
                .replace(/odd/i, '')
                .replace(/even/i, '')
                .trim();
                url += id + ",";
            });
            
            url = url.substring(0, url.length - 1);
            
            var submitSpinner = this.getSpinner();
            submitSpinner.spin($('.modal-footer .spinner')[0]);
            
            $.ajax({
                type: "put",
                url: url,
                data: args,
                success: function(data){
                    submitSpinner.stop(); 
                    $(modal).find('.modal-footer .label')
                     .attr('class','label success')
                     .html('Guardado')
                     .show();
                    window.setTimeout(function(){
                        $(modal).modal('hide');
                    }.bind(this), 2000);
                },
                error: function(err){
                    console.log(err);
                    $(modal).find('.modal-footer .label')
                    .attr('class','label important')
                    .html('Hubo error guardando')
                    .show();
                    submitSpinner.stop();
                }
            });
        },
        filterData: function(){
            return this.collection.filterCompletado();
        },
        loadTable: function(collection, resp){
            var data = this.filterData();
            var options = {};
            ContainerCasosTableView.prototype.loadTable.call(this, 'actualizar', data, options);

            this.$el.find('#casos-table_filter').after('<button class="action btn-primary btn disabled">Editar</button>');
            this.$el.find('#casos-table_filter').after('<button class="btn deselect">Deseleccionar Todos</button>');
            this.$el.find('#casos-table_filter').after('<button class="btn select">Seleccionar Todos</button>');
            this.$el.find('.dataTables_wrapper .action').click(this.editRow);
            this.$el.find('.dataTables_wrapper .deselect').click(this.deselectRows);
            this.$el.find('.dataTables_wrapper .select').click(this.selectRows);
        },
        render: function(){
            ContainerCasosTableView.prototype.render.call(this)
            
            var modalBulk = this.$el.find('#actualizar-bulk-modal');
            
            modalBulk.modal({
                backdrop: true,
                keyboard: true,
                show: false
            });
            
            $(modalBulk).find('.edit').click(this.modalEdit);
            
            $(modalBulk).find('.secondary').click(function(e){
                $(modalBulk).modal('hide');
            });
            
            $(modalBulk).bind('hidden', function () {
                $(modalBulk).find('.modal-footer .label').hide();
            });
            
            var datepickers = this.$el.find(".datepicker");           
            SetDatepickers(datepickers, 0, 28);
                            
            return this;
        }
    });

    window.ContainerDemandasActualizarTodosView = ContainerCasosTableView.extend({
        template:  _.template($("#container-demandas-actualizar-todos-template").html()),
        initialize: function() {
            _.bindAll(this, 'render', 'selectRow','loadTable');
            $('li.active').removeClass('active');
            $('li.demandas').addClass('active');
        },
        selectRow: function(event){
            if ( $(event.currentTarget).hasClass('row_selected') ){
                $(event.currentTarget).removeClass('row_selected');
                $('.dataTables_wrapper .action').addClass('disabled');
            }
            else if(!$(event.currentTarget).children('td').hasClass('dataTables_empty')){
                $('tr').removeClass('row_selected');
                $(event.currentTarget).addClass('row_selected');
                $('.dataTables_wrapper .action').removeClass('disabled');
            }
        },
        editRow: function(event){
            if($('.dataTables_wrapper .action').hasClass('disabled'))
                return;
            
            var $selectRow = $('#casos-table .row_selected');
            
            if($selectRow.length === 1){
                var id = $($selectRow[0])
                        .attr('class')
                        .replace(/row_selected/i, '')
                        .replace(/odd/i, '')
                        .replace(/even/i, '')
                        .trim(); 
                App.navigate('/editar/' + id ,true);
            }
        },
        filterData: function(){
            return this.collection.toJSON();
        },
        loadTable: function(collection, resp){
            var data = this.filterData();
            var options = {};
            ContainerCasosTableView.prototype.loadTable.call(this, 'actualizar', data, options);

            this.$el.find('#casos-table_filter').after('<button class="action btn-primary btn disabled">Editar</button>');
            this.$el.find('.dataTables_wrapper .action').click(this.editRow);
        },
        render: function(){
            ContainerCasosTableView.prototype.render.call(this)
            
            var datepickers = this.$el.find(".datepicker");           
            SetDatepickers(datepickers, 0, 28);
                            
            return this;
        }
    });
});