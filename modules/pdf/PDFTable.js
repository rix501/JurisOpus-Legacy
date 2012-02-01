var _ = require('underscore');

var PDFTable = function(doc, columns, options){
    this.doc = doc;
    this.options = options;
    this.columns = columns;
    console.log(this);
};

PDFTable.prototype.addHeaders = function(){  
    //Change to draw line dynamically, according to width
    console.log(this);
    this.doc.moveTo(this.doc.x ,this.doc.y)
    .lineWidth(1)
    .lineTo(936 , this.doc.y)
    .stroke();

    this.doc.font('Helvetica', 11);
    
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
    
    _.each(row, function(element, index, list){
        var nextY = doc.y + doc.currentLineHeight(true);

        if(nextY + doc.currentLineHeight(true) + doc.page.margins.bottom > doc.page.height){
            doc.addPage();
            PDFTable.prototype.addHeaders();
        }
        
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