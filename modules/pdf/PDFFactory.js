var _ = require('underscore');

var pdfs = {
    demandas: require('./demandas'),
    informes: require('./informes')
}

var PDFFactory = module.exports = function(pdfObjs, cb){
    var doc, pdf;

    if(_.isArray(pdfObjs)){
        _.each(pdfObjs, function(pdfObj, index){
            doc = pdfs[pdfObj.type].templates[pdfObj.template].draw(doc, pdfObj.dataSource, pdfObj.args);
        });
    }
    else {
        doc = pdfs[pdfObjs.type].templates[pdfObjs.template].draw(doc, pdfObjs.dataSource, pdfObjs.args);
    }
    
    return doc.output(cb);
};