var _ = require('underscore');

module.exports = function(informe){

	var informepresentados = informe.makeSubclass();
    informepresentados.prototype.draw = function(doc, data, args){
        var options = {};

        if(doc === undefined || doc === null){
            options.pdflayout = 'portrait';
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

    informepresentados.prototype.addHeader = function(doc, data){
        doc.font('Arial-Bold', 14)
        .text('Casos presentados  ');
      
        doc.moveDown();
    };

    informepresentados.prototype.addFooter = function(doc){
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

    informepresentados.prototype.drawTable = function(doc, data){
        var columns = [
            {
                title: "Residencial",
                width: 140,
                align: 'center'
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
                title: "Nombre",
                width: 110,
                align: 'center'
            },
            {
                title: "Causal",
                width: 70,
                align: 'center'
            },
            {
                title: "Presentación",
                width: 80,
                align: 'center'
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
        .lineTo(doc.page.width - doc.page.margins.left , doc.y + 2)
        .stroke();
        
        doc.font('Arial-Bold', 14)
        .text('Casos para ver hoy: ' + data.length, doc.x, doc.y + 4);

        return doc;

    };
    informepresentados.prototype.addCases = function(doc, data){
        // caso - residencial - nombre - edificio - apto - causal - observaciones
        var rows = [];
        var that = this;

        _.each(data, function(single){
            rows.push([
                {title: single.residencial},
                {title: single.edificio},
                {title: single.apartamento},
                {title: single.nombre},
                {title: single.causalIniciales},
                {title: single.presentacion}
            ]);
        });

        this.table.addRows(rows, {margin: 5});
    };

	return informepresentados;
};