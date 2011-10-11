module.exports = {
    getCasos: function(){
       return { 
           query: "SELECT \
               ca.id, \
               ( SELECT \
                       `residencial` \
                   FROM Residenciales re \
                   WHERE re.id = ca.residencial \
               ) AS 'residencial', \
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
           FROM Casos ca;".replace(/\\/g,""),
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
    }
};