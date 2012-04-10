var _ = require('underscore');

module.exports = function(informe){
	
	var informependientedeejecucion = informe.makeSubclass();
	informependientedeejecucion.prototype.draw = function(doc, data){
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
	    
	    this.drawTable(doc, data);

	    this.addFooter(doc);

	    return doc;
	};

	informependientedeejecucion.prototype.addHeader = function(doc, data){
	    doc.font('Helvetica-Bold', 14)
	    .text('Casos con sentencias dictadas pendientes de ejecucion')
	    .text('Residencial: ' + data[0].residencial);
	  
	    doc.moveDown();
	};

	informependientedeejecucion.prototype.addFooter = function(doc){
	    _.each(doc.pages, function(page, index, pages){
	        doc.page = page;

	        doc.moveTo(doc.x, 612 - 72 + 10) 
	        .lineWidth(0.5)                        
	        .lineTo(936, 612 - 72 + 10)
	        .stroke();

	        doc.font('Helvetica', 10)
	        .text('Fecha del dia de hoy',doc.x, 612 - 72 + 14);

	        doc.text( (index + 1) + ' of ' + pages.length, doc.x, doc.y + 20);
	    });
	};

	informependientedeejecucion.prototype.drawTable = function(doc, data){
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
	        type: 'Helvetica',
	        size: 9
	    }

	    this.table = this.addTable(doc, columns, { font: font});

	    this.addCases(doc, data);

	    //Table footer
	    doc.moveTo(doc.x,doc.y)
	    .lineWidth(2)
	    .lineTo(936 , doc.y)
	    .stroke();
	    
	    doc.font('Helvetica-Bold', 14)
	    .text('Casos para ver hoy: ' + data.length, doc.x, doc.y + 4);

	    return doc;

	};
	informependientedeejecucion.prototype.addCases = function(doc, data){
	    // caso - residencial - nombre - edificio - apto - causal - observaciones
	    var row = [];
	    var that = this;

	    _.each(data, function(single){
	        row = [
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
	        ];

	        that.table.addRow(row);
	    });
	};

	return informependientedeejecucion;
};