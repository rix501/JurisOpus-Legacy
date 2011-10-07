Function.prototype.makeSubclass= function() {
    function Class() {
        if (!(this instanceof Class))
            throw('Constructor called without "new"');
                    
        if ('_init' in this)
            this._init.apply(this, arguments);
    }
    Function.prototype.makeSubclass.nonconstructor.prototype= this.prototype;
    Class.prototype= new Function.prototype.makeSubclass.nonconstructor();
    return Class;
};
Function.prototype.makeSubclass.nonconstructor = function() {};

var PDFDocument = require('pdfkit');

var pdf = Object.makeSubclass();

pdf.prototype.build = function(options){
    options || (options = {});
        
    var doc = new PDFDocument({
        size: (options.pdfSize) ? options.pdfSize : "legal",
        align: (options.pdfAlign) ? options.pdfAlign : "justify",
        layout: (options.pdflayout) ? options.pdflayout : "portrait"
    });
    
    doc.registerFont('Arial', './modules/pdf/Fonts/arial.ttf');
    doc.registerFont('Arial-Bold', './modules/pdf/Fonts/arialbd.ttf');
    
    return doc;
};

pdf.prototype.drawMarginLines = function(doc){
    //Left Margin lines
    doc.moveTo(69,50)
       .lineWidth(3)
       .lineTo(69,940)
       .stroke()
       .moveTo(66,50)
       .lineWidth(1)
       .lineTo(66,940)
       .stroke();
    //Right Margin Lines
    doc.moveTo(552,50)
       .lineWidth(0.5)
       .lineTo(552,940)
       .stroke();
};

pdf.prototype.drawTopLeftBox = function(doc, x, y){
    //Top left box
    //No importa x/y
    doc.moveTo(x, y+6)                         
       .lineTo(250+x, y + 6)
       .lineTo(250+x, y - 130)
       .moveTo(x, y + 8)
       .lineTo(250+x, y + 8)
       .stroke();

    // doc.moveTo(x,y);
};

pdf.prototype.drawFooterLine = function(doc, x, y){
    //Footer Line
    doc.moveTo(x, y - 40)                         
       .lineTo(460+x, y - 40)
       .stroke();
};

module.exports = pdf;