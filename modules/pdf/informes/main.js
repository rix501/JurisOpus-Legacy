var _ = require('underscore');

var pdf = require('../pdf');
var PDFTable = require('../PDFTable');

var informe = pdf.makeSubclass();
informe.prototype.draw = function(doc, data){
};

informe.prototype.addTable = function(doc, columns, options){
    options || (options = {});

    var table = new PDFTable(doc, columns, options);

    return table;
};


module.exports = informe;