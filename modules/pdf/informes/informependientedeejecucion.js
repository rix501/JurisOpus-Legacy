var _ = require('underscore');

module.exports = function(informe){
	
	var informependientedeejecucion = informe.makeSubclass();
	informependientedeejecucion.prototype.draw = function(doc, data, args){
	    var options = {};

	    if(doc === undefined || doc === null){
	        options.pdflayout = 'landscape';
	        options.pdfSize = 'legal';
	        options.pdfAlign = 'left';

	        doc = informe.prototype.build.call(this, options);       
	    }

	    if(doc.pages.length > 1){
	        doc.addPage();
	    }

	    this.addHeader(doc, data);
	    
	   	_(data)
	    .chain()
	    .groupBy(function(model){ 
	    	return model.residencial; 
	    })
	    .each(_.bind(function(residencialCol, residencial){ 
	    	this.drawTable(doc, residencialCol);
	    }, this));

	    this.addFooter(doc);

	    return doc;
	};

	informependientedeejecucion.prototype.addHeader = function(doc, data){
	    doc.font('Arial-Bold', 14)
	    .text('Casos con sentencias dictadas pendientes de ejecucion')
	    .text('Residencial: ' + data[0].residencial);
	  
	    doc.moveDown();
	};

	informependientedeejecucion.prototype.addFooter = function(doc){
	    _.each(doc.pages, function(page, index, pages){
	        doc.page = page;

	        doc.moveTo(doc.x, doc.page.height - doc.page.margins.left + 10) 
            .lineWidth(0.5)                        
            .lineTo(doc.page.width - doc.page.margins.left, doc.page.height - doc.page.margins.left + 10)
            .stroke();

            doc.font('Arial', 10);
            //.text('Fecha del dia de hoy',doc.x, doc.page.height - doc.page.margins.left + 14);

            doc.text( (index + 1) + ' of ' + pages.length, doc.x, doc.page.height - doc.page.margins.bottom + 20, {
                width: doc.page.width - doc.page.margins.left - doc.page.margins.right,
                align: 'right'
            });
	    });
	};

	informependientedeejecucion.prototype.drawTable = function(doc, data){
		var residencial = data[0].residencial;

	    if(doc.y >= doc.page.height - doc.page.margins.bottom){
	    	doc.addPage();
	    }

	    doc.font('Arial-Bold', 12)
	    .text('Residencial: ' + residencial, doc.x, doc.y + 14);

	    var columns = [
	        {
	            title: "Caso",
	            width: 60
	        },
	        {
	            title: "Nombre",
	            width: 110
	        },
	        {
	            title: "Edif",
	            width: 30
	        },
	        {
	            title: "Apto",
	            width: 30
	        },
	        {
	            title: "Observaciones",
	            width: 250
	        },
	        {
	            title: "Sentencia",
	            width: 60
	        },  
	        {
	            title: "Fecha Ejecutar",
	            width: 70
	        },
	        {
	            title: "Ejecutar",
	            width: 40,
	            type: 'checkbox'
	        }, 
	        {
	            title: "Lanzamiento",
	            width: 60
	        },
	        {
	            title: "Complt",
	            width: 30,
	            type: 'checkbox'
	        }
	    ];

	    var font = {
	        type: 'Arial',
	        size: 9
	    }

	    this.table = this.addTable(doc, columns, { font: font});

	    this.addCases(doc, data);

	    //Table footer
	    doc.moveTo(doc.x,doc.y + 2)
	    .lineWidth(2)
	    .lineTo(936 , doc.y + 2)
	    .stroke();
	    
	   	var totalString = 'Total de casos para residencial ' + residencial + ': ' + data.length;
		
	    doc.font('Arial-Bold', 12)
	    .text(totalString, doc.x, doc.y + 14);

	    doc.x = 72;

	    return doc;

	};
	informependientedeejecucion.prototype.addCases = function(doc, data){
	    // caso - residencial - nombre - edificio - apto - causal - observaciones
	    var rows = [];
	    var that = this;

	    _.each(data, function(single){
	        rows.push([
	            {title: single.caso},
	            {title: single.nombre},
	            {title: single.edificio},
	            {title: single.apartamento},
	            {title: single.observaciones},
	            {title: single.sentencia},
	            {title: single.fechaEjecutar},
	            {title: single.ejecutar},
	            {title: single.lanzamiento},
	            {title: single.completado}
	        ]);
	    });

	    this.table.addRows(rows, {margin: 5});
	};

	return informependientedeejecucion;
};