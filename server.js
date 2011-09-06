/**
 * Module dependencies.
 */
 
var express = require('express');
var PDFDocument = require('pdfkit');
var fs = require('fs');

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

app.get('/test', function(req, res){ 
    var doc = new PDFDocument();
    
    doc.registerFont('Arial', 'public/arial.ttf');
    doc.registerFont('Arial-Bold', 'public/arial-bold.ttf');
    
    //Left Margin lines
    doc.moveTo(70,50)
       .lineWidth(3)
       .lineTo(70,710)
       .stroke()
       .moveTo(67,50)
       .lineWidth(1)
       .lineTo(67,710)
       .stroke();
    //Right Margin Lines
    doc.moveTo(552,50)
       .lineWidth(0.5)
       .lineTo(552,710)
       .stroke();

    doc.font('Arial-Bold', 11)
    .text('ESTADO LIBRE ASOCIADO DE PUERTO RICO',{
        align: 'center'
    })
    .text('TRIBUNAL DE PRIMERA INSTANCIA',{
        align: 'center'
    })
    .text('SALA SUPERIOR DE SAN JUAN',{
        align: 'center'
    });
    
    doc.moveDown();
        
    doc.text('ADMINISTRACION DE VIVIENDA PUBLICA, a traves de su agente administrador Housing Promoters, Inc.',{
       align: 'center',
       width: 250
    });
    
    doc.moveDown();
    
    doc.text('Demandante',{
       align: 'center',
       width: 250
    })
    doc.moveDown();
    doc.text('VS.',{
       align: 'center',
       width: 250
    });
    doc.moveDown();
    doc.text('«NOMBRE»',{
       align: 'center',
       width: 250
    })
    .text('Demandados',{
       align: 'center',
       width: 250
    });
    
    var y = doc.y;
    var x = doc.x;
    
    //Top left box
    doc.moveTo(x, y + 10)                         
       .lineTo(250+x, y + 10)
       .lineTo(250+x, y - 130)
       .moveTo(x, y + 12)
       .lineTo(250+x, y + 12)
       .stroke();
    
    doc.moveTo(x,y);
    
    doc.moveUp();
    doc.moveUp();
    doc.moveUp();
    doc.moveUp();
    doc.moveUp();
    doc.moveUp();
    doc.moveUp();
    doc.moveUp();
    doc.moveUp();
    
    doc.text('CIVIL NUM.   K PE2011-',350,0,{
        align:'left'
    });
    
    doc.moveDown();
    doc.moveDown();
    
    doc.text('(            )',350,0,{
        width:180,
        align:'center'
    });
    
    doc.moveDown();
    doc.moveDown();
    
    doc.text('SOBRE:',350,0,{
        width:180,
        align:'center'
    });    
    
    doc.moveDown();
    
    doc.text('DESAHUCIO POR INCUMPLIMIENTO DE CONTRATO, FALTA DE PAGO ',320,0,{
        width:230,
        align:'center'
    });     
    
    doc.moveDown();

    doc.text('DEMANDA',1,0,{
        width: 612,
        align: 'center'
    });
        
    doc.text('AL HONORABLE TRIBUNAL:',80,0,{
        align: 'left'
    });
        
    doc.font('Arial')
    .text('Comparece la parte Demandante, por conducto de sus abogados que suscriben, y muy respetuosamente expone y solicita:',{
        indent: 36,
        align: 'left'
    })
    .text("1. La parte compareciente es el agente administrador de cierto edificio propiedad de la Administración de Vivienda Pública, conocido como Residencial «RESIDENCIAL», ubicado en el Municipio de San Juan.",{
        indent: 72,
        align: 'left'
    })
    .text("2. La parte Demandada ocupa el apartamento «APARTAMENTO» en el edificio «EDIFICIO» de dicho complejo en virtud de un contrato de arrendamiento.",{
        indent: 72,
        align: 'left'
    })
    .text("3. La parte demandada ha incumplido con su contrato al no pagar el canon mensual pactado, por lo que adeuda al presente la suma de «DEUDA_TOTAL», por lo que la parte compareciente se ha visto obligada a presentar la presente acción.*",{
        indent: 72,
        align: 'left'
    })
    .text("4. Mediante la presente se informa que la dirección postal de la parte Demandante es la siguiente:",{
        indent: 72,
        align: 'left'
    })
    .text("Housing Promoters, Inc",{
        indent: 72,
        align: 'left'
    })
    .text("PO Box 68",{
        indent: 72,
        align: 'left'
    })
    .text("Saint Just, PR  00978",{
        indent: 72,
        align: 'left'
    })
    .text("Tel.   (787) 760-3030",{
        indent: 72,
        align: 'left'
    })
    .font('Arial-Bold')
    .text("POR TODO LO CUAL, ",{
        indent: 36,
        align: 'left'
    })
    .font('Arial')
    .moveUp()
    .text("muy respetuosamente se solicita a este Hon. Tribunal decrete con lugar la presente demanda** y ordene el lanzamiento de la parte Demandada y de cualquier persona que en su nombre y/o con su consentimiento ocupe la propiedad descrita en esta Demanda.",{
        indent: 150,
        align: 'left'
    })
    .font('Arial-Bold')
    .text("RESPETUOSAMENTE SOMETIDA",{
        indent: 36,
        align: 'left'
    })
    .font('Arial')
    .text("en San Juan, P.R., a 06 de September de 2011.", 295, doc.y - 16, {
        align: 'left'
    });
        
    doc.text("HECTOR A. SANTIAGO ROMERO (RUA 10101)",270,0)
    .text("Abogados parte Demandante")
    .text("PMB 273,")
    .text("PO Box 2500,")
    .text("Trujillo Alto, PR  00977-2500.")
    .text("Tel. (787) 294-6397, 6398 / Fax 294-6399")
    .text("hasantiago.law@gmail.com");
    
    doc.text("*17 LPRA sección 103", 80, doc.y + 5)
    .text("**La parte Demandante renuncia al término de diez (10) días para señalar vista contenido en la Ley #129 de 27 de septiembre de 2007." ,{
        align: 'left'
    });
    
    
    var y = doc.y;
    var x = doc.x;
    
    //Footer Line
    doc.moveTo(x, y - 40)                         
       .lineTo(460+x, y - 40)
       .stroke();
    
    /**** NEW PAGE ****/
    
    doc.addPage();
    
    //Left Margin lines
    doc.moveTo(70,50)
       .lineWidth(3)
       .lineTo(70,710)
       .stroke()
       .moveTo(67,50)
       .lineWidth(1)
       .lineTo(67,710)
       .stroke();
    //Right Margin Lines
    doc.moveTo(552,50)
       .lineWidth(0.5)
       .lineTo(552,710)
       .stroke();
    
    
    doc.font('Arial-Bold', 11)
    .text('ESTADO LIBRE ASOCIADO DE PUERTO RICO',{
        align: 'center'
    })
    .text('TRIBUNAL DE PRIMERA INSTANCIA',{
        align: 'center'
    })
    .text('SALA SUPERIOR DE SAN JUAN',{
        align: 'center'
    });
    
    doc.moveDown();
        
    doc.text('ADMINISTRACION DE VIVIENDA PUBLICA, a traves de su agente administrador Housing Promoters, Inc.',{
       align: 'center',
       width: 250
    });
    
    doc.moveDown();
    
    doc.text('Demandante',{
       align: 'center',
       width: 250
    })
    doc.moveDown();
    doc.text('VS.',{
       align: 'center',
       width: 250
    });
    doc.moveDown();
    doc.text('«NOMBRE»',{
       align: 'center',
       width: 250
    })
    .text('Demandados',{
       align: 'center',
       width: 250
    });
    
    var y = doc.y;
    var x = doc.x;
    
    //Top left box
    doc.moveTo(x, y)                         
       .lineTo(250+x, y)
       .lineTo(250+x, y - 130)
       .moveTo(x, y + 2)
       .lineTo(250+x, y + 2)
       .stroke();
    
    doc.moveTo(x,y);
    
    doc.moveUp();
    doc.moveUp();
    doc.moveUp();
    doc.moveUp();
    doc.moveUp();
    doc.moveUp();
    doc.moveUp();
    doc.moveUp();
    doc.moveUp();
    
    doc.text('CIVIL NUM.   K PE2011-',350,0,{
        align:'left'
    });
    
    doc.moveDown();
    doc.moveDown();
    
    doc.text('(            )',350,0,{
        width:180,
        align:'center'
    });
    
    doc.moveDown();
    doc.moveDown();
    
    doc.text('SOBRE:',350,0,{
        width:180,
        align:'center'
    });    
    
    doc.moveDown();
    
    doc.text('DESAHUCIO',330,0,{
        width:215,
        align:'center'
    });     
    
    doc.moveDown();
    
    var width = doc.widthOfString('CITACION Y EMPLAZAMIENTO');
    var height = doc.currentLineHeight();

    doc.text('CITACION Y EMPLAZAMIENTO',doc.x - 100)
       .moveTo(doc.x, doc.y - 2)
       .lineTo(doc.x + width, doc.y - 2)
       .stroke();    
        
    doc.text('ESTADOS UNIDOS DE NORTE AMERICA )', 80, doc.y + 10,{
        align: 'left'
    })
    .text("EL PRESIDENTE DE LOS ESTADOS UNIDOS")
    .text("EL ESTADO LIBRE ASOCIADO DE PUERTO RICO");
                
    res.header('Content-type','application/pdf');
    res.end(doc.output(), 'binary');    
});

app.listen(process.env.PORT || 8001);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);