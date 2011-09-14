exports.setup = function(app, Models){
    app.get('/', function(req, res){
        res.sendfile('/public/index.html');
    });

    app.post('/cases', function(req,res){        
        var caso = new Models.Caso();
                
        caso.save(req.body,{
            success: function(model, fields){
                res.send(model);
            }
        });
    });

    app.get('/rtftest',function(req,res){
        fs.readFile('./public/Modelo.rtf',function (err, data) {

           data = data.replace(/%%var%%/gi,'HOLYSHITYES');
                                   
           res.send(data, { 'Content-Type': 'application/rtf' });
   
           // res.send(data);
        });
    });
    
    app.get('/pdf/:municipio/:nombre', function(req, res){ 

        var data = ["test", "test"];

        //data = req.params.nombre;

        var demandaPdf = pdfFactory(req.params.municipio, req.params.nombre, data);

        res.header('Content-type','application/pdf');
        res.end(demandaPdf, 'binary');    
    });
};