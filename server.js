/**
 * Module dependencies.
 */
 
var express = require('express');
var PDFDocument = require('pdfkit');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', function(req, res){
  res.sendfile('/public/index.html');
});

app.get('/test', function(req, res){
    var doc = new PDFDocument();
    
    var loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in...'

    doc.text(loremIpsum,100,100,{
        width: 200,
        align: 'left'
    });
    doc.text(loremIpsum,500,100,{
        width: 200,
        align: 'left'
    });
    doc.text(loremIpsum);
    
    // doc.write('./output.pdf', function(){
    //      res.sendfile('./output.pdf');
    // });
                
    res.header('Content-type','application/pdf');
    res.end(doc.output(), 'binary');    
});

app.listen(process.env.PORT || 8001);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);