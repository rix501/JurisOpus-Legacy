var _ = require('underscore');

var demandas = require('./demandas');
var informes = require('./informes');

var PDFFactory = module.exports = function(type, template, data, cb){
    var doc, pdf;
        
    if(type === "demandas"){
        pdf = demandas;
        if(_.isArray(data)){
            //It's an array
            _.each(data, function(single){
                doc = pdf.templates[single.pdfTemplate].draw(doc, single);
            });
        }
        else {
            doc = pdf.templates[data.pdfTemplate].draw(doc, data);
        }
        
    }
    else if(type === "informes"){
        pdf = informes;
        doc = pdf.templates[template].draw(doc, data);
    }
    
    return doc.output(cb);
};