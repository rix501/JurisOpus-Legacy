var pdfFactory = require('./pdf/PDFFactory');

exports.setup = function(app, Models){    
    // Dummy users
    var users = [
        { id: 0, username: 'tester', password: 'jurisopus', email: '', role: 'tester' },
        { id: 0, username: 'kmirizarry', password: 'jurisopus', email: '', role: 'tester' },
        { id: 0, username: 'guillo', password: 'jurisopus', email: '', role: 'tester' },
        { id: 1, username: 'rix501', password: 'supersecret', email: 'rix501@gmail.com', role: 'admin' }
    ]; 
     
    var checkAuth = function(req, res, next){
        if(app.settings.env === 'development')
            req.session.auth = true;
        
        if(req.url === "/login"){
            if(req.session && req.session.auth){
                res.redirect('/');
                return;
            }
            else {
                next();
                return;
            }
        }
        
        if(req.session && req.session.auth){
            next();
            return;
        }
        
        if(typeof req.headers['x-requested-with'] !== 'undefined'){
            res.send({error: 'access denied'}, 403);
        }
        else{
            res.redirect('/login');
        }
    };
    
    var checkUser = function(username, password, cb){
        var auth = false;
        
        users.forEach(function(user){
            if(username === user.username && password === user.password){
                auth = true;
                cb(auth, user);
                
            }
        });
        
        if(!auth) cb(auth);
    };

    var sendEmail = function(pdf){
        var mailer = require('nodemailer');
        var transport = mailer.createTransport("SMTP",{
            host: 'smtp.sendgrid.net', 
            port:587,
            auth: {
                user: 'app2924161@heroku.com', 
                pass: 'fk4934gl'
            }
        });

        transport.sendMail({
            from: "rix501@gmail.com",
            to: "rix501@gmail.com",
            subject: "Hello world!",
            attachments: [
                {
                    fileName: "jo.pdf",
                    contents: new Buffer(pdf, "binary"),
                    contentType: "application/pdf"
                }
            ]
        }, function(error, responseStatus){
            if(!error){
                console.log(responseStatus.message); // response from the server
            }
            else {
                console.log(error);
            }
        });
    };
    
    app.get('/', checkAuth, function(req,res){
        res.sendfile('public/index.html');
    });
    
    app.get('/login', checkAuth, function(req, res){
        res.sendfile('public/login.html');
    });
    
    app.post('/login', function(req,res){
        checkUser(req.body.username, req.body.password, function(auth, user){            
            if(auth) {
                req.session.auth = true;
                res.send({status: 'ok'});
            }
            else {
                res.send({status: 'ok'}, 400);
            }
        });
    });
    
    app.get('/residenciales', checkAuth, function(req,res){
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
    
    app.get('/causales', checkAuth, function(req,res){
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
    
    app.get('/casos-datatable/:type?', checkAuth, function(req, res){
        var cases = new Models.Casos();
        
        if(req.params.type === "seleccionar")
            cases.seleccionado = true;
        
        cases.fetch({
            success: function(collection, fields){
                res.send(collection.toDatatableArray());
            },
            error: function(err){
                res.send("couldn't get cases", 404);
            }
        });
    });
    
    app.get('/casos/:id?', checkAuth, function(req,res){
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
    
    app.post('/casos', checkAuth, function(req,res){
        var caso = new Models.Caso();
         
        caso.save(req.body,{
            success: function(model, fields){
                console.log(model);
                res.send(model);
            },
            error: function(err){
                res.send('error saving case', 404);
            }
        });
    });
        
    app.put('/casos/:id', checkAuth, function(req,res){
        var ids = req.params.id.split(',');
                
        if(ids.length === 1){
            var caso = new Models.Caso({id: req.params.id});

            caso.save(req.body,{
                success: function(model, fields){
                    res.send(model);
                },
                error: function(err){
                    res.send('error saving case: ' + JSON.stringify(err), 404);
                }
            });
        }
        else if(ids.length > 1){
            var casos = new Models.Casos();
            
            casos.bulkEdit({
                ids: ids,
                data: req.body
            },
            {
                success: function(model, fields){
                    res.send(model);
                },
                error: function(err){
                    res.send('error saving cases: ' + JSON.stringify(err), 404);
                }
            });
        }
    });

    app.get('/search/:type', checkAuth, function(req,res){
        if(req.params.type === 'casos'){
            var casos = new Models.Casos();
                        
            casos.search(req.query, {
                success: function(collection, fields){
                    if(collection.length === 0){
                        res.send('No cases', 404);
                    }
                    else {
                        res.send(collection);
                    }
                },
                error: function(err){
                    res.send(err, 404);
                }
            });
        }
    });
    
    app.get('/pdf', checkAuth, function(req, res){
        var cases = new Models.Casos();
        
        cases.pdf(req.query, {
           success: function(pdf){
                res.header('Content-type','application/pdf');
                res.header('Content-disposition','attachment; filename=jurisopus-'+ req.query.type +'.pdf');
                res.header('Content-Length', pdf.length);
                res.end(pdf, 'binary');

                if(process.env.NODE_ENV == 'development'){
                    //sendEmail(pdf);
                }

           },
           error: function(err){
               res.send(err, 404);
           }
        });
    });
    
    app.get('/pdfTest', function(req,res){
        if(process.env.NODE_ENV == 'production'){
            res.send('Nothing to report');
            return;
        }
            

        var data = [{ 
            caso: '123',
            residencial: '123',
            nombre: '123',
            edificio:'123',
            apartamento:'123',
            causalIniciales:'123',
            observaciones:'123',
            primeraComparecencia:'123',
            sala:'123',
            hora: '123',
            completado: '0',
            lanzamiento: '0000-00-00',
            fechaEjecutar: '0000-00-00'
        },
        { 
            caso: '123',
            residencial: '123',
            nombre: '123',
            edificio:'123',
            apartamento:'123',
            causalIniciales:'123',
            observaciones:'123',
            primeraComparecencia:'123',
            sala:'123',
            hora: '123',
            completado: '1',
            lanzamiento: '0000-00-00',
            fechaEjecutar: '0000-00-00'
        }];

        var pdf = pdfFactory('informes', 'informependientedeejecucion', data, function(output){
            res.header('Content-type','application/pdf');
            res.end(output, 'binary');
        });     
    });
};