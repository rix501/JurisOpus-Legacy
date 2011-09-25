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
                res.send("couldn't get residenciales", 404);
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
                res.send("couldn't get causales", 404);
            }
        });
    });
    
    app.get('/casos-datatable', function(req, res){
        var cases = new Models.Casos();
        
        cases.fetch({
            success: function(collection, fields){
                res.send(collection.toDatatableArray());
            },
            error: function(err){
                res.send("couldn't get cases", 404);
            }
        });
    });
    
    app.get('/casos/:id?', function(req,res){
        if(req.params.id){            
            var caso = new Models.Caso({id: req.params.id});

            caso.fetch({
                success: function(model, fields){  
                    res.send(model);
                },
                error: function(err){
                    res.send("couldn't get cases", 404);
                }
            });
        }
        else{
            var cases = new Models.Casos();

            cases.fetch({
                success: function(collection, fields){                
                    res.send(collection);
                },
                error: function(err){
                    res.send("couldn't get cases", 404);
                }
            });
        }
    });
    
    app.post('/casos', function(req,res){
        var caso = new Models.Caso();
         
        caso.save(req.body,{
            success: function(model, fields){
                res.send(model);
            },
            error: function(err){
                res.send('error saving case', 404);
            }
        });
    });
    
    app.put('/casos/:id', function(req,res){
        var caso = new Models.Caso({id: req.params.id});
                
        caso.save(req.body,{
            success: function(model, fields){
                res.send(model);
            },
            error: function(err){
                res.send('error saving case: ' + JSON.stringify(err), 404);
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
    
    app.get('/pdf', function(req, res){
        var cases = new Models.Casos();
        
        cases.pdf(req.query, {
           success: function(pdf){
               // res.send({status: 'ok'});
               res.header('Content-type','application/pdf');
               res.header('Content-disposition','attachment; filename=jurisopus-'+ req.query.type +'.pdf');
               res.header('Content-Length', pdf.length);
               res.end(pdf, 'binary');
           },
           error: function(err){
               res.send(err, 404);
           }
        });
    });
};