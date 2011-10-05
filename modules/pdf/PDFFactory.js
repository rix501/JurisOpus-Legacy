var _ = require('underscore');

var demandas = require('./demanda');
var informes = require('./informe');

var PDFFactory = module.exports = function(type, data){
    var doc, pdf;
        
    if(type === "demandas"){
        pdf = demandas;
    }
    else if(type === "informes"){
        pdf = informes;
    }
        
    if(_.isArray(data)){
        //It's an array
        _.each(data, function(single){
            console.log(single.pdfTemplate);
            doc = pdf.templates[single.pdfTemplate].draw(doc, single);
        });
    }
    else {
        doc = pdf.templates[data.pdfTemplate].draw(doc, data);
    }    
    
    return doc.output();
};