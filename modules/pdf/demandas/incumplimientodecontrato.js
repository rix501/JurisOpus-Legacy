module.exports = function(demanda){
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

    return incumplimientodecontrato;
};