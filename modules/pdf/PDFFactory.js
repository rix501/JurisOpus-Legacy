var _ = require('underscore');

var demandas = require('./demanda');

var PDFFactory = function(type, data){
    var doc, pdf;
        
    if(type === "demandas"){
        pdf = demandas;
    }
    
    if(_.isArray(data)){
        //It's an array
        _.each(data, function(single){
            doc = pdf.templates[single.pdfCausal].draw(doc, single);
        });
    }
    else {
        doc = pdf.templates[single.pdfCausal].draw(doc, data);
    }    
    
    return doc.output();
};

module.exports = PDFFactory;