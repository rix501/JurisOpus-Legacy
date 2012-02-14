//system and npm libs
var express = require('express');
var fs = require('fs');

// Configuration
var app = module.exports = express.createServer();
process.env.NODE_ENV = app.settings.env;

app.configure(function(){
	app.use(express.bodyParser());
	app.use(express.cookieParser());
	app.use(express.session({ secret: "JurisSecret"}));
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
	app.use(express.errorHandler()); 
	// var fs = require('fs');
	// var util = require('util');
	// var is = fs.createReadStream('/home/node/local/lib/node_modules/pdfkit/node_modules/flate/build/Release/zlib_bindings.node')
	// var os = fs.createWriteStream('/home/node/local/lib/node_modules/pdfkit/node_modules/flate/lib/zlib_bindings.node'); 
	// util.pump(is, os);
});

//My Libs
var routes = require('./modules/routes');
var Models = require('./modules/models');
 
// Routes
routes.setup(app, Models);

app.listen(process.env.C9_PORT || process.env.PORT || 8001);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);