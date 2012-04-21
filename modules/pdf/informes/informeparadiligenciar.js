var _ = require('underscore');

module.exports = function(informe){

	var informeparadiligenciar = informe.makeSubclass();
	informeparadiligenciar.prototype.draw = function(doc, data, args){
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

	informeparadiligenciar.prototype.addHeader = function(doc, data){
	    doc.font('Arial-Bold', 14)
	    .text('Casos para diligenciar');
	  
	    doc.moveDown();
	};

	informeparadiligenciar.prototype.addFooter = function(doc){
	    _.each(doc.pages, function(page, index, pages){
	        doc.page = page;

	        doc.moveTo(doc.x, doc.page.height - doc.page.margins.bottom + 10) 
	        .lineWidth(0.5)                        
	        .lineTo(doc.page.width - doc.page.margins.left, doc.page.height - doc.page.margins.bottom + 10)
	        .stroke();

	        doc.font('Arial', 10);
	        //.text('Fecha del dia de hoy',doc.x, 612 - 72 + 14);

	        doc.text( (index + 1) + ' of ' + pages.length, doc.x, doc.page.height - doc.page.margins.bottom + 20, {
	        	width: doc.page.width - doc.page.margins.left - doc.page.margins.right,
	    		align: 'right'
	        });
	    });
	};

	informeparadiligenciar.prototype.drawTable = function(doc, data){
	    var columns = [
	        {
	            title: "Residencial",
	            width: 140,
	            align: 'left'
	        },
	        {
	            title: "Edificio",
	            width: 60,
	            align: 'center'
	        },
	        {
	            title: "Apto",
	            width: 60,
	            align: 'center'
	        },
	        {
	            title: "Nombre",
	            width: 130,
	            align: 'left'
	        },
	        {
	            title: "Presentacion",
	            width: 80,
	            align: 'center'
	        },
	        {
	            title: "Diligenciado",
	            width: 80,
	            align: 'center',
	            type: 'checkbox'
	        },
	        {
	            title: "Caso",
	            width: 80,
	            align: 'center'
	        },
	        {
	            title: "1ra Comp.",
	            width: 90,
	            align: 'center'
	        },
	        {
	            title: "Causal",
	            width: 70,
	            align: 'center'
	        }
	    ];

	    this.table = this.addTable(doc, columns);

	    this.addCases(doc, data);

	    //Table footer
	    doc.moveTo(doc.x,doc.y)
	    .lineWidth(2)
	    .lineTo(936 , doc.y)
	    .stroke();
	    
	    doc.font('Arial-Bold', 14)
	    .text('Casos para ver hoy: ' + data.length, doc.x, doc.y + 4);

	    return doc;

	};
	informeparadiligenciar.prototype.addCases = function(doc, data){
	    // caso - residencial - nombre - edificio - apto - causal - observaciones
	    var rows = [];
	    var that = this;

	    _.each(data, function(single){
	        rows.push([   
	            {title: single.residencial},
	            {title: single.edificio},
	            {title: single.apartamento},
	            {title: single.nombre},
	            {title: single.presentacion},
	            {title: single.diligenciado},
	            {title: single.caso},
	            {title: single.primeraComparecencia},
	            {title: single.causalIniciales}
	        ]);
	    });

	    this.table.addRows(rows, {margin: 5});
	};

	return informeparadiligenciar;
};