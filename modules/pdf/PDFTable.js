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

PDFTable.prototype.addCheckbox = function(element, index){
    var delta = this.doc.currentLineHeight(false);

    var x;

    if(index === 0)
        x = this.doc.x;
    else
        x = this.doc.x + this.columns[index-1].width;
    
    var y = this.doc.y;
    var margin = (this.columns[index].width - delta)/2;

    console.log(x, y, delta, margin);

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
        if(index === 0){
            if(!_.isUndefined(this.columns[index].type) && this.columns[index].type == 'checkbox'){
                this.doc.y = currentY;
                this.addCheckbox(element, index);
            }
            else{
                this.doc.y = currentY;
                this.doc.text(element.title, this.doc.x, this.doc.y, { width: this.columns[index].width, align: 'center' });
                if(this.doc.y > greatestY){
                    greatestY = this.doc.y;
                }
            }
        }
        else{
            if(!_.isUndefined(this.columns[index].type) && this.columns[index].type == 'checkbox'){
                this.doc.y = currentY;
                this.addCheckbox(element, index);
            }
            else{
                if(this.columns[index].width !== 0){
                    this.doc.y = currentY;
                    this.doc.text(element.title, this.doc.x + this.columns[index-1].width, this.doc.y, { width: this.columns[index].width, align: 'center' });
                    if(this.doc.y > greatestY){
                        greatestY = this.doc.y;
                    }
                }
                else{
                    this.doc.y = currentY;
                    this.doc.text(element.title, this.doc.x + this.columns[index-1].width, this.doc.y);
                    if(this.doc.y > greatestY){
                        greatestY = this.doc.y;
                    }
                }
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