/**
 * Module dependencies.
 */
 
var express = require('express');
var fs = require('fs');

var pdfFactory = require('./pdf/PDFFactory');

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

app.get('/rtftest',function(req,res){
   
    fs.readFile('./public/Modelo.rtf',function (err, data) {

        data = data.replace(/%%var%%/gi,'HOLYSHITYES');
                                        
        res.send(data, { 'Content-Type': 'application/rtf' });
        
        // res.send(data);
    });
    
});

app.get('/test/:nombre', function(req, res){ 
    
    var data = [req.params.nombre, req.params.nombre];
    
    //data = req.params.nombre;
    
    var demandaPdf = pdfFactory('SanJuan','FaltaPago',data);
    
    res.header('Content-type','application/pdf');
    res.end(demandaPdf, 'binary');    
});

app.get('/pdf/:municipio/:nombre', function(req, res){ 
    
    var data = ["test", "test"];
    
    //data = req.params.nombre;
    
    var demandaPdf = pdfFactory(req.params.municipio, req.params.nombre, data);
    
    res.header('Content-type','application/pdf');
    res.end(demandaPdf, 'binary');    
});

app.listen(process.env.PORT || 8001);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);