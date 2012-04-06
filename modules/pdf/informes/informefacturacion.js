var _ = require('underscore');

module.exports = function(informe){

	var informefacturacion = informe.makeSubclass();
	informefacturacion.prototype.draw = function(doc, data){
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

	informefacturacion.prototype.addHeader = function(doc, data){
	    doc.font('Helvetica-Bold', 14)
	    .text('INFORME DE VISTAS  ' + data[0].primeraComparecencia)
	    .text('SALA: ' + data[0].sala + ' HORA CITADA: ' + data[0].hora,{
	    });
	  
	    doc.moveDown();
	};

	informefacturacion.prototype.addFooter = function(doc){
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

	informefacturacion.prototype.drawTable = function(doc, data){
	    var columns = [
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
	            title: "Caso",
	            width: 60
	        },
	        {
	            title: "Sala",
	            width: 30
	        },
	        {
	            title: "Hora",
	            width: 50
	        },
	        {
	            title: "Causal",
	            width: 40
	        },
	        {
	            title: "Presentacion",
	            width: 60
	        },        
	        {
	            title: "Primera Comp.",
	            width: 70
	        },        
	        {
	            title: "Segunda Comp.",
	            width: 70
	        },        
	        {
	            title: "Vista Fondo",
	            width: 60
	        },        
	        {
	            title: "Sentencia",
	            width: 50
	        },        
	        {
	            title: "Lanzamiento",
	            width: 60
	        },
	        {
	            title: "Observaciones",
	            width: 150
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
	informefacturacion.prototype.addCases = function(doc, data){
	    // caso - residencial - nombre - edificio - apto - causal - observaciones
	    var row = [];
	    var that = this;

	    _.each(data, function(single){
	        row = [
	            
	            //{title: single.residencial},
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
	        ];

	        that.table.addRow(row);
	    });
	};

	return informefacturacion;
};