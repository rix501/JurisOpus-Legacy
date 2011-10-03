var pdf = require('./pdf');

var informe = pdf.makeSubclass();

informe.prototype.draw = function(doc, data){
   var y, x, width, height;
   var options = {};
   
   if(doc === undefined || doc === null){
       options.pdflayout = 'landscape';
       options.pdfSize = 'letter';
       options.pdfAlign = 'left';

       doc = pdf.prototype.build.call(this, options);       
   }
      
   if(doc.pages.length > 1){
       doc.addPage();
   }

   this.drawFirstPage(doc, data);
   
   return doc;
};

informe.prototype.drawFirstPage = function(doc, data){
    var y, x, width, height;

    doc.font('Helvetica-Bold', 14)
    .text('SALA:       HORA CITADA:       ',{
    });
      
    doc.moveDown();
    
    /**** DRAWING TABLE ****/
    
    //Draw divisor line
    doc.moveTo(doc.x ,doc.y)
    .lineWidth(1)
    .lineTo(720 , doc.y)
    .stroke();
    
    doc.font('Helvetica', 10)
    .text('Caso', doc.x, doc.y + 4)
    .moveUp()
    .text('Residencial', doc.x + 70)
    .moveUp()
    .text('Edificio', doc.x + 90)
    .moveUp()
    .text('Apartamento', doc.x + 50)
    .moveUp()
    .text('Nombre', doc.x + 70)
    .moveUp()
    .text('Diligenciado en', doc.x + 100)
    .moveUp()
    .text('Observaciones', doc.x + 110);
    
    doc.x = 72;
        
    doc.moveTo(72 ,doc.y)
    .lineWidth(1)
    .lineTo(720 , doc.y)
    .stroke();
    
    doc.moveDown();
    
    for(var i = 0; i < 32; i++)
        addCases(doc);
    
    doc.moveDown();
    
    //Pre-Footer
    doc.moveTo(doc.x,doc.y)
    .lineWidth(2)
    .lineTo(720 , doc.y)
    .stroke();
        
    doc.font('Helvetica-Bold', 14)
    .text('Casos para ver hoy: 32',doc.x, doc.y + 4);
    
    //Footer
    doc.moveTo(doc.x, 612 - 72) 
    .lineWidth(0.5)                        
    .lineTo(720, 612 - 72)
    .stroke();
    
    doc.font('Helvetica', 10)
    .text('Fecha del dia de hoy',doc.x, 612 - 72 + 4);
    
    return doc;
};

var addCases = function(doc){
    doc.text('KPP11-1234')
    .moveUp()
    .text('Monte Hatillo', doc.x + 70)
    .moveUp()
    .text('Q', doc.x + 90)
    .moveUp()
    .text('12', doc.x + 50)
    .moveUp()
    .text('JOHN DOE', doc.x + 70)
    .moveUp()
    .text('Alguna Persona Va Aqui', doc.x + 100)
    .moveUp()
    .text('Emplazado', doc.x + 120);
    
    doc.x = 72;
};

module.exports = (function(){
    return {
        templates:{
            basico: new informe()
        }
    };
})();