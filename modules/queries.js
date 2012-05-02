var _ = require('underscore');

var dateFormatEN = '%m-%d-%Y';
var dateFormatSP = '%d-%m-%Y';
var hourFormat = '%l:%i %p';

var variableToColumn = {
    presentacion: "presentacion = STR_TO_DATE(?, '" + dateFormatEN + "')",
    completado: "completado = ?",
    ultimoReexamen: "ultimo_reexamen = STR_TO_DATE(?, '" + dateFormatEN + "')",
    incumplimiento: "incumplimiento = ?",
    caso: "caso = ?",
    sala: "sala = ?",
    hora: "hora = STR_TO_DATE(?, '" + hourFormat + "')",
    primeraComparecencia: "primera_comparecencia = STR_TO_DATE(?, '" + dateFormatEN + "')",
    segundaComparecencia: "segunda_comparecencia = STR_TO_DATE(?, '" + dateFormatEN + "')",
    vistaFondo: "vista_en_su_fondo = STR_TO_DATE(?, '" + dateFormatEN + "')",
    sentencia: "sentencia = STR_TO_DATE(?, '" + dateFormatEN + "')",
    lanzamiento: "lanzamiento = STR_TO_DATE(?, '" + dateFormatEN + "')",
    lanzamientoRecibido: "lanzamiento_recibido = STR_TO_DATE(?, '" + dateFormatEN + "')",
    observaciones: "observaciones = ?",
    rediligenciar: "rediligenciar = ?",
    ejecutar: "ejecutar = ?",
    haLugar: "ha_lugar = ?",
    rebeldia: "rebeldia = ?",
    desistido: "desistido = ?"
};

