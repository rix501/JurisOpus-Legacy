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
                dateFormat: 'yy-mm-dd'
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
            $(this.el).html(this.template());
            
            return this;
        }
    });
    
    window.ContainerMainFormView = ContainerView.extend({
        events: {
            'submit':'submitForm'
        },
        template: _.template($("#container-form-template").html()),
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
            $(this.el).html(this.template({isEdit: this.isEdit}));
            
            var datepickers = $(this.el).find(".datepicker");
            
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
            'click button':'submitForm'
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
        
            var searchType = $(event.currentTarget).attr('id');
            var resultCasos = new Models.Casos();
            var viewObj = this;
            var query = {};

            switch(searchType) {
                case 'search-direccion':
                    query.residencial = $('#residencial').val();
                    query.edificio = $('#edificio').val();
                    query.apartamento = $('#apartamento').val();
                    break;
                case 'search-caso':
                    query.caso = $('#caso').val();
                    break;
                case 'search-nombre':
                    query.nombre = $('#nombre').val();
                    break;
                default:
            }
        
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
        initialize: function() {
            _.bindAll(this, 'render', 'submitForm' ,'fillForm', 'error', 'fillResidenciales', 'fillCausales');
            $('li.active').removeClass('active');
            $('li.buscar').addClass('active');
            
            this.model = new Models.Caso({id: this.options.casoId});
            this.model.bind('change', this.fillForm);
            this.model.bind('error', this.error);
            this.model.fetch();                         
        },
        isEdit: true,
        error: function(err){
            this.errorMessage('Error buscando caso');
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
        assignRow: function(nRow, aData, iDisplayIndex, iDisplayIndexFull){
            $(nRow).addClass(aData.id.toString());
        },
        filterTable:function(data){
            this.oTable.fnClearTable();
            this.oTable.fnAddData(data);
            this.oTable.fnAdjustColumnSizing();
            this.oTable.fnDraw();
        },
        loadTable: function(data, options){
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

            this.oTable = $('#casos-table').dataTable(opts);
            
            $('#casos-table_wrapper').addClass('active');
            
            this.oTable.fnAdjustColumnSizing();
            this.oTable.fnDraw();
            
            $('#casos-table').on('click', 'tr', this.selectRow);
        },
        render: function(type){
            $(this.el).html(this.template());
  
            this.collection = new Models.Casos();
            
            this.collection.url = '/casos-datatable/' + type;
            
            this.collection.fetch({
                success: this.loadTable,
                error: function(error){
                    console.log(error);
                }
            });

            return this;
        }
    });

    window.ContainerDemandasSeleccionarView = ContainerCasosTableView.extend({
        template: _.template($("#container-demandas-seleccionar-template").html()),
        //add event to collection for when a model is removed       
        initialize: function(){
            _.bindAll(this, 'render', 'selectRow', 'loadTable');
            $('li.active').removeClass('active');
            $('li.demandas').addClass('active');
        },
        selectNav: function(event){
            var demandaType = ContainerCasosTableView.prototype.selectNav.call(this, event);
            
            this.filterTable(this.collection.filterCausal(demandaType));
        },
        print: function(){
            if($('.dataTables_wrapper .print').hasClass('disabled'))
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
            ContainerCasosTableView.prototype.loadTable.call(this, data, options);
                   
            $('#casos-table_filter').after('<button class="action btn disabled">Imprimir</button>');
            $('.dataTables_wrapper .action').click(this.print);
        },
        render: function(){
            return ContainerCasosTableView.prototype.render.call(this, 'seleccionar');
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
            if($('.dataTables_wrapper .edit').hasClass('disabled'))
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
            
            var modal = $(event.target.parentNode.parentNode);
            
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
            var modal = $(event.target.parentNode.parentNode);
            
            var args;
            
            args = {
                hora: $('#hora').val(),
                sala: $('#sala').val(),
                fecha: $('#fecha').val()
            };
            
            var url = "/casos/";
            
            $("#actualizar-table .row_selected").each(function(){
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
            ContainerCasosTableView.prototype.loadTable.call(this, data, options);

            $('#casos-table_filter').after('<button class="action btn-primary btn disabled">Editar</button>');
            $('.dataTables_wrapper .action').click(this.editRow);
        },
        render: function(){
            ContainerCasosTableView.prototype.render.call(this, 'actualizar')
            
            var modalFilter = $(this.el).find('#actualizar-modal');
            var modalBulk = $(this.el).find('#actualizar-bulk-modal');
            
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
            
            var datepickers = $(this.el).find(".datepicker");           
            SetDatepickers(datepickers, 0, 28);
                            
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
        modal: function(event){
            var classList = $(event.target).attr('class');
            
            var template = $.trim(classList.replace(/mod/i,'').replace(/primary/i,'').replace(/btn/i,''));

            $('#' + template + '-modal').modal('show');
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

            var that = this;
            
            $(this.el).find('.modal').each(function(i, modal){
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
});