var _ = require('underscore');

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
               DATE_FORMAT(caso_recibido, '%m-%d-%Y') AS 'casoRecibido', \
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
               DATE_FORMAT(deuda_recibida, '%m-%d-%Y') AS 'deudaRecibida', \
               deuda_total AS 'deudaTotal', \
               DATE_FORMAT(ultimo_reexamen, '%m-%d-%Y') AS 'ultimoReexamen', \
               incumplimiento AS 'incumplimiento', \
               caso AS 'caso', \
               DATE_FORMAT(presentacion, '%m-%d-%Y') AS 'presentacion', \
               diligenciado AS 'diligenciado', \
               diligenciado_en AS 'diligenciadoEn', \
               sala AS 'sala', \
               DATE_FORMAT(hora, '%l:%i %p') AS 'hora', \
               DATE_FORMAT(primera_comparecencia, '%m-%d-%Y') AS 'primeraComparecencia', \
               DATE_FORMAT(segunda_comparecencia, '%m-%d-%Y') AS 'segundaComparecencia', \
               DATE_FORMAT(vista_en_su_fondo, '%m-%d-%Y') AS 'vistaEnSuFondo', \
               DATE_FORMAT(sentencia, '%m-%d-%Y') AS 'sentencia', \
               DATE_FORMAT(lanzamiento, '%m-%d-%Y') AS 'lanzamiento', \
               observaciones AS 'observaciones',\
               rediligenciar AS 'rediligenciar', \
               desistido AS 'desistido', \
               ha_lugar AS 'haLugar', \
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
            	caso_recibido AS 'casoRecibido', \
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
            	deuda_recibida AS 'deudaRecibida', \
            	deuda_total AS 'deudaTotal', \
            	ultimo_reexamen AS 'ultimoReexamen', \
            	incumplimiento AS 'incumplimiento', \
            	caso AS 'caso', \
            	presentacion AS 'presentacion', \
            	diligenciado AS 'diligenciado', \
            	diligenciado_en AS 'diligenciadoEn', \
            	sala AS 'sala', \
            	hora AS 'hora', \
            	primera_comparecencia AS 'primeraComparecencia', \
            	segunda_comparecencia AS 'segundaComparecencia', \
            	vista_en_su_fondo AS 'vistaEnSuFondo', \
            	sentencia AS 'sentencia', \
            	lanzamiento AS 'lanzamiento', \
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
            	caso_recibido AS 'casoRecibido', \
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
            	deuda_recibida AS 'deudaRecibida', \
            	deuda_total AS 'deudaTotal', \
            	ultimo_reexamen AS 'ultimoReexamen', \
            	incumplimiento AS 'incumplimiento', \
            	caso AS 'caso', \
            	presentacion AS 'presentacion', \
            	diligenciado AS 'diligenciado', \
            	diligenciado_en AS 'diligenciadoEn', \
            	sala AS 'sala', \
            	hora AS 'hora', \
            	primera_comparecencia AS 'primeraComparecencia', \
            	segunda_comparecencia AS 'segundaComparecencia', \
            	vista_en_su_fondo AS 'vistaEnSuFondo', \
            	sentencia AS 'sentencia', \
            	lanzamiento AS 'lanzamiento', \
            	observaciones AS 'observaciones'\
            FROM Casos ca\
            WHERE primera_comparecencia = ?;",
            args: [fecha]
        }
    },
    getCasosInformeParaDiligenciar: function(fecha){
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
                ca.sala, \
                ca.presentacion, \
                ca.caso, \
                ca.diligenciado, \
                ca.hora, \
                ca.primera_comparecencia AS 'primeraComparecencia',  \
                ca.completado\
            FROM Casos ca\
            WHERE ca.seleccionado = 1 \
            AND ca.caso IS NOT NULL\
            AND ca.diligenciado = 0\
            AND ca.primera_comparecencia = ? \
            AND ca.completado = 0\
            ORDER BY ca.caso; ",
            args: [fecha]
        }
    },
    getCasosInformePendienteDeEjecucion: function(){
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
                ca.sentencia, \
                ca.ejecutar, \
                ca.lanzamiento, \
                DATE_ADD(ca.sentencia, INTERVAL 50 DAY) AS fechaEjecutar, \
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
                DATE_ADD(ca.sentencia, INTERVAL 50 DAY), \
                ca.Desistido\
            HAVING ca.completado = 0\
            AND ca.sentencia <> '0000-00-00'\
            AND ca.lanzamiento = '0000-00-00'\
            AND (ca.desistido = 0 OR ca.desistido IS NULL)\
            ORDER BY DATE_ADD(ca.sentencia, INTERVAL 50 DAY);",
            args: []
        }
    },
    getCasosInformePresentados: function(){
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
                ca.presentacion, \
                ca.primera_comparecencia, \
                ca.caso, \
                ca.Diligenciado, \
                ca.completado, \
                ca.ingresado\
            FROM Casos ca\
            WHERE ca.seleccionado = 1\
            AND (ca.caso IS Null OR ca.caso = '')\
            AND ca.completado = 0;",
            args: []
        }
    },
    getCasosInformeFacturacion: function(){
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
                ca.hora, \
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
                ca.presentacion, \
                ca.primera_comparecencia AS 'primeraComparecencia',\
                ca.segunda_comparecencia AS 'segundaComparecencia',\
                ca.vista_en_su_fondo AS 'vistaEnSuFondo',\
                ca.sentencia, \
                ca.completado, \
                ca.lanzamiento, \
                ca.observaciones, \
                ca.desistido\
            FROM Casos ca\
            WHERE ca.completado = 0\
            ORDER BY \
                ca.residencial, \
                ca.edificio, \
                ca.apartamento;",
            args: []
        }
    },
    getCasosSeleccion: function(){
        return {
            query: "SELECT\
                id,\
                ( SELECT \
                        `residencial`\
                    FROM Residenciales re\
                    WHERE re.id = ca.residencial\
                ) AS 'residencial',\
                edificio AS 'edificio', \
                apartamento AS 'apartamento', \
                area AS 'area', \
                nombre AS 'nombre', \
                caso_recibido AS 'casoRecibido', \
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
                deuda_recibida AS 'deudaRecibida', \
                deuda_total AS 'deudaTotal', \
                ultimo_reexamen AS 'ultimoReexamen', \
                incumplimiento AS 'incumplimiento', \
                caso AS 'caso', \
                presentacion AS 'presentacion', \
                diligenciado AS 'diligenciado', \
                diligenciado_en AS 'diligenciadoEn', \
                sala AS 'sala', \
                hora AS 'hora', \
                primera_comparecencia AS 'primeraComparecencia', \
                segunda_comparecencia AS 'segundaComparecencia', \
                vista_en_su_fondo AS 'vistaEnSuFondo', \
                sentencia AS 'sentencia', \
                lanzamiento AS 'lanzamiento', \
                observaciones AS 'observaciones'\
            FROM Casos ca\
            WHERE presentacion = '0000-00-00';",
            args: []
        }
    },
    getCaso: function(id){
        return {
            query: "SELECT\
            	ca.id,\
            	( SELECT \
            			`residencial`\
            		FROM Residenciales re\
            		WHERE re.id = ca.residencial\
            	) AS 'residencial',\
            	edificio AS 'edificio', \
            	apartamento AS 'apartamento', \
            	area AS 'area', \
            	nombre AS 'nombre', \
            	caso_recibido AS 'casoRecibido', \
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
            	deuda_recibida AS 'deudaRecibida', \
            	deuda_total AS 'deudaTotal', \
            	ultimo_reexamen AS 'ultimoReexamen', \
            	incumplimiento AS 'incumplimiento', \
            	caso AS 'caso', \
            	presentacion AS 'presentacion', \
            	diligenciado AS 'diligenciado', \
            	diligenciado_en AS 'diligenciadoEn', \
            	sala AS 'sala', \
            	hora AS 'hora', \
            	primera_comparecencia AS 'primeraComparecencia', \
            	segunda_comparecencia AS 'segundaComparecencia', \
            	vista_en_su_fondo AS 'vistaEnSuFondo', \
            	sentencia AS 'sentencia', \
            	lanzamiento AS 'lanzamiento', \
            	observaciones AS 'observaciones',\
            	rediligenciar AS 'rediligenciar', \
            	ejecutar AS 'ejecutar'\
            FROM Casos ca\
            WHERE ca.id = ?;",
            args: [id]
        }
    },
    createCaso: function(residencial,edificio, apartamento, area, nombre,casoRecibido, seleccionado, completado, causal, rentaMensual, mesesAdeudados, deudaRenta, deudaRentaNegativa, deudaRecibida, deudaTotal, ultimoReexamen, incumplimiento, caso, presentacion, diligenciado, diligenciadoEn, sala, hora, primeraComparecencia, segundaComparecencia, vistaSegundo, sentencia, lanzamiento, observaciones){
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
            	STR_TO_DATE(?, '%m-%d-%Y'), \
            	?, \
            	?, \
            	?, \
            	?, \
            	?, \
            	?, \
            	?, \
            	STR_TO_DATE(?, '%m-%d-%Y'), \
            	?, \
            	STR_TO_DATE(?, '%m-%d-%Y'), \
            	?, \
            	?, \
            	STR_TO_DATE(?, '%m-%d-%Y'), \
            	?, \
            	?, \
            	?, \
                STR_TO_DATE(?, '%l:%i %p'), \
            	STR_TO_DATE(?, '%m-%d-%Y'), \
            	STR_TO_DATE(?, '%m-%d-%Y'), \
            	STR_TO_DATE(?, '%m-%d-%Y'), \
            	STR_TO_DATE(?, '%m-%d-%Y'), \
            	STR_TO_DATE(?, '%m-%d-%Y'), \
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
            	vistaSegundo, 
            	sentencia, 
            	lanzamiento, 
            	observaciones
        	]
        }
    },
    updateCaso: function(id, residencial,edificio, apartamento, area, nombre,casoRecibido, seleccionado, completado, causal, rentaMensual, mesesAdeudados, deudaRenta, deudaRentaNegativa, deudaRecibida, deudaTotal, ultimoReexamen, incumplimiento, caso, presentacion, diligenciado, diligenciadoEn, sala, hora, primeraComparecencia, segundaComparecencia, vistaSegundo, sentencia, lanzamiento, observaciones, rediligenciar, ejecutar){
        return {
            query: "UPDATE Casos\
            SET\
            	residencial = ? ,\
            	edificio = ? , \
            	apartamento = ? , \
            	area = ? , \
            	nombre = ? , \
            	caso_recibido = ? , \
            	seleccionado = ? , \
            	completado = ? , \
            	causal = ? , \
            	renta_mensual = ? , \
            	meses_adeudados = ? , \
            	deuda_renta = ? , \
            	deuda_renta_negativa = ? , \
            	deuda_recibida = ? , \
            	deuda_total = ? , \
            	ultimo_reexamen = ? , \
            	incumplimiento = ? , \
            	caso = ? , \
            	presentacion = ? , \
            	diligenciado = ? , \
            	diligenciado_en = ? , \
            	sala = ? , \
            	hora = ? , \
            	primera_comparecencia = ? , \
            	segunda_comparecencia = ? , \
            	vista_en_su_fondo = ? , \
            	sentencia = ? , \
            	lanzamiento = ? , \
            	observaciones = ? ,\
            	rediligenciar = ? ,\
            	ejecutar = ? \
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
            	vistaSegundo, 
            	sentencia, 
            	lanzamiento, 
            	observaciones,
            	rediligenciar,
            	ejecutar,
            	id
            ]
        }
    },
    updateBulk: function(ids, sala, dia, hora){
        var idsRegex = '^(';
        
        _.each(ids, function(id){
            idsRegex += id + "|";
        });
        
        idsRegex = idsRegex.substring(0, idsRegex.length - 1);
        
        idsRegex += ')$';
        
        var query = "UPDATE Casos\
        SET ";
        
        (_.isEmpty(dia)) ? " " : query += " presentacion = ? , ";
        (_.isEmpty(sala)) ? " " : query += " sala = ? , "; 
        (_.isEmpty(hora)) ? " " : query += " hora = ?  "; 
        
        query += "WHERE\
        Casos.id REGEXP ?;";
        
        return {
            query: query,
            args: [
            	dia, 
            	sala, 
            	hora, 
            	idsRegex
            ]
        }
    },
    getSearchCasosNombre: function(nombre){
        return {
            query: "SELECT\
                id,\
                ( SELECT \
                        `residencial`\
                    FROM Residenciales re\
                    WHERE re.id = ca.residencial\
                ) AS 'residencial',\
                edificio AS 'edificio', \
                apartamento AS 'apartamento', \
                area AS 'area', \
                nombre AS 'nombre', \
                caso_recibido AS 'casoRecibido', \
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
                deuda_recibida AS 'deudaRecibida', \
                deuda_total AS 'deudaTotal', \
                ultimo_reexamen AS 'ultimoReexamen', \
                incumplimiento AS 'incumplimiento', \
                caso AS 'caso', \
                presentacion AS 'presentacion', \
                diligenciado AS 'diligenciado', \
                diligenciado_en AS 'diligenciadoEn', \
                sala AS 'sala', \
                hora AS 'hora', \
                primera_comparecencia AS 'primeraComparecencia', \
                segunda_comparecencia AS 'segundaComparecencia', \
                vista_en_su_fondo AS 'vistaEnSuFondo', \
                sentencia AS 'sentencia', \
                lanzamiento AS 'lanzamiento', \
                observaciones AS 'observaciones'\
            FROM Casos ca\
            WHERE ca.nombre like ? ;",
            args: ['%' + nombre + '%']
        }
    },
    getSearchCasosCaso: function(caso){
        return {
            query: "SELECT\
                id,\
                ( SELECT \
                        `residencial`\
                    FROM Residenciales re\
                    WHERE re.id = ca.residencial\
                ) AS 'residencial',\
                edificio AS 'edificio', \
                apartamento AS 'apartamento', \
                area AS 'area', \
                nombre AS 'nombre', \
                caso_recibido AS 'casoRecibido', \
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
                deuda_recibida AS 'deudaRecibida', \
                deuda_total AS 'deudaTotal', \
                ultimo_reexamen AS 'ultimoReexamen', \
                incumplimiento AS 'incumplimiento', \
                caso AS 'caso', \
                presentacion AS 'presentacion', \
                diligenciado AS 'diligenciado', \
                diligenciado_en AS 'diligenciadoEn', \
                sala AS 'sala', \
                hora AS 'hora', \
                primera_comparecencia AS 'primeraComparecencia', \
                segunda_comparecencia AS 'segundaComparecencia', \
                vista_en_su_fondo AS 'vistaEnSuFondo', \
                sentencia AS 'sentencia', \
                lanzamiento AS 'lanzamiento', \
                observaciones AS 'observaciones'\
            FROM Casos ca\
            WHERE ca.caso like ? ;",
            args: ['%' + caso + '%']
        }
    },
    getSearchCasosAptEdifResi: function(resi, apt, edif){
        return {
            query: "SELECT\
                ca.id,\
                ( SELECT \
                        `residencial`\
                    FROM Residenciales re\
                    WHERE re.id = ca.residencial\
                ) AS 'residencial',\
                ca.edificio AS 'edificio', \
                ca.apartamento AS 'apartamento', \
                ca.area AS 'area', \
                ca.nombre AS 'nombre', \
                ca.caso_recibido AS 'casoRecibido', \
                ca.seleccionado AS 'seleccionado', \
                ca.completado AS 'completado', \
                ( SELECT \
                        `causal`\
                    FROM Causales cau\
                    WHERE cau.id = ca.causal\
                )  AS 'causal', \
                ca.renta_mensual AS 'rentaMensual', \
                ca.meses_adeudados AS 'mesesAdeudados', \
                ca.deuda_renta AS 'deudaRenta', \
                ca.deuda_renta_negativa AS 'deudaRentaNegativa', \
                ca.deuda_recibida AS 'deudaRecibida', \
                ca.deuda_total AS 'deudaTotal', \
                ca.ultimo_reexamen AS 'ultimoReexamen', \
                ca.incumplimiento AS 'incumplimiento', \
                ca.caso AS 'caso', \
                ca.presentacion AS 'presentacion', \
                ca.diligenciado AS 'diligenciado', \
                ca.diligenciado_en AS 'diligenciadoEn', \
                ca.sala AS 'sala', \
                ca.hora AS 'hora', \
                ca.primera_comparecencia AS 'primeraComparecencia', \
                ca.segunda_comparecencia AS 'segundaComparecencia', \
                ca.vista_en_su_fondo AS 'vistaEnSuFondo', \
                ca.sentencia AS 'sentencia', \
                ca.lanzamiento AS 'lanzamiento', \
                ca.observaciones AS 'observaciones'\
            FROM Casos ca\
            WHERE ca.residencial = ?\
            AND ca.apartamento = ?\
            AND ca.edificio = ?;",
            args: [resi,apt,edif]
        }
    }
};