module.exports = {
    getCasos: function(){
       return { 
           query: "SELECT \
               ca.id, \
               ca.residencial AS 'residencialId', \
               ( SELECT \
                       `residencial` \
                   FROM Residenciales re \
                   WHERE re.id = ca.residencial \
               ) AS 'residencial', \
               edificio AS 'edificio', \
               apartamento AS 'apartamento', \
               area AS 'area', \
               nombre AS 'nombre', \
               DATE_FORMAT(caso_recibido, '" + dateFormatEN + "') AS 'casoRecibido', \
               seleccionado AS 'seleccionado', \
               completado AS 'completado', \
               ca.causal AS 'causalId', \
               ( SELECT \
                       `causal`\
                   FROM Causales cau\
                   WHERE cau.id = ca.causal\
               )  AS 'causal', \
                ( SELECT \
                        `siglas`\
                    FROM Causales cau\
                    WHERE cau.id = ca.causal\
                )  AS 'causalIniciales', \
               renta_mensual AS 'rentaMensual', \
               meses_adeudados AS 'mesesAdeudados', \
               deuda_renta AS 'deudaRenta', \
               deuda_renta_negativa AS 'deudaRentaNegativa', \
               DATE_FORMAT(deuda_recibida, '" + dateFormatEN + "') AS 'deudaRecibida', \
               deuda_total AS 'deudaTotal', \
               DATE_FORMAT(ultimo_reexamen, '" + dateFormatEN + "') AS 'ultimoReexamen', \
               incumplimiento AS 'incumplimiento', \
               caso AS 'caso', \
               DATE_FORMAT(presentacion, '" + dateFormatEN + "') AS 'presentacion', \
               diligenciado AS 'diligenciado', \
               diligenciado_en AS 'diligenciadoEn', \
               sala AS 'sala', \
               DATE_FORMAT(hora, '" + hourFormat + "') AS 'hora', \
               DATE_FORMAT(primera_comparecencia, '" + dateFormatEN + "') AS 'primeraComparecencia', \
               DATE_FORMAT(segunda_comparecencia, '" + dateFormatEN + "') AS 'segundaComparecencia', \
               DATE_FORMAT(vista_en_su_fondo, '" + dateFormatEN + "') AS 'vistaFondo', \
               DATE_FORMAT(sentencia, '" + dateFormatEN + "') AS 'sentencia', \
               DATE_FORMAT(lanzamiento, '" + dateFormatEN + "') AS 'lanzamiento', \
               DATE_FORMAT(lanzamiento_recibido, '" + dateFormatEN + "') AS 'lanzamientoRecibido', \
               observaciones AS 'observaciones',\
               rediligenciar AS 'rediligenciar', \
               desistido AS 'desistido', \
               ha_lugar AS 'haLugar', \
               rebeldia AS 'rebeldia', \
               ejecutar AS 'ejecutar'\
           FROM Casos ca;",
           args: []
       }
    },
    getCausales: function(){
        return {
            query: "SELECT \
        		* \
        	FROM Causales;",
        	args: []
        }
    },
    getResidenciales: function(){
        return {
            query: "SELECT \
        		* \
        	FROM Residenciales;",
            args: []
        }
    },
    getCasosPdf: function(casosString){
        return {
            query: "SELECT\
            	id,\
            	( SELECT \
            			`residencial`\
            		FROM Residenciales re\
            		WHERE re.id = ca.residencial\
            	) AS 'residencial',\
            	( SELECT \
            			`tribunal`\
            		FROM Residenciales re\
            		WHERE re.id = ca.residencial\
            	) AS 'tribunal',\
            	edificio AS 'edificio', \
            	apartamento AS 'apartamento', \
            	area AS 'area', \
            	nombre AS 'nombre', \
            	DATE_FORMAT(caso_recibido, '" + dateFormatSP + "') AS 'casoRecibido', \
            	seleccionado AS 'seleccionado', \
            	completado AS 'completado', \
            	( SELECT \
            			`causal`\
            		FROM Causales cau\
            		WHERE cau.id = ca.causal\
            	)  AS 'causal', \
            	renta_mensual AS 'rentaMensual', \
            	meses_adeudados AS 'mesesAdeudados', \
            	deuda_renta AS 'deudaRenta', \
            	deuda_renta_negativa AS 'deudaRentaNegativa', \
            	DATE_FORMAT(deuda_recibida, '" + dateFormatSP + "') AS 'deudaRecibida', \
            	deuda_total AS 'deudaTotal', \
            	DATE_FORMAT(ultimo_reexamen, '" + dateFormatSP + "') AS 'ultimoReexamen', \
            	incumplimiento AS 'incumplimiento', \
            	caso AS 'caso', \
            	DATE_FORMAT(CURDATE(), '" + dateFormatSP + "') AS 'presentacion', \
            	diligenciado AS 'diligenciado', \
            	DATE_FORMAT(diligenciado_en, '" + dateFormatSP + "') AS 'diligenciadoEn', \
            	sala AS 'sala', \
            	DATE_FORMAT(hora, '" + hourFormat + "') AS 'hora', \
            	DATE_FORMAT(primera_comparecencia, '" + dateFormatSP + "') AS 'primeraComparecencia', \
            	DATE_FORMAT(segunda_comparecencia, '" + dateFormatSP + "') AS 'segundaComparecencia', \
            	DATE_FORMAT(vista_en_su_fondo, '" + dateFormatSP + "') AS 'vistaEnSuFondo', \
            	DATE_FORMAT(sentencia, '" + dateFormatSP + "') AS 'sentencia', \
            	DATE_FORMAT(lanzamiento, '" + dateFormatSP + "') AS 'lanzamiento', \
            	observaciones AS 'observaciones'\
            FROM Casos ca\
            WHERE ca.id REGEXP ?;",
            args: ["^(" + casosString + ")$"]
        }
    },
    getCasosInformeDeVistas: function(fecha){
        return {
            query: "SELECT\
            	id,\
            	( SELECT \
            			`residencial`\
            		FROM Residenciales re\
            		WHERE re.id = ca.residencial\
            	) AS 'residencial',\
            	( SELECT \
            			`tribunal`\
            		FROM Residenciales re\
            		WHERE re.id = ca.residencial\
            	) AS 'tribunal',\
            	edificio AS 'edificio', \
            	apartamento AS 'apartamento', \
            	area AS 'area', \
            	nombre AS 'nombre', \
            	DATE_FORMAT(caso_recibido, '" + dateFormatSP + "') AS 'casoRecibido', \
            	seleccionado AS 'seleccionado', \
            	completado AS 'completado', \
            	( SELECT \
            			`causal`\
            		FROM Causales cau\
            		WHERE cau.id = ca.causal\
            	)  AS 'causal', \
            	( SELECT \
                        `siglas`\
                    FROM Causales cau\
                    WHERE cau.id = ca.causal\
                )  AS 'causalIniciales', \
            	renta_mensual AS 'rentaMensual', \
            	meses_adeudados AS 'mesesAdeudados', \
            	deuda_renta AS 'deudaRenta', \
            	deuda_renta_negativa AS 'deudaRentaNegativa', \
            	DATE_FORMAT(deuda_recibida, '" + dateFormatSP + "') AS 'deudaRecibida', \
            	deuda_total AS 'deudaTotal', \
            	DATE_FORMAT(ultimo_reexamen, '" + dateFormatSP + "') AS 'ultimoReexamen', \
            	incumplimiento AS 'incumplimiento', \
            	caso AS 'caso', \
            	DATE_FORMAT(presentacion, '" + dateFormatSP + "') AS 'presentacion', \
            	diligenciado AS 'diligenciado', \
            	DATE_FORMAT(diligenciado_en, '" + dateFormatSP + "') AS 'diligenciadoEn', \
            	sala AS 'sala', \
            	DATE_FORMAT(hora, '" + hourFormat + "') AS 'hora', \
            	DATE_FORMAT(primera_comparecencia, '" + dateFormatSP + "') AS 'primeraComparecencia', \
            	DATE_FORMAT(segunda_comparecencia, '" + dateFormatSP + "') AS 'segundaComparecencia', \
            	DATE_FORMAT(vista_en_su_fondo, '" + dateFormatSP + "') AS 'vistaEnSuFondo', \
            	DATE_FORMAT(sentencia, '" + dateFormatSP + "') AS 'sentencia', \
            	DATE_FORMAT(lanzamiento, '" + dateFormatSP + "') AS 'lanzamiento', \
            	observaciones AS 'observaciones'\
            FROM Casos ca\
            WHERE primera_comparecencia = STR_TO_DATE(?, '" + dateFormatEN + "');",
            args: [fecha]
        }
    },
    getCasosInformeParaDiligenciar: function(fecha){
        // ca.seleccionado = 1 \

        return {
            query: "SELECT \
                ca.seleccionado, \
                ( SELECT \
                        re.residencial\
                    FROM Residenciales re\
                    WHERE re.id = ca.residencial\
                ) AS 'residencial', \
                ca.edificio, \
                ca.apartamento, \
                ca.nombre, \
                ( SELECT \
                        cau.causal\
                    FROM Causales cau\
                    WHERE cau.id = ca.causal\
                )  AS 'causal',  \
                ( SELECT \
                        `siglas`\
                    FROM Causales cau\
                    WHERE cau.id = ca.causal\
                )  AS 'causalIniciales', \
                ca.sala, \
                DATE_FORMAT(ca.presentacion, '" + dateFormatSP + "') AS 'presentacion', \
                ca.caso, \
                ca.diligenciado, \
                DATE_FORMAT(ca.hora, '" + hourFormat + "') as 'hora', \
                DATE_FORMAT(ca.primera_comparecencia, '" + dateFormatSP + "') AS 'primeraComparecencia',  \
                ca.completado\
            FROM Casos ca\
            WHERE (ca.caso IS NOT NULL AND ca.caso <> '')\
            AND ca.diligenciado = 0\
            AND ca.primera_comparecencia = STR_TO_DATE(?, '" + dateFormatEN + "') \
            AND ca.completado = 0\
            ORDER BY ca.caso; ",
            args: [fecha]
        }
    },
    getCasosInformePendienteDeEjecucion: function(){
        var fechaEjecutar = 25;

        return {
            query: "SELECT \
                ca.caso, \
                ( SELECT \
                        re.residencial\
                    FROM Residenciales re\
                    WHERE re.id = ca.residencial\
                ) AS 'residencial', \
                ca.edificio, \
                ca.apartamento, \
                ca.nombre, \
                ca.observaciones, \
                ca.completado, \
                DATE_FORMAT(ca.sentencia, '" + dateFormatSP + "') AS 'sentencia', \
                ca.ejecutar, \
                DATE_FORMAT(ca.lanzamiento, '" + dateFormatSP + "') AS 'lanzamiento', \
                DATE_FORMAT(DATE_ADD(ca.sentencia, INTERVAL " + fechaEjecutar + " DAY), '" + dateFormatSP + "') AS fechaEjecutar, \
                ca.desistido\
            FROM Casos ca\
            GROUP BY \
                ca.caso, \
                ca.residencial, \
                ca.edificio, \
                ca.apartamento, \
                ca.nombre, \
                ca.observaciones, \
                ca.completado, \
                ca.sentencia, \
                ca.ejecutar, \
                ca.lanzamiento, \
                DATE_ADD(ca.sentencia, INTERVAL " + fechaEjecutar + " DAY), \
                ca.Desistido\
            HAVING ca.completado = 0\
            AND ca.sentencia <> '0000-00-00'\
            AND ca.lanzamiento = '0000-00-00'\
            AND (ca.desistido = 0 OR ca.desistido IS NULL)\
            ORDER BY DATE_ADD(ca.sentencia, INTERVAL " + fechaEjecutar + " DAY);",
            args: []
        }
    },
    getCasosInformePresentados: function(from, to){
        //ca.seleccionado = 1\
        return {
            query: "SELECT \
                ca.seleccionado, \
                ( SELECT \
                        re.residencial\
                    FROM Residenciales re\
                    WHERE re.id = ca.residencial\
                ) AS 'residencial', \
                ca.edificio, \
                ca.apartamento, \
                ca.nombre, \
                ( SELECT \
                        cau.causal\
                    FROM Causales cau\
                    WHERE cau.id = ca.causal\
                )  AS 'causal', \
                ( SELECT \
                        `siglas`\
                    FROM Causales cau\
                    WHERE cau.id = ca.causal\
                )  AS 'causalIniciales', \
                ca.incumplimiento, \
                ca.sala, \
                DATE_FORMAT(ca.presentacion, '" + dateFormatSP + "') AS 'presentacion', \
                DATE_FORMAT(ca.primera_comparecencia, '" + dateFormatSP + "') AS 'primera_comparecencia', \
                ca.caso, \
                ca.diligenciado, \
                ca.completado, \
                DATE_FORMAT(ca.ingresado, '" + dateFormatSP + "') AS 'ingresado'\
            FROM Casos ca\
            WHERE (ca.caso IS NULL OR ca.caso = '') \
            AND ca.completado = 0 \
            AND ca.presentacion >= STR_TO_DATE(?, '" + dateFormatEN + "') \
            AND ca.presentacion <= STR_TO_DATE(?, '" + dateFormatEN + "');",
            args: [from, to]
        }
    },
    getCasosInformeFacturacion: function(month, year){
        return {
            query: "SELECT \
                ca.seleccionado, \
                ca.nombre, \
                ( SELECT \
                        re.residencial\
                    FROM Residenciales re\
                    WHERE re.id = ca.residencial\
                ) AS 'residencial', \
                ca.edificio, \
                ca.apartamento, \
                ca.caso, \
                ca.sala, \
                DATE_FORMAT(ca.hora, '" + hourFormat + "') AS 'hora', \
                ( SELECT \
                        cau.causal\
                    FROM Causales cau\
                    WHERE cau.id = ca.causal\
                )  AS 'causal', \
                ( SELECT \
                        cau.siglas\
                    FROM Causales cau\
                    WHERE cau.id = ca.causal\
                )  AS 'causalIniciales', \
                DATE_FORMAT(ca.presentacion, '" + dateFormatSP + "') AS 'presentacion', \
                DATE_FORMAT(ca.primera_comparecencia, '" + dateFormatSP + "') AS 'primeraComparecencia',\
                DATE_FORMAT(ca.segunda_comparecencia, '" + dateFormatSP + "') AS 'segundaComparecencia',\
                DATE_FORMAT(ca.vista_en_su_fondo, '" + dateFormatSP + "') AS 'vistaEnSuFondo',\
                DATE_FORMAT(ca.sentencia, '" + dateFormatSP + "') AS 'sentencia', \
                ca.completado, \
                DATE_FORMAT(ca.lanzamiento, '" + dateFormatSP + "') AS 'lanzamiento', \
                ca.observaciones, \
                ca.desistido\
            FROM Casos ca\
            WHERE ca.completado = 0 \
            AND MONTH(presentacion) = ?\
            AND YEAR(presentacion) = ?\
            ORDER BY \
                ca.residencial, \
                ca.edificio, \
                ca.apartamento;",
            args: [month, year]
        }
    },
    createCaso: function(residencial,edificio, apartamento, area, nombre,casoRecibido, seleccionado, completado, causal, rentaMensual, mesesAdeudados, deudaRenta, deudaRentaNegativa, deudaRecibida, deudaTotal, ultimoReexamen, incumplimiento, caso, presentacion, diligenciado, diligenciadoEn, sala, hora, primeraComparecencia, segundaComparecencia, vistaFondo, sentencia, lanzamiento, observaciones){
        return {
            query:"INSERT INTO Casos\
            (\
            	residencial,\
            	edificio, \
            	apartamento, \
            	area, \
            	nombre, \
            	caso_recibido, \
            	seleccionado, \
            	completado, \
            	causal, \
            	renta_mensual, \
            	meses_adeudados, \
            	deuda_renta, \
            	deuda_renta_negativa, \
            	deuda_recibida, \
            	deuda_total, \
            	ultimo_reexamen, \
            	incumplimiento, \
            	caso, \
            	presentacion, \
            	diligenciado, \
            	diligenciado_en, \
            	sala, \
            	hora, \
            	primera_comparecencia, \
            	segunda_comparecencia, \
            	vista_en_su_fondo, \
            	sentencia, \
            	lanzamiento, \
            	observaciones\
            )\
            VALUES\
            (\
            	?,\
            	?, \
            	?, \
            	?, \
            	?,\
            	STR_TO_DATE(?, '" + dateFormatEN + "'), \
            	?, \
            	?, \
            	?, \
            	?, \
            	?, \
            	?, \
            	?, \
            	STR_TO_DATE(?, '" + dateFormatEN + "'), \
            	?, \
            	STR_TO_DATE(?, '" + dateFormatEN + "'), \
            	?, \
            	?, \
            	STR_TO_DATE(?, '" + dateFormatEN + "'), \
            	?, \
            	?, \
            	?, \
                STR_TO_DATE(?, '" + hourFormat + "'), \
            	STR_TO_DATE(?, '" + dateFormatEN + "'), \
            	STR_TO_DATE(?, '" + dateFormatEN + "'), \
            	STR_TO_DATE(?, '" + dateFormatEN + "'), \
            	STR_TO_DATE(?, '" + dateFormatEN + "'), \
            	STR_TO_DATE(?, '" + dateFormatEN + "'), \
            	?\
            );",
            args: [
                residencial,
            	edificio, 
            	apartamento, 
            	area, 
            	nombre,
            	casoRecibido, 
            	seleccionado, 
            	completado, 
            	causal, 
            	rentaMensual, 
            	mesesAdeudados, 
            	deudaRenta, 
            	deudaRentaNegativa, 
            	deudaRecibida, 
            	deudaTotal, 
            	ultimoReexamen, 
            	incumplimiento, 
            	caso, 
            	presentacion, 
            	diligenciado, 
            	diligenciadoEn, 
            	sala, 
            	hora, 
            	primeraComparecencia, 
            	segundaComparecencia, 
            	vistaFondo, 
            	sentencia, 
            	lanzamiento, 
            	observaciones
        	]
        }
    },
    updateCaso: function(id, residencial,edificio, apartamento, area, nombre,casoRecibido, seleccionado, completado, causal, rentaMensual, mesesAdeudados, deudaRenta, deudaRentaNegativa, deudaRecibida, deudaTotal, ultimoReexamen, incumplimiento, caso, presentacion, diligenciado, diligenciadoEn, sala, hora, primeraComparecencia, segundaComparecencia, vistaFondo, sentencia, lanzamiento, lanzamientoRecibido, observaciones, rediligenciar, ejecutar, desistido, haLugar, rebeldia){
        return {
            query: "UPDATE Casos\
            SET\
            	residencial = ? ,\
            	edificio = ? , \
            	apartamento = ? , \
            	area = ? , \
            	nombre = ? , \
            	caso_recibido = STR_TO_DATE(?, '" + dateFormatEN + "') , \
            	seleccionado = ? , \
            	completado = ? , \
            	causal = ? , \
            	renta_mensual = ? , \
            	meses_adeudados = ? , \
            	deuda_renta = ? , \
            	deuda_renta_negativa = ? , \
            	deuda_recibida = STR_TO_DATE(?, '" + dateFormatEN + "') , \
            	deuda_total = ? , \
            	ultimo_reexamen = STR_TO_DATE(?, '" + dateFormatEN + "') , \
            	incumplimiento = ? , \
            	caso = ? , \
            	presentacion = STR_TO_DATE(?, '" + dateFormatEN + "') , \
            	diligenciado = ? , \
            	diligenciado_en = STR_TO_DATE(?, '" + dateFormatEN + "') , \
            	sala = ? , \
            	hora = STR_TO_DATE(?, '" + hourFormat + "') , \
            	primera_comparecencia = STR_TO_DATE(?, '" + dateFormatEN + "') , \
            	segunda_comparecencia = STR_TO_DATE(?, '" + dateFormatEN + "') , \
            	vista_en_su_fondo = STR_TO_DATE(?, '" + dateFormatEN + "') , \
            	sentencia = STR_TO_DATE(?, '" + dateFormatEN + "') , \
            	lanzamiento = STR_TO_DATE(?, '" + dateFormatEN + "') , \
                lanzamiento_recibido = STR_TO_DATE(?, '" + dateFormatEN + "') , \
            	observaciones = ? ,\
            	rediligenciar = ? ,\
            	ejecutar = ? ,\
                desistido = ?,\
                ha_lugar = ?,\
                rebeldia = ? \
            WHERE\
            Casos.id = ?;",
            args: [
                residencial,
            	edificio, 
            	apartamento, 
            	area, 
            	nombre,
            	casoRecibido, 
            	seleccionado, 
            	completado, 
            	causal, 
            	rentaMensual, 
            	mesesAdeudados, 
            	deudaRenta, 
            	deudaRentaNegativa, 
            	deudaRecibida, 
            	deudaTotal, 
            	ultimoReexamen, 
            	incumplimiento, 
            	caso, 
            	presentacion, 
            	diligenciado, 
            	diligenciadoEn, 
            	sala, 
            	hora, 
            	primeraComparecencia, 
            	segundaComparecencia, 
            	vistaFondo, 
            	sentencia, 
            	lanzamiento,
                lanzamientoRecibido, 
            	observaciones,
            	rediligenciar,
            	ejecutar,
                desistido,
                haLugar,
                rebeldia,
            	id
            ]
        }
    },
    updateCasos: function(ids, args){
        var idsRegex = '^(';
    
        _.each(ids, function(id){
            idsRegex += id + "|";
        });
        
        idsRegex = idsRegex.substring(0, idsRegex.length - 1);
        
        idsRegex += ')$';
        
        var updateArgsClause = '';
        var argsArray = [];

        _.each(args, function(value, arg){
            updateArgsClause += ' ' + variableToColumn[arg] + ' ,';
            argsArray.push(value);
        });

        updateArgsClause = updateArgsClause.substring(0, updateArgsClause.length - 1);
        argsArray.push(idsRegex);

        var query = 'UPDATE Casos SET ';
        
        query += updateArgsClause;
        
        query += ' WHERE Casos.id REGEXP ?;';
        
        return {
            query: query,
            args: argsArray
        }
    }
};
