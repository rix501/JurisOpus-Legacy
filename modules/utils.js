var utils = {};

utils.wrapError = function(onError, model, options) {
    return function(resp) {
        if (onError) {
            onError(model, resp, options);
        } else {
            model.trigger('error', model, resp, options);
        }
    };
};

utils.dateToString = function(dateObj, formatString){
    var monthNames = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    
    if(formatString){
        return dateObj.getDate() + " de " + monthNames[dateObj.getMonth()] + " de " +dateObj.getFullYear(); 
    }
    
    return (
        dateObj.getFullYear() + "-" 
        + ( (dateObj.getMonth() + 1).toString().length === 1 ? '0' + (dateObj.getMonth() + 1).toString() : dateObj.getMonth() + 1) + "-"
        + ( (dateObj.getDate() ).toString().length === 1 ? '0' + (dateObj.getDate()).toString() : dateObj.getDate() )
    ); 
};

module.exports = utils;