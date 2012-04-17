var _ = require('underscore');

module.exports = function(informe){

	var informedevistas = informe.makeSubclass();
	informedevistas.prototype.draw = function(doc, data){
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

	informedevistas.prototype.addHeader = function(doc, data){
	    doc.font('Arial-Bold', 14)
	    .text('INFORME DE VISTAS  ' + data[0].primeraComparecencia)
	    .text('SALA: ' + data[0].sala + ' HORA CITADA: ' + data[0].hora,{
	    });
	  
	    doc.moveDown();
	};

	informedevistas.prototype.addFooter = function(doc){
	    _.each(doc.pages, function(page, index, pages){
	        doc.page = page;

	        doc.moveTo(doc.x, 612 - 72 + 10) 
	        .lineWidth(0.5)                        
	        .lineTo(936, 612 - 72 + 10)
	        .stroke();

	        doc.font('Arial', 10)
	        .text('Fecha del dia de hoy',doc.x, 612 - 72 + 14);

	        doc.text( (index + 1) + ' of ' + pages.length, doc.x, doc.y + 20);
	    });
	};

	informedevistas.prototype.drawTable = function(doc, data){
	    var columns = [
	        {
	            title: "Caso",
	            width: 80
	        },
	        {
	            title: "Residencial",
	            width: 140
	        },
	        {
	            title: "Nombre",
	            width: 130
	        },
	        {
	            title: "Edificio",
	            width: 70
	        },
	        {
	            title: "Apto",
	            width: 70
	        },
	        {
	            title: "Causal",
	            width: 70
	        },
	        {
	            title: "Observaciones",
	            width: 310
	        }
	    ];

	    this.table = this.addTable(doc, columns);

	    this.addCases(doc, data);

	    //Table footer
	    doc.moveTo(doc.x,doc.y + 2)
	    .lineWidth(2)
	    .lineTo(936 , doc.y)
	    .stroke();
	    
	    doc.font('Arial-Bold', 14)
	    .text('Casos para ver hoy: ' + data.length, doc.x, doc.y + 4);

	    return doc;
	};
	informedevistas.prototype.addCases = function(doc, data){
	    // caso - residencial - nombre - edificio - apto - causal - observaciones
	    var rows = [];
	    var that = this;

	    _.each(data, function(single){
	        rows.push([
	            {title: single.caso},
	            {title: single.residencial},
	            {title: single.nombre},
	            {title: single.edificio},
	            {title: single.apartamento},
	            {title: single.causalIniciales},
	            {title: single.observaciones}
	        ]);
	    });

	    this.table.addRows(rows, {margin: 5});
	};

	return informedevistas;
};