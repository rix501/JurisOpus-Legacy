module.exports = function(demanda){

    var pagoyreexamen = demanda.makeSubclass();
    pagoyreexamen.prototype.draw = function(doc, data, args){
        data.causalDescription = 'DESAHUCIO POR INCUMPLIMIENTO DE CONTRATO, FALTA DE PAGO';
        
        return demanda.prototype.draw.call(this, doc, data, args);
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

    return pagoyreexamen;
};