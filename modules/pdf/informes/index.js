var informe = require('./main');
var informedevistas = require('./informedevistas')(informe);
var informeparadiligenciar = require('./informeparadiligenciar')(informe);
var informependientedeejecucion = require('./informependientedeejecucion')(informe);
var informepresentados = require('./informepresentados')(informe);
var informefacturacion = require('./informefacturacion')(informe);

module.exports = (function(){
    return {
        templates:{
            informedevistas: new informedevistas(),
            informeparadiligenciar: new informeparadiligenciar(),
            informependientedeejecucion: new informependientedeejecucion(),
            informepresentados: new informepresentados(),
            informefacturacion: new informefacturacion()
        }
    };
})();