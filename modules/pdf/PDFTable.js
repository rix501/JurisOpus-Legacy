var _ = require('underscore');

var PDFTable = function(doc, columns, options){
    this.doc = doc;
    this.options = options;
    this.columns = columns;

    this.addHeaders();
};

PDFTable.prototype.addHeaders = function(){  
    var width = this.doc.page.width - this.doc.page.margins.left;

    this.doc.moveTo(this.doc.x ,this.doc.y)
    .lineWidth(1)
    .lineTo(width , this.doc.y)
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
            doc.text(element.title, doc.x, doc.y + 4, { width: list[index].width, align: 'center' });
        }
        else{
            doc.moveUp()
            .text(element.title, doc.x + list[index-1].width, doc.y, { width: list[index].width, align: 'center' });
        }
    });

    this.doc.x = this.doc.page.margins.left;
    
    this.doc.moveTo(this.doc.page.margins.left ,this.doc.y)
    .lineWidth(1)
    .lineTo(width , this.doc.y)
    .stroke();

    this.doc.moveDown();
};

PDFTable.prototype.addCheckbox = function(element, width, prevWidth, align){
    var delta = this.doc.currentLineHeight(false);

    var x = this.doc.x + prevWidth;
    var y = this.doc.y;
    var margin = (width - delta)/2;

    this.doc.moveTo(x + margin, y)
    .lineWidth(1)
    .lineTo(x + margin + delta , y)
    .lineTo(x + margin + delta , y + delta)
    .lineTo(x + margin, y + delta)
    .lineTo(x + margin, y)
    .stroke();

    //Check it
    if(element.title === '1'){
        this.doc.moveTo(x + margin ,y)
        .lineWidth(1)
        .lineTo(x + margin + delta , y + delta)
        .stroke();

        this.doc.moveTo(x + margin + delta, y)
        .lineWidth(1)
        .lineTo(x + margin, y + delta)
        .stroke();
    }

    this.doc.x = x;
    this.doc.y = y;
};

PDFTable.prototype.addRow = function(row){
    var nextY = this.doc.y + this.doc.currentLineHeight(true);

    var currentY = this.doc.y;
    var greatestY = this.doc.y;

    if(nextY + this.doc.currentLineHeight(true) + this.doc.page.margins.bottom > this.doc.page.height){
        this.doc.addPage();
        this.addHeaders();
        currentY = greatestY = this.doc.y;
    }

    _.each(row, _.bind(function(element, index){
        var align = ( !_.isUndefined(this.columns[index].align) ) ? this.columns[index].align : 'left';
        var type = ( !_.isUndefined(this.columns[index].type) ) ? this.columns[index].type : 'text';
        var width = this.columns[index].width;
        var prevWidth = ( index === 0 ) ? 0 : this.columns[index-1].width;

        if(type == 'checkbox'){
            this.doc.y = currentY;
            this.addCheckbox(element, width, prevWidth, align);
        }
        else if(type == 'text'){
            this.doc.y = currentY;
            this.doc.text(element.title, this.doc.x + prevWidth, this.doc.y, { width: width, align: align });
            if(this.doc.y > greatestY){
                greatestY = this.doc.y;
            }
        }
    }, this));
    
    this.doc.x = 72;
    this.doc.y = greatestY;
};

PDFTable.prototype.addRows = function(rows){
    _.each(rows, function(row){
        this.addRow(row);
    });
};

module.exports = PDFTable;