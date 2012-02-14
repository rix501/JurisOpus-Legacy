module.exports = function(demanda){
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

    return ocupacionilegal;
};