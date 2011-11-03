var _ = require('underscore');
var pdf = require('./pdf');

var informe = pdf.makeSubclass();
informe.prototype.draw = function(doc, data){
};

var informedevistas = informe.makeSubclass();
informedevistas.prototype.draw = function(doc, data){
    var y, x, width, height;
    var options = {};

    if(doc === undefined || doc === null){
        options.pdflayout = 'landscape';
        options.pdfSize = 'legal';
        options.pdfAlign = 'left';

        doc = pdf.prototype.build.call(this, options);       
    }

    if(doc.pages.length > 1){
        doc.addPage();
    }
    
    this.drawFirstPage(doc, data);

    return doc;
};
informedevistas.prototype.drawFirstPage = function(doc, data){
    var y, x, width, height;

    doc.font('Helvetica-Bold', 14)
    .text('INFORME DE VISTAS - ' + data[0].primeraComparecencia)
    .text('SALA:' + data[0].sala + 'HORA CITADA:' + data[0].hora,{
    });
  
    doc.moveDown();

    /**** DRAWING TABLE ****/

    //Draw divisor line
    doc.moveTo(doc.x ,doc.y)
    .lineWidth(1)
    .lineTo(936 , doc.y)
    .stroke();

    doc.font('Helvetica', 11)
    .text('Caso', doc.x, doc.y + 4)
    .moveUp()
    .text('Residencial', doc.x + 90)
    .moveUp()
    .text('Nombre', doc.x + 130)
    .moveUp()
    .text('Edificio', doc.x + 130)
    .moveUp()
    .text('Apto', doc.x + 70)
    .moveUp()
    .text('Causal', doc.x + 70)
    .moveUp()
    .text('Observaciones', doc.x + 70);

    doc.x = 72;
    
    doc.moveTo(72 ,doc.y)
    .lineWidth(1)
    .lineTo(936 , doc.y)
    .stroke();

    doc.moveDown();

    this.addCases(doc, data);

    //doc.moveDown();

    //Pre-Footer
    doc.moveTo(doc.x,doc.y)
    .lineWidth(2)
    .lineTo(936 , doc.y)
    .stroke();
    
    doc.font('Helvetica-Bold', 14)
    .text('Casos para ver hoy: 32',doc.x, doc.y + 4);

    //Footer
    doc.moveTo(doc.x, 612 - 72 + 10) 
    .lineWidth(0.5)                        
    .lineTo(936, 612 - 72 + 10)
    .stroke();

    doc.font('Helvetica', 10)
    .text('Fecha del dia de hoy',doc.x, 612 - 72 + 14);

    return doc;

};
informedevistas.prototype.addCases = function(doc, data){
    // caso - residencial - nombre - edificio - apto - causal - observaciones   
    _.forEach(data, function(single){
        doc.text(single.caso)
        .moveUp()
        .text(single.residencial, doc.x + 90)
        .moveUp()
        .text(single.nombre, doc.x + 130)
        .moveUp()
        .text(single.edificio, doc.x + 130)
        .moveUp()
        .text(single.apartamento, doc.x + 70)
        .moveUp()
        .text(single.causalIniciales, doc.x + 70)
        .moveUp()
        .text(single.observaciones, doc.x + 70);

        doc.x = 72;
    });
};

module.exports = (function(){
    return {
        templates:{
            basico: new informe(),
            informedevistas: new informedevistas()
        }
    };
})();