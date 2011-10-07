var pdf = require('./pdf');

var tribunalHeaders = {
    'sanjuan': 'SALA SUPERIOR DE SAN JUAN'
};

//Implementacion de Contrato - OI
//Ocupacion Ilegal - IC
//Re-Examen - RE
//Pago y de Re-Examen - FR
//Falta de Pago - FP

var demanda = pdf.makeSubclass();
demanda.prototype.draw = function(doc, data){
   var y, x, width, height;
   
   if(doc === undefined || doc === null){
       doc = pdf.prototype.build.call(this);
   }
      
   if(doc.pages.length > 1){
       doc.addPage();
   }
   
   data.year = new Date().getFullYear();
   
   this.drawFirstPage(doc, data);
   this.drawFirstPage(doc, data);
   
   this.drawSecondPage(doc, data, false);
   this.drawThirdPage(doc, data);
   this.drawSecondPage(doc, data, false);
   this.drawThirdPage(doc, data);
   
   //Copy
   this.drawSecondPage(doc, data, true);
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

    doc.moveUp(10);

    doc.text('CIVIL NUM. ' + data.caso, doc.x + 300, doc.y);

    doc.moveDown(2);

    doc.text('(            )', doc.x + 40, doc.y);

    doc.moveDown(2);

    doc.text('SOBRE:', doc.x, doc.y);    

    doc.moveDown();

    //Changes
    doc.text(data.causalDescription, doc.x - 90, doc.y,{
      width:230,
      align:'center'
    });

    doc.moveDown();

    doc.x = 0;
    doc.y = 261.75;
        
    doc.text('DEMANDA',doc.x,doc.y,{
      width: 612,
      align: 'center',
      lineGap: 10
    });

    doc.x = 72;

    doc.text('AL HONORABLE TRIBUNAL:', doc.x, doc.y,{
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
    .text("en San Juan, P.R., a " + data.presentacion + ".", 288, doc.y - 12, {
       align: 'justify'
    });

    doc.moveDown();

    //Changes if more than one user
    doc.text("HECTOR A. SANTIAGO ROMERO (RUA 10101)",doc.x - 15, doc.y)
    .text("Abogados parte Demandante")
    .text("PMB 273,")
    .text("PO Box 2500,")
    .text("Trujillo Alto, PR  00977-2500.")
    .text("Tel. (787) 294-6397, 6398 / Fax (787) 294-6399")
    .text("hasantiago.law@gmail.com");
    
    doc.x = 72;
    
    doc.text("*17 LPRA sección 103", doc.x , doc.y + 5)
    .text("**La parte Demandante renuncia al término de diez (10) días para señalar vista contenido en la Ley #129 de 27 de septiembre de 2007." ,{
       align: 'justify'
    });


    this.drawFooterLine(doc, doc.x,  doc.y);

    /**** NEW BLANK PAGE ****/

    doc.addPage({
       size: "legal"
    });
};
demanda.prototype.drawSecondPage = function(doc, data, isCopy){
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

    doc.moveUp(10);

    doc.text('CIVIL NUM. ' + data.caso, doc.x + 300, doc.y);

    doc.moveDown(2);

    doc.text('(            )', doc.x + 40, doc.y);

    doc.moveDown(2);

    doc.text('SOBRE:', doc.x, doc.y);    

    doc.moveDown();

    //Changes
    doc.text(data.causalDescription, doc.x - 90, doc.y,{
    width:230,
    align:'center'
    });

    doc.moveDown();

    // 

    doc.moveDown();

    width = doc.widthOfString('CITACION Y EMPLAZAMIENTO');
    height = doc.currentLineHeight();

    doc.text('CITACION Y EMPLAZAMIENTO',doc.x - 100)
     .moveTo(doc.x, doc.y - 2)
     .lineTo(doc.x + width, doc.y - 2)
     .stroke();    

    doc.x = 72;

    doc.text('ESTADOS UNIDOS DE NORTE AMERICA', doc.x , doc.y + 10,{
      align: 'justify'
    })
    .text("EL PRESIDENTE DE LOS ESTADOS UNIDOS")
    .text("EL ESTADO LIBRE ASOCIADO DE PUERTO RICO");

    doc.moveDown();

    doc.font('Arial')
    .text('A. '+ data.nombre,{
      indent: 36
    })
    .text('RESIDENCIAL ' + data.residencial,{
      indent: 36
    })
    .text('EDIF. ' + data.edificio + ' APTO. ' + data.apartamento,{
      indent: 36
    })
    .text('SAN JUAN PR',{
      indent: 36
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

    doc.text('POR CUANTO: De conformidad al Artículo 624 del Código de Enjuiciamiento Civil, 32 L.P.R.A. 2825, quedan citadas las partes para que comparezcan a vista el día _______ de ______________ de ' + data.year + ', a las _______ de la ___ en el Tribunal de Primera Instancia de Puerto Rico, Sala de San Juan, Puerto Rico. SE LE APERCIBE que de no comparecer se dictará Sentencia sin más citarle ni oírle, declarando CON LUGAR la demanda y ordenando su lanzamiento y de cuantas personas se encuentren en la ocupación del inmueble bajo o en virtud de la autoridad de la parte demandada.',{
         indent: 36,
         lineGap: 10
    });

    doc.text('POR LO TANTO: Usted, la parte Demandada, por la presente es requerida y citada oficialmente para que se sirva comparecer a la Sala de este Tribunal, según señalado.',{
         indent: 36,
         lineGap: 10
    });         

    doc.text('Expedida bajo mi firma, y el sello del Tribunal, hoy día _______ de ______ de ' + data.year,{
         indent: 36,
         lineGap: 10
    });
    
    doc.moveDown(3);
    
    doc.text('SECRETARIA(O)',{
        width:468,
        align:'center'
    });
    
    doc.moveDown();
    
    if(isCopy){
        //Only thing different
        doc.text('(COPIA)',{
             indent: 36
        });
    }
    else{
        doc.moveDown();
    }
    
    doc.moveDown();
    
    doc.text('Por:',{
        width:348,
        align:'center'
    });
    doc.font('Arial-Bold');
    doc.text('SECRETARIA(O) AUXILIAR',{
        width:468,
        align:'center'
    });
};
demanda.prototype.drawThirdPage = function(doc, data){
    var y, x, width, height;

    doc.addPage({
       size: "legal"
    });
    
    doc.font('Arial');
    
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

    doc.text('Que recibí esta Citación-Emplazamiento el día_______de ______________ de  ' + data.year + ', notificándola personalmente a __________________________________, a su dirección_________________________________________________, o sea, el(la) Demandado(a) en dicha citación, el día______de ____________________ de  ' + data.year + ', a las_________de la_______en_________________,  P.R., al dorso de cuya Citación-Emplazamiento hice constar mi firma, la fecha y sitio de su entrega y notificación.',{
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

    doc.text('JURADO Y SUSCRITO ante mi por ___________________________ de las circunstancias personales anteriormente expresadas, y a quien conozco personalmente. En ,',{
        indent: 36,
        lineGap: 15
    })
    .text('P.R., a_____ de ___________________ de  ' + data.year + '.',{
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
    doc.text("3. La parte demandada ha incumplido con su contrato al no pagar el canon mensual pactado, por lo que adeuda al presente la suma de $"+ data.deudaTotal +", por lo que la parte compareciente se ha visto obligada a presentar la presente acción.*",{
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
    doc.text("1. La parte compareciente es el agente administrador de cierto edificio propiedad de la Administración de Vivienda Pública, conocido como Residencial "+ data.residencial +", ubicado en el Municipio de " + data.muncipio +".",{
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

var reexamen = demanda.makeSubclass();
reexamen.prototype.draw = function(doc, data){
    data.causalDescription = 'DESAHUCIO POR INCUMPLIMIENTO DE CONTRATO';
    
    return demanda.prototype.draw.call(this, doc, data);
};
reexamen.prototype.drawBullets = function(doc,data){
    doc.text("1. La parte compareciente es el agente administrador de cierto edificio propiedad de la Administración de Vivienda Pública, conocido como Residencial " + data.residencial +", ubicado en el Municipio de " + data.municipio +"*.",{
        indent: 72,
        align: 'justify',
        lineGap: 10
    })
    .text("2. La parte Demandada ocupa el apartamento apartamento del edificio edificio de dicho complejo, y a pesar de los requerimientos de la parte compareciente para que desaloje el mismo sin necesidad de tener que recurrir ante este Hon. Tribunal, la parte Demandada no ha desalojado el mismo.",{
        indent: 72,
        align: 'justify',
        lineGap: 10
    })
    .text("3. La parte demandada incumplió con el contrato de arrendamiento por no haber realizado su recertificación anual.",{
        indent: 72,
        align: 'justify',
        lineGap: 10
    })
    .text("4. Mediante la presente se informa que la dirección postal de la parte Demandante es la siguiente:",{
        indent: 72,
        align: 'justify',
        lineGap: 10
    });
};

var incumplimientodecontrato = demanda.makeSubclass();
incumplimientodecontrato.prototype.draw = function(doc, data){
    data.causalDescription = 'DESAHUCIO POR INCUMPLIMIENTO DE CONTRATO';
    
    return demanda.prototype.draw.call(this, doc, data);
};
incumplimientodecontrato.prototype.drawBullets = function(doc,data){
    doc.text("1. La parte compareciente es el agente administrador de cierto edificio propiedad de la Administración de Vivienda Pública, conocido como Residencial " + data.residencial +", ubicado en el Municipio de " + data.municipio +"*.",{
        indent: 72,
        align: 'justify',
        lineGap: 10
    })
    .text("2. La parte Demandada ocupa en el residencial " + data.residencial +" apartamento " + data.apartamento +", edificio  " + data.edificio +" de dicho complejo, y a pesar de los requerimientos de la parte compareciente para que desaloje el mismo sin necesidad de tener que recurrir ante este Hon. Tribunal, la parte Demandada no ha desalojado el mismo.",{
        indent: 72,
        align: 'justify',
        lineGap: 10
    })
    .text("3. La parte demandada incumplió con el contrato de arrendamiento por no haber cumplido con los " + data.incumplimientos +" pactados.",{
        indent: 72,
        align: 'justify',
        lineGap: 10
    })
    .text("4. Mediante la presente se informa que la dirección de la parte Demandante es la siguiente:",{
        indent: 72,
        align: 'justify',
        lineGap: 10
    });
};

var pagoyreexamen = demanda.makeSubclass();
pagoyreexamen.prototype.draw = function(doc, data){
    data.causalDescription = 'DESAHUCIO POR INCUMPLIMIENTO DE CONTRATO, FALTA DE PAGO';
    
    return demanda.prototype.draw.call(this, doc, data);
};
pagoyreexamen.prototype.drawBullets = function(doc,data){
    doc.text("1. La parte compareciente es el agente administrador de cierto edificio propiedad de la Administración de Vivienda Pública, conocido como Residencial " + data.residencial +", ubicado en el Municipio de San Juan.",{
        indent: 72,
        align: 'justify',
        lineGap: 10
    })
    .text("2. La parte Demandada ocupa el apartamento " + data.apartamento +" en el edificio " + data.edificio +" de dicho complejo en virtud de un contrato de arrendamiento.",{
        indent: 72,
        align: 'justify',
        lineGap: 10
    })
    .text("3. La parte demandada ha incumplido con su contrato al no pagar el canon mensual pactado, por lo que adeuda al presente la suma de  $"+ data.deudaTotal +", por lo que la parte compareciente se ha visto obligada a presentar la presente acción.*",{
        indent: 72,
        align: 'justify',
        lineGap: 10
    })
    .text("4. La parte demandada incumplió con el contrato de arrendamiento por no haber realizado su recertificación anual.",{
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

var test = pdf.makeSubclass();
test.prototype.draw = function(doc, data){
   var y, x, width, height;
   
   if(doc === undefined || doc === null){
       doc = pdf.prototype.build.call(this);
   }
      
   if(doc.pages.length > 1){
       doc.addPage();
   }

   
   return doc;
};

module.exports = (function(){
    return {
        templates:{
            ocupacionilegal: new ocupacionilegal(),
            faltadepago: new faltadepago(),
            reexamen: new reexamen(),
            incumplimientodecontrato: new incumplimientodecontrato(),
            cobroydereexamen: new pagoyreexamen(),
            test: new test()
        }
    };
})();