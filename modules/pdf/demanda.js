var pdf = require('./pdf');

var tribunalHeaders = {
    'sanjuan': 'SALA SUPERIOR DE SAN JUAN'
};

var demanda = pdf.makeSubclass();
demanda.prototype.draw = function(doc, data){
   var y, x, width, height;
   
   if(doc === undefined || doc === null){
       doc = pdf.prototype.build.call(this);
   }
      
   if(doc.pages.length > 1){
       doc.addPage();
   }

   this.drawFirstPage(doc, data);
   
   /**** NEW PAGE ****/
   this.drawSecondPage(doc, data);

   /**** NEW PAGE ****/
   this.drawThirdPage(doc, data);
   
   return doc;
};
demanda.prototype.drawFirstPage = function(doc, data){
    var y, x, width, height;
    
    this.drawMarginLines(doc);
    
    doc.font('Arial-Bold', 11)
    .text('ESTADO LIBRE ASOCIADO DE PUERTO RICO',{
       align: 'center'
    })
    .text('TRIBUNAL DE PRIMERA INSTANCIA',{
       align: 'center'
    })
    .text(tribunalHeaders[data.pdfTribunal],{
       align: 'center'
    });   

    doc.moveDown();

    //Changes if more than one user
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
    doc.text('vs.',{
      align: 'center',
      width: 250
    });
    doc.moveDown();
    doc.text(data.nombre,{
      align: 'center',
      width: 250
    })
    .text('Demandados',{
      align: 'center',
      width: 250
    });

    this.drawTopLeftBox(doc, doc.x,  doc.y);

    doc.moveUp();
    doc.moveUp();
    doc.moveUp();
    doc.moveUp();
    doc.moveUp();
    doc.moveUp();
    doc.moveUp();
    doc.moveUp();
    doc.moveUp();

    doc.text('CIVIL NUM. ' + data.caso ,350,0,{
       align:'justify'
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

    //Changes
    doc.text(data.causalDescription,320,0,{
       width:230,
       align:'center'
    });     

    doc.moveDown();

    doc.text('DEMANDA',1,0,{
       width: 612,
       align: 'center',
       lineGap: 10
    });

    doc.text('AL HONORABLE TRIBUNAL:',80,0,{
       align: 'justify',
       lineGap: 10
    });

    doc.font('Arial')
    .text('Comparece la parte Demandante, por conducto de sus abogados que suscriben, y muy respetuosamente expone y solicita:',{
       indent: 36,
       align: 'justify',
       lineGap: 10
    });

    //BULLET POINTS GO HERE
    this.drawBullets(doc, data);

    //Changes if more than one user
    doc.text("Housing Promoters, Inc",{
       indent: 72,
       align: 'justify'
    })
    .text("PO Box 68",{
       indent: 72,
       align: 'justify'
    })
    .text("Saint Just, PR 00978",{
       indent: 72,
       align: 'justify'
    })
    .text("Tel (787) 760-3030",{
       indent: 72,
       align: 'justify',
       lineGap: 10
    })
    .font('Arial-Bold')
    .text("POR TODO LO CUAL, ",{
       indent: 36,
       align: 'justify'
    })
    .font('Arial')
    .moveUp()
    .text("muy respetuosamente se solicita a este Hon. Tribunal decrete con lugar la presente demanda** y ordene el lanzamiento de la parte Demandada y de cualquier persona que en su nombre y/o con su consentimiento ocupe la propiedad descrita en esta Demanda.",{
       indent: 154,
       align: 'justify',
       lineGap: 10
    })
    .font('Arial-Bold')
    .text("RESPETUOSAMENTE SOMETIDA",{
       indent: 36,
       align: 'justify'
    })
    .font('Arial')
    .text("en San Juan, P.R., a " + data.presentacion + ".", 295, doc.y - 12, {
       align: 'justify'
    });

    //Changes if more than one user
    doc.text("HECTOR A. SANTIAGO ROMERO (RUA 10101)",270,0)
    .text("Abogados parte Demandante")
    .text("PMB 273,")
    .text("PO Box 2500,")
    .text("Trujillo Alto, PR  00977-2500.")
    .text("Tel. (787) 294-6397, 6398 / Fax (787) 294-6399")
    .text("hasantiago.law@gmail.com");

    doc.moveDown();

    doc.text("*17 LPRA sección 103", 80, doc.y + 5)
    .text("**La parte Demandante renuncia al término de diez (10) días para señalar vista contenido en la Ley #129 de 27 de septiembre de 2007." ,{
       align: 'justify'
    });


    this.drawFooterLine(doc, doc.x,  doc.y);

    /**** NEW BLANK PAGE ****/

    doc.addPage({
       size: "legal"
    });
};
demanda.prototype.drawSecondPage = function(doc, data){
     var y, x, width, height;
          
     doc.addPage({
         size: "legal"
     });
     
     this.drawMarginLines(doc);

     doc.font('Arial-Bold', 11)
     .text('ESTADO LIBRE ASOCIADO DE PUERTO RICO',{
         align: 'center'
     })
     .text('TRIBUNAL DE PRIMERA INSTANCIA',{
         align: 'center'
     })
     .text(tribunalHeaders[data.tribunal],{
         align: 'center'
     });

     doc.moveDown();

     //Changes if more than one user
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
     doc.text(data.nombre,{
        align: 'center',
        width: 250
     })
     .text('Demandados',{
        align: 'center',
        width: 250
     });

     this.drawTopLeftBox(doc, doc.x,  doc.y);

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

     doc.text('CIVIL NUM. ',350,0,{
         align:'justify'
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

     doc.text(data.causalDescription,330,0,{
         width:215,
         align:'center'
     });     

     doc.moveDown()
     .moveDown();

     width = doc.widthOfString('CITACION Y EMPLAZAMIENTO');
     height = doc.currentLineHeight();

     doc.text('CITACION Y EMPLAZAMIENTO',doc.x - 100)
        .moveTo(doc.x, doc.y - 2)
        .lineTo(doc.x + width, doc.y - 2)
        .stroke();    

     doc.text('ESTADOS UNIDOS DE NORTE AMERICA )', 80, doc.y + 10,{
         align: 'justify'
     })
     .text("EL PRESIDENTE DE LOS ESTADOS UNIDOS")
     .text("EL ESTADO LIBRE ASOCIADO DE PUERTO RICO");

     doc.moveDown();

     doc.font('Arial');

     doc.text('A. '+ data.nombre,{
         indent: 36
     })
     .text('RESIDENCIAL ' + data.residencial,{
         indent: 52
     })
     .text('EDIF. ' + data.edificio + ' APTO. ' + data.apartamento,{
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

     doc.text('POR CUANTO: De conformidad al Artículo 624 del Código de Enjuiciamiento Civil, 32 L.P.R.A. 2825, quedan citadas las partes para que comparezcan a vista el día _______ de ______________ de ____, a las _______ de la A.M. en el Tribunal de Primera Instancia de Puerto Rico, Sala de San Juan, Puerto Rico. SE LE APERCIBE que de no comparecer se dictará Sentencia sin más citarle ni oírle, declarando CON LUGAR la demanda y ordenando su lanzamiento y de cuantas personas se encuentren en la ocupación del inmueble bajo o en virtud de la autoridad de la parte demandada.',{
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
};
demanda.prototype.drawThirdPage = function(doc, data){
    var y, x, width, height;

    doc.addPage({
       size: "legal"
    });

    doc.text('DILIGENCIAMIENTO POR PERSONA PARTICULAR',{
       align: 'center',
       lineGap: 15
    });

    doc.moveDown();

    doc.text('YO,______________________________________, previamente juramentado declaro:',{
       indent: 36,
       lineGap: 15
    });

    doc.text('Que me llamo como queda dicho; soy mayor de 21 años de edad, sé leer y escribir; y no soy abogado de la parte Demandante en este asunto ni parte en este pleito, no teniendo tampoco interés en el mismo.',{
       indent: 36,
       lineGap: 15
    });

    doc.text('Que recibí esta Citación-Emplazamiento el día_______de ______________ de ____, notificándola personalmente a __________________________________, a su dirección_________________________________________________, o sea, el(la) Demandado(a) en dicha citación, el día______de ____________________ de ____, a las_________de la_______en_________________, P.R., al dorso de cuya Citación-Emplazamiento hice constar mi firma, la fecha y sitio de su entrega y notificación.',{
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

    doc.text('JURADO Y SUSCRITO ante mi por ___________________________ de las circunstancias personales anteriormente expresadas, y a quien conozco personalmente. En , P.R., a_____ de ___________________ de ____.',{
        indent: 36,
        lineGap: 15
    });
};

var faltadepago = demanda.makeSubclass();
faltadepago.prototype.draw = function(doc, data){
    data.causalDescription = 'DESAHUCIO POR INCUMPLIMIENTO DE CONTRATO, FALTA DE PAGO ';
    
    return demanda.prototype.draw.call(this, doc, data);
};
faltadepago.prototype.drawBullets = function(doc,data){
    doc.text("1. La parte compareciente es el agente administrador de cierto edificio propiedad de la Administración de Vivienda Pública, conocido como Residencial "+ data.residencial +", ubicado en el Municipio de "+ data.municipio +".",{
        indent: 72,
        align: 'justify',
        lineGap: 10
    })
    .text("2. La parte Demandada ocupa el apartamento "+ data.apartamento +" en el edificio "+ data.residencial +" de dicho complejo en virtud de un contrato de arrendamiento.",{
        indent: 72,
        align: 'justify',
        lineGap: 10
    });

    //This part changes
    doc.text("3. La parte demandada ha incumplido con su contrato al no pagar el canon mensual pactado, por lo que adeuda al presente la suma de "+ data.deudaTotal +", por lo que la parte compareciente se ha visto obligada a presentar la presente acción.*",{
        indent: 72,
        align: 'justify',
        lineGap: 10
    });

    doc.text("4. Mediante la presente se informa que la dirección postal de la parte Demandante es la siguiente:",{
        indent: 72,
        align: 'justify',
        lineGap: 10
    });
};

var ocupacionilegal = demanda.makeSubclass();
ocupacionilegal.prototype.draw = function(doc, data){
    data.causalDescription = 'DESAHUCIO EN PRECARIO';
    
    return demanda.prototype.draw.call(this, doc, data);
};
ocupacionilegal.prototype.drawBullets = function(doc,data){
    doc.text("1. La parte compareciente es el agente administrador de cierto edificio propiedad de la Administración de Vivienda Pública, conocido como Residencial "+ data.residencial +", ubicado en el Municipio de San Juan.",{
        indent: 72,
        align: 'justify',
        lineGap: 10
    })
    .text("2. La parte Demandada ocupa el apartamento "+ data.apartamento +" en el edificio "+ data.edificio +" de dicho complejo en calidad de precarista, sin que medie un contrato de arrendamiento, o autorización alguna para ello.",{
        indent: 72,
        align: 'justify',
        lineGap: 10
    })
    .text("3. La parte demandada se ha negado a desalojar la unidad de vivienda de referencia, a pesar de las gestiones que para esos fines ha realizado la parte demandante.",{
        indent: 72,
        align: 'justify',
        lineGap: 10
    })
    .text("4. Por esta razón la parte compareciente se ha visto obligada a presentar la presente acción.*",{
        indent: 72,
        align: 'justify',
        lineGap: 10
    })
    .text("5. Mediante la presente se informa que la dirección postal de la parte Demandante es la siguiente:",{
        indent: 72,
        align: 'justify',
        lineGap: 10
    });
};

module.exports = (function(){
    return {
        templates:{
            ocupacionilegal: new ocupacionilegal(),
            faltadepago: new faltadepago()
        }
    };
})();