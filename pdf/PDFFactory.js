var PDFDocument = require('pdfkit');

var PDFFactory = {};

var drawMarginLines = function(doc){
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
};

var drawTopLeftBox = function(doc, x, y){
    //Top left box
    doc.moveTo(x, y + 10)                         
       .lineTo(250+x, y + 10)
       .lineTo(250+x, y - 130)
       .moveTo(x, y + 12)
       .lineTo(250+x, y + 12)
       .stroke();

    doc.moveTo(x,y);
};

var drawFooterLine = function(doc, x, y){
    //Footer Line
    doc.moveTo(x, y - 40)                         
       .lineTo(460+x, y - 40)
       .stroke();
};



PDFFactory.DemandaCobro = function(nombre){
    var y, x, width, height;
    
    var doc = new PDFDocument({
        size: "legal"
    });

    doc.registerFont('Arial', './pdf/Fonts/arial.ttf');
    doc.registerFont('Arial-Bold', './pdf/Fonts/arial-bold.ttf');

    drawMarginLines(doc);

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
    .moveDown();
    doc.text('VS.',{
       align: 'center',
       width: 250
    });
    doc.moveDown();
    doc.text(nombre,{
       align: 'center',
       width: 250
    })
    .text('Demandados',{
       align: 'center',
       width: 250
    });

    drawTopLeftBox(doc, doc.x,  doc.y);

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
    .text("en San Juan, P.R., a 06 de September de 2011.", 295, doc.y - 13, {
        align: 'left'
    })
    .moveDown();
    
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


    drawFooterLine(doc, doc.x,  doc.y);

    /**** NEW PAGE ****/

    doc.addPage({
        size: "legal"
    });

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
    .moveDown();
    doc.text('VS.',{
       align: 'center',
       width: 250
    });
    doc.moveDown();
    doc.text(nombre,{
       align: 'center',
       width: 250
    })
    .text('Demandados',{
       align: 'center',
       width: 250
    });

    drawTopLeftBox(doc, doc.x,  doc.y);
    
    //Top left box
   // doc.moveTo(x, y)                         
    //   .lineTo(250+x, y)
    //   .lineTo(250+x, y - 130)
    //   .moveTo(x, y + 2)
    //   .lineTo(250+x, y + 2)
    //   .stroke();
    //  doc.moveTo(x,y);


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

    width = doc.widthOfString('CITACION Y EMPLAZAMIENTO');
    height = doc.currentLineHeight();

    doc.text('CITACION Y EMPLAZAMIENTO',doc.x - 100)
       .moveTo(doc.x, doc.y - 2)
       .lineTo(doc.x + width, doc.y - 2)
       .stroke();    
    
    doc.text('ESTADOS UNIDOS DE NORTE AMERICA )', 80, doc.y + 10,{
        align: 'left'
    })
    .text("EL PRESIDENTE DE LOS ESTADOS UNIDOS")
    .text("EL ESTADO LIBRE ASOCIADO DE PUERTO RICO");

    doc.font('Arial');

    doc.text('A. '+ nombre,{
        indent: 36
    })
    .text('RESIDENCIAL «RESIDENCIAL»',{
        indent: 52
    })
    .text('EDIF. «EDIFICIO» APTO. «APARTAMENTO»',{
        indent: 52
    })
    .text('SAN JUAN PR',{
        indent: 52
    });

    doc.moveDown();

    doc.text('Parte Demandada arriba mencionada:',{
           indent: 36
    });

    doc.moveDown();

    doc.text('POR CUANTO: Conforme Orden Administrativa se calendariza automáticamente la vista en el caso de epígrafe. Se expide la presente a la parte Demandante para que de inmediato proceda a su diligenciamiento.',{
           indent: 36,
           lineGap: 10
    });

    doc.text('POR CUANTO: De conformidad al Artículo 624 del Código de Enjuiciamiento Civil, 32 L.P.R.A. 2825, quedan citadas las partes para que comparezcan a vista el día _______ de ______________ de 2011, a las _______ de la A.M. en el Tribunal de Primera Instancia de Puerto Rico, Sala de San Juan, Puerto Rico. SE LE APERCIBE que de no comparecer se dictará Sentencia sin más citarle ni oírle, declarando CON LUGAR la demanda y ordenando su lanzamiento y de cuantas personas se encuentren en la ocupación del inmueble bajo o en virtud de la autoridad de la parte demandada.',{
           indent: 36,
           lineGap: 10
    });
             
    doc.text('POR LO TANTO: Usted, la parte Demandada, por la presente es requerida y citada oficialmente para que se sirva comparecer a la Sala de este Tribunal, según señalado.',{
           indent: 36,
           lineGap: 10
    });         

    doc.text('Expedida bajo mi firma, y el sello del Tribunal, hoy día _______ de',{
           indent: 36,
           lineGap: 10
    });

    /**** NEW PAGE ****/

    doc.addPage({
        size: "legal"
    });

    doc.text('DILIGENCIAMIENTO POR PERSONA PARTICULAR',{
        align: 'center',
        lineGap: 15
    });

    doc.moveDown();

    doc.text('YO,______________________________________,previamente juramentado declaro:',{
        indent: 36,
        lineGap: 15
    });

    doc.text('Que me llamo como queda dicho; soy mayor de 21 años de edad, sé leer y escribir; y no soy abogado de la parte Demandante en este asunto ni parte en este pleito, no teniendo tampoco interés en el mismo.',{
        indent: 36,
        lineGap: 15
    });

    doc.text('Que recibí esta Citación-Emplazamiento el día_______de ______________ de 2011, notificándola personalmente a __________________________________, a su dirección_________________________________________________, o sea, el(la) Demandado(a) en dicha citación, el día______de ____________________ de 2011, a las_________de la_______en_________________, P.R., al dorso de cuya Citación-Emplazamiento hice constar mi firma, la fecha y sitio de su entrega y notificación.',{
        indent: 36,
        lineGap: 15
    });

    doc.text('__________________________',{
        align: 'center'
    });

    doc.text('DILIGENCIANTE',{
        align: 'center',
        lineGap: 15
    });

    doc.text('JURADO Y SUSCRITO ante mi por ___________________________ de las circunstancias personales anteriormente expresadas, y a quien conozco personalmente. En , P.R., a_____ de ___________________ de 2011.',{
         indent: 36,
         lineGap: 15
    });
    
    return doc;
};

module.exports = PDFFactory;