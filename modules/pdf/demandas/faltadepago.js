module.exports = function(demanda){
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

    return faltadepago;
};