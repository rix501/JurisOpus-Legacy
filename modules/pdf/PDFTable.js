var _ = require('underscore');

var PDFTable = function(doc, columns, options){
    this.doc = doc;
    this.options = options;
    this.columns = columns;

    this.addHeaders();
};

PDFTable.prototype.addHeaders = function(){  
    //Change to draw line dynamically, according to width
    this.doc.moveTo(this.doc.x ,this.doc.y)
    .lineWidth(1)
    .lineTo(936 , this.doc.y)
    .stroke();

    if(this.options.font){
        this.doc.font(this.options.font.type, this.options.font.size);
    }
    else{
        this.doc.font('Helvetica', 11);
    }

    
    var doc = this.doc;
    
    _.each(this.columns, function(element, index, list){
        if(index === 0){
            doc.text(element.title, doc.x, doc.y + 4);
        }
        else{
            doc.moveUp()
            .text(element.title, doc.x + list[index-1].width);
        }
    });

    this.doc.x = 72;
    
    //Change to draw line dynamically, according to width
    this.doc.moveTo(72 ,this.doc.y)
    .lineWidth(1)
    .lineTo(936 , this.doc.y)
    .stroke();

    this.doc.moveDown();
};

PDFTable.prototype.addRow = function(row){
    var doc = this.doc;
    var that = this;

    var nextY = this.doc.y + this.doc.currentLineHeight(true);

    if(nextY + this.doc.currentLineHeight(true) + this.doc.page.margins.bottom > this.doc.page.height){
        this.doc.addPage();
        this.addHeaders();
    }

    _.each(row, function(element, index, list){
        if(index === 0){
            doc.text(element.title);
        }
        else{
            doc.moveUp()
            .text(element.title, doc.x + that.columns[index-1].width);
        }
    });
    
    this.doc.x = 72;
};

PDFTable.prototype.addRows = function(rows){
    _.each(rows, function(row){
        this.addRow(row);
    });
};

module.exports = PDFTable;