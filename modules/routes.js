exports.setup = function(app, Models){
    app.get('/', function(req, res){
        res.sendfile('/public/index.html');
    });
    
    app.get('/residenciales', function(req,res){
        var resis = new Models.Residenciales();
                
        resis.fetch({
            success: function(model, fields){
                res.send(model);
            },
            error: function(err){
                console.log(err);
            }
        });
    });
    
    app.get('/causales', function(req,res){
        var causales = new Models.Causales();
                
        causales.fetch({
            success: function(model, fields){
                res.send(model);
            },
            error: function(err){
                console.log(err);
            }
        });
    });
    
    app.get('/casos/:datatable?', function(req,res){
        var cases = new Models.Casos();
                
        cases.fetch({
            success: function(collection, fields){                
                if(req.params.datatable === "true"){
                    res.send(collection.toDatatableArray());
                }
                else{
                    res.send(collection);
                }
            },
            error: function(err){
                console.log(err);
            }
        });
    });
    
    app.post('/casos', function(req,res){
        var caso = new Models.Caso();
                
        caso.save(req.body,{
            success: function(model, fields){
                res.send(model);
            },
            error: function(err){
                console.log(err);
            }
        });
    });

    app.get('/search/:type', function(req,res){        
        if(req.params.type === 'casos'){
            var casos = new Models.Casos();
                        
            casos.search(req.query, {
                success: function(collection, fields){
                    res.send(collection);
                },
                error: function(err){
                    res.send(err, 404);
                }
            });
        }
    });
    
    app.get('/pdf/:municipio/:nombre', function(req, res){

        var data = ["test", "test"];

        //data = req.params.nombre;

        var demandaPdf = pdfFactory(req.params.municipio, req.params.nombre, data);

        res.header('Content-type','application/pdf');
        res.end(demandaPdf, 'binary');    
    });
};