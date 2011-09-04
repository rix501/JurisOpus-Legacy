/**
 * Module dependencies.
 */

var express = require('express');

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

app.get('/pdf', function(req, res){
	var PDFDocument = require('pdfkit');
    var doc = new PDFDocument({size: 'legal',layout: 'landscape'});
    
    doc.text('This text is left aligned. ');
    
    doc.path('M 100,20 L 200,160 Q 230,00 250,120 C 290,-40 300,200 400,150 L 500,90')
       .stroke();
    
    res.send(doc.output(),{'Content-type':'application/pdf'});
});

app.listen(process.env.PORT || 8001);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);