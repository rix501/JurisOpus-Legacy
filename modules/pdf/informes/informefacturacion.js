var _ = require('underscore');

module.exports = function(informe){

	var informefacturacion = informe.makeSubclass();
	informefacturacion.prototype.draw = function(doc, data, args){
	    var options = {};

	    if(doc === undefined || doc === null){
	        options.pdflayout = 'landscape';
	        options.pdfSize = 'legal';
	        options.pdfAlign = 'left';
	        options.pdfMargins = {
				top: 72,
				left: 72,
				bottom: 108,
				right: 72
	        };

	        doc = informe.prototype.build.call(this, options);  
	    }

	    if(doc.pages.length > 1){
	        doc.addPage();
	    }

	    this.addHeader(doc, data, args);
        
        this.monthlyAmount = 10500;

        this.amountPerCase = this.monthlyAmount/data.length;

	    _(data)
	    .chain()
	    .groupBy(function(model){ 
	    	return model.residencial; 
	    })
	    .each(_.bind(function(residencialCol, residencial){ 
	    	this.drawTable(doc, residencialCol);
	    }, this));
	    
	    doc.moveDown();
	    doc.moveDown();
	    doc.moveDown();

	    doc.font('Arial-Bold', 14)
	    .text('Total a facturar: $ ' + this.monthlyAmount)

	    this.addFooter(doc);

	    return doc;
	};

	informefacturacion.prototype.addHeader = function(doc, data, args){
	    doc.font('Arial-Bold', 10);

	    var y = doc.y;

	    doc.text('PMB 237')
	    .text('PO Box 2500')
	    .text('Trujillo Alto, PR 00977-2500');

	    doc.y = y;

	    doc.font('Arial-Bold', 12)
	    .text('HECTOR A. SANTIAGO', doc.x, doc.y, {
	    	width: doc.page.width - doc.page.margins.left - doc.page.margins.right,
	    	align: 'center'
	    })
	    .font('Arial-Bold', 10)
	    .text('Abogado Notario', doc.x, doc.y, {
	    	width: doc.page.width - doc.page.margins.left - doc.page.margins.right,
	    	align: 'center'
	    });

	    doc.y = y;

	    doc.text('Tel. (787) 294-6397, 6398 / Fax (787) 294-6399', doc.x, doc.y, {
	    	width: doc.page.width - doc.page.margins.left - doc.page.margins.right,
	    	align: 'right'
	    });
	  
	    doc.moveDown();
	    doc.moveDown();
	    doc.moveDown();

	    doc.text('Mes facturado: ' + args, doc.x, doc.y, {
	    	width: doc.page.width - doc.page.margins.left - doc.page.margins.right,
	    	align: 'center'
	    });
	};

	informefacturacion.prototype.addFooter = function(doc){
	    _.each(doc.pages, function(page, index, pages){
	        doc.page = page;

	        var x = doc.x;

	        doc.moveTo(doc.x, doc.page.height - doc.page.margins.bottom + 28) 
	        .lineWidth(0.5)                        
	        .lineTo(doc.page.width - doc.page.margins.left, doc.page.height - doc.page.margins.bottom + 28)
	        .stroke();

	        var certString = 'CERTIFICO: Que la presente factura es correcta y que la misma no ha sido pagada en toda ni en parte';

	        doc.font('Arial', 10);
	        doc.text(certString, doc.x, doc.page.height - doc.page.margins.bottom + 37)
	        .moveUp()
	        .text('______________________________', x + doc.widthOfString(certString) + 10)
	        .text('Lcdo. Héctor A. Santiago Romero', x + doc.widthOfString(certString) + 16);

			doc.x = 72;

	        doc.text( (index + 1) + ' of ' + pages.length, doc.x, doc.page.height - doc.page.margins.bottom + 30, {
	        	width: doc.page.width - doc.page.margins.left - doc.page.margins.right,
	    		align: 'right'
	        });	        
	    });
	};

	informefacturacion.prototype.drawTable = function(doc, data){
	    var residencial = data[0].residencial;

	    if(doc.y >= doc.page.height - doc.page.margins.bottom){
	    	doc.addPage();
	    }

	    doc.font('Arial-Bold', 12)
	    .text('Residencial: ' + residencial, doc.x, doc.y + 14);

	    var columns = [
	        {
	            title: "Nombre",
	            width: 110,
	            align: 'left'
	        },
	        {
	            title: "Edif",
	            width: 30,
	            align: 'center'
	        },
	        {
	            title: "Apto",
	            width: 30,
	            align: 'center'
	        },
	        {
	            title: "Caso",
	            width: 60,
	            align: 'center'
	        },
	        {
	            title: "Sala",
	            width: 30,
	            align: 'center'
	        },
	        {
	            title: "Hora",
	            width: 50,
	            align: 'center'
	        },
	        {
	            title: "Causal",
	            width: 40,
	            align: 'center'
	        },
	        {
	            title: "Presentacion",
	            width: 60,
	            align: 'center'
	        },        
	        {
	            title: "Primera Comp.",
	            width: 70,
	            align: 'center'
	        },        
	        {
	            title: "Segunda Comp.",
	            width: 70,
	            align: 'center'
	        },        
	        {
	            title: "Vista Fondo",
	            width: 60,
	            align: 'center'
	        },        
	        {
	            title: "Sentencia",
	            width: 50,
	            align: 'center'
	        },        
	        {
	            title: "Lanzamiento",
	            width: 60,
	            align: 'center'
	        },
	        {
	            title: "Observaciones",
	            width: 150,
	            align: 'left'
	        }
	    ];

	    var font = {
	        type: 'Arial',
	        size: 9
	    }

	    this.table = this.addTable(doc, columns, { font: font});

	    this.addCases(doc, data);

	    //Table footer
	    doc.moveTo(doc.x,doc.y + 10)
	    .lineWidth(2)
	    .lineTo(936 , doc.y + 10)
	    .stroke();

	    var totalString = 'Total de casos para residencial ' + residencial + ': ' + data.length;

	   	var amountResidencial = Math.round(100 * data.length * this.amountPerCase) / 100;

	   	var amountResidencialString = amountResidencial + "";
		if (amountResidencialString.indexOf(".") == -1) {amountResidencialString += ".00"}
		if (amountResidencialString.indexOf(".") == amountResidencialString.length-2) {amountResidencialString += "0"}
		
	    doc.font('Arial-Bold', 12)
	    .text(totalString, doc.x, doc.y + 14)
	    .moveUp()
	    .text('Cargo por casos facturados: $ ' + amountResidencialString, doc.x + doc.widthOfString(totalString) + 20);

	    doc.x = 72;

	    return doc;
	};

	informefacturacion.prototype.addCases = function(doc, data){
	    // caso - residencial - nombre - edificio - apto - causal - observaciones
	    var rows = [];
	    var that = this;

	    _.each(data, function(single){
	        rows.push([
	            {title: single.nombre},
	            {title: single.edificio},
	            {title: single.apartamento},
	            {title: single.caso},
	            {title: single.sala},
	            {title: single.hora},
	            {title: single.causalIniciales},
	            {title: single.presentacion},
	            {title: single.primeraComparecencia},
	            {title: single.segundaComparecencia},
	            {title: single.vistaEnSuFondo},
	            {title: single.sentencia},
	            {title: single.lanzamiento},
	            {title: single.observaciones}
	        ]);
	    });

	    this.table.addRows(rows, {margin: 5});
	};

	return informefacturacion;
};