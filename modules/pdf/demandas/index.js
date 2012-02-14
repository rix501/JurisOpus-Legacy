var demanda = require('./main');
var ocupacionilegal = require('./ocupacionilegal')(demanda);
var faltadepago = require('./faltadepago')(demanda);
var reexamen = require('./reexamen')(demanda);
var incumplimientodecontrato = require('./incumplimientodecontrato')(demanda);
var pagoyreexamen = require('./pagoyreexamen')(demanda);

module.exports = (function(){
    return {
        templates:{
            ocupacionilegal: new ocupacionilegal(),
            faltadepago: new faltadepago(),
            reexamen: new reexamen(),
            incumplimientodecontrato: new incumplimientodecontrato(),
            cobroydereexamen: new pagoyreexamen()
        }
    };
})();