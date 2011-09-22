# ************************************************************
# Sequel Pro SQL dump
# Version 3408
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: 127.0.0.1 (MySQL 5.5.14)
# Database: JurisOpus
# Generation Time: 2011-09-22 03:15:29 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table Casos
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Casos`;

CREATE TABLE `Casos` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `residencial` int(11) unsigned DEFAULT NULL,
  `edificio` varchar(11) DEFAULT NULL,
  `apartamento` varchar(11) DEFAULT NULL,
  `nombre` varchar(11) DEFAULT NULL,
  `ingresado` date DEFAULT NULL,
  `area` varchar(11) DEFAULT NULL,
  `completado` tinyint(1) DEFAULT NULL,
  `renta_mensual` decimal(11,0) DEFAULT NULL,
  `meses_adeudados` int(11) DEFAULT NULL,
  `deuda_renta` decimal(11,0) DEFAULT NULL,
  `deuda_recargo` decimal(11,0) DEFAULT NULL,
  `deuda_renta_negativa` decimal(11,0) DEFAULT NULL,
  `deuda_total` decimal(11,0) DEFAULT NULL,
  `ultimo_reexamen` date DEFAULT NULL,
  `incumplimiento` varchar(11) DEFAULT NULL,
  `causal` int(11) unsigned DEFAULT NULL,
  `caso` varchar(11) DEFAULT NULL,
  `presentacion` date DEFAULT NULL,
  `sala` varchar(11) DEFAULT NULL,
  `hora` time DEFAULT NULL,
  `primera_comparecencia` date DEFAULT NULL,
  `segunda_comparecencia` date DEFAULT NULL,
  `vista_en_su_fondo` date DEFAULT NULL,
  `lanzamiento` date DEFAULT NULL,
  `observaciones` varchar(11) DEFAULT NULL,
  `sentencia` date DEFAULT NULL,
  `diligenciado` tinyint(1) DEFAULT NULL,
  `seleccionado` tinyint(1) DEFAULT NULL,
  `diligenciado_en` varchar(11) DEFAULT NULL,
  `ejecutar` tinyint(1) DEFAULT NULL,
  `rediligenciar` tinyint(1) DEFAULT NULL,
  `desistido` tinyint(1) DEFAULT NULL,
  `caso_recibido` date DEFAULT NULL,
  `deuda_recibida` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `residencial` (`residencial`),
  KEY `causal` (`causal`),
  CONSTRAINT `casos_ibfk_1` FOREIGN KEY (`residencial`) REFERENCES `Residenciales` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `casos_ibfk_2` FOREIGN KEY (`causal`) REFERENCES `Causales` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table Causales
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Causales`;

CREATE TABLE `Causales` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `causal` varchar(11) DEFAULT NULL,
  `siglas` varchar(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table Residenciales
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Residenciales`;

CREATE TABLE `Residenciales` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `residencial` varchar(11) DEFAULT NULL,
  `num_proyecto` varchar(11) DEFAULT NULL,
  `area` varchar(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;




--
-- Dumping routines (PROCEDURE) for database 'JurisOpus'
--
DELIMITER ;;

# Dump of PROCEDURE Create_Caso
# ------------------------------------------------------------

/*!50003 DROP PROCEDURE IF EXISTS `Create_Caso` */;;
/*!50003 SET SESSION SQL_MODE=""*/;;
/*!50003 CREATE*/ /*!50020 DEFINER=`root`@`localhost`*/ /*!50003 PROCEDURE `Create_Caso`(
	IN p_residencial INT(11), 
	IN p_edificio INT(11), 
	IN p_apartamento VARCHAR(11), 
	IN p_area VARCHAR(11), 
	IN p_nombre VARCHAR(11), 
	IN p_casoRecibido DATE, 
	IN p_seleccionado TINYINT(1), 
	IN p_completado TINYINT(1), 
	IN p_causal INT(11), 
	IN p_rentaMensual DECIMAL(11,0), 
	IN p_mesesAdeudados INT(11), 
	IN p_deudaRenta DECIMAL(11,0), 
	IN p_deudaRentaNegativa DECIMAL(11,0), 
	IN p_deudaRecibida DECIMAL(11,0), 
	IN p_deudaTotal DECIMAL(11,0), 
	IN p_ultimoReexamen DATE, 
	IN p_incumplimiento VARCHAR(11), 
	IN p_caso VARCHAR(11), 
	IN p_presentacion DATE, 
	IN p_diligenciado TINYINT(1), 
	IN p_diligenciadoEn DATE, 
	IN p_sala VARCHAR(11), 
	IN p_hora TIME, 
	IN p_primeraComparecencia DATE, 
	IN p_segundaComparecencia DATE, 
	IN p_vistaSegundo DATE, 
	IN p_sentencia DATE, 
	IN p_lanzamiento DATE, 
	IN p_observaciones VARCHAR(11)
)
BEGIN
	INSERT INTO Casos
	(
		residencial,
		edificio, 
		apartamento, 
		area, 
		nombre, 
		caso_recibido, 
		seleccionado, 
		completado, 
		causal, 
		renta_mensual, 
		meses_adeudados, 
		deuda_renta, 
		deuda_renta_negativa, 
		deuda_recibida, 
		deuda_total, 
		ultimo_reexamen, 
		incumplimiento, 
		caso, 
		presentacion, 
		diligenciado, 
		diligenciado_en, 
		sala, 
		hora, 
		primera_comparecencia, 
		segunda_comparecencia, 
		vista_en_su_fondo, 
		sentencia, 
		lanzamiento, 
		observaciones
	)
	VALUES
	(
		p_residencial,
		p_edificio, 
		p_apartamento, 
		p_area, 
		p_nombre,
		p_casoRecibido, 
		p_seleccionado, 
		p_completado, 
		p_causal, 
		p_rentaMensual, 
		p_mesesAdeudados, 
		p_deudaRenta, 
		p_deudaRentaNegativa, 
		p_deudaRecibida, 
		p_deudaTotal, 
		p_ultimoReexamen, 
		p_incumplimiento, 
		p_caso, 
		p_presentacion, 
		p_diligenciado, 
		p_diligenciadoEn, 
		p_sala, p_hora, 
		p_primeraComparecencia, 
		p_segundaComparecencia, 
		p_vistaSegundo, 
		p_sentencia, 
		p_lanzamiento, 
		p_observaciones
	);
END */;;

/*!50003 SET SESSION SQL_MODE=@OLD_SQL_MODE */;;
# Dump of PROCEDURE Get_Caso
# ------------------------------------------------------------

/*!50003 DROP PROCEDURE IF EXISTS `Get_Caso` */;;
/*!50003 SET SESSION SQL_MODE=""*/;;
/*!50003 CREATE*/ /*!50020 DEFINER=`root`@`localhost`*/ /*!50003 PROCEDURE `Get_Caso`(IN p_id INT(11))
BEGIN
	SELECT
		ca.id,
		( SELECT 
				`residencial`
			FROM Residenciales re
			WHERE re.id = ca.residencial
		) AS 'residencial',
		edificio AS 'edificio', 
		apartamento AS 'apartamento', 
		area AS 'area', 
		nombre AS 'nombre', 
		caso_recibido AS 'casoRecibido', 
		seleccionado AS 'seleccionado', 
		completado AS 'completado', 
		( SELECT 
				`causal`
			FROM Causales cau
			WHERE cau.id = ca.causal
		)  AS 'causal', 
		renta_mensual AS 'rentaMensual', 
		meses_adeudados AS 'mesesAdeudados', 
		deuda_renta AS 'deudaRenta', 
		deuda_renta_negativa AS 'deudaRentaNegativa', 
		deuda_recibida AS 'deudaRecibida', 
		deuda_total AS 'deudaTotal', 
		ultimo_reexamen AS 'ultimoReexamen', 
		incumplimiento AS 'incumplimiento', 
		caso AS 'caso', 
		presentacion AS 'presentacion', 
		diligenciado AS 'diligenciado', 
		diligenciado_en AS 'diligenciadoEn', 
		sala AS 'sala', 
		hora AS 'hora', 
		primera_comparecencia AS 'primeraComparecencia', 
		segunda_comparecencia AS 'segundaComparecencia', 
		vista_en_su_fondo AS 'vistaEnSuFondo', 
		sentencia AS 'sentencia', 
		lanzamiento AS 'lanzamiento', 
		observaciones AS 'observaciones',
		rediligenciar AS 'rediligenciar', 
		ejecutar AS 'ejecutar'
	FROM Casos ca
	WHERE ca.id = p_id;
END */;;

/*!50003 SET SESSION SQL_MODE=@OLD_SQL_MODE */;;
# Dump of PROCEDURE Get_Casos
# ------------------------------------------------------------

/*!50003 DROP PROCEDURE IF EXISTS `Get_Casos` */;;
/*!50003 SET SESSION SQL_MODE=""*/;;
/*!50003 CREATE*/ /*!50020 DEFINER=`root`@`localhost`*/ /*!50003 PROCEDURE `Get_Casos`()
BEGIN
	SELECT 
		( SELECT 
				`residencial`
			FROM Residenciales re
			WHERE re.id = ca.residencial
		) AS 'residencial',
		edificio AS 'edificio', 
		apartamento AS 'apartamento', 
		area AS 'area', 
		nombre AS 'nombre', 
		caso_recibido AS 'casoRecibido', 
		seleccionado AS 'seleccionado', 
		completado AS 'completado', 
		( SELECT 
				`causal`
			FROM Causales cau
			WHERE cau.id = ca.causal
		)  AS 'causal', 
		renta_mensual AS 'rentaMensual', 
		meses_adeudados AS 'mesesAdeudados', 
		deuda_renta AS 'deudaRenta', 
		deuda_renta_negativa AS 'deudaRentaNegativa', 
		deuda_recibida AS 'deudaRecibida', 
		deuda_total AS 'deudaTotal', 
		ultimo_reexamen AS 'ultimoReexamen', 
		incumplimiento AS 'incumplimiento', 
		caso AS 'caso', 
		presentacion AS 'presentacion', 
		diligenciado AS 'diligenciado', 
		diligenciado_en AS 'diligenciadoEn', 
		sala AS 'sala', 
		hora AS 'hora', 
		primera_comparecencia AS 'primeraComparecencia', 
		segunda_comparecencia AS 'segundaComparecencia', 
		vista_en_su_fondo AS 'vistaEnSuFondo', 
		sentencia AS 'sentencia', 
		lanzamiento AS 'lanzamiento', 
		observaciones AS 'observaciones'
	FROM Casos ca;
END */;;

/*!50003 SET SESSION SQL_MODE=@OLD_SQL_MODE */;;
# Dump of PROCEDURE Get_Causales
# ------------------------------------------------------------

/*!50003 DROP PROCEDURE IF EXISTS `Get_Causales` */;;
/*!50003 SET SESSION SQL_MODE=""*/;;
/*!50003 CREATE*/ /*!50020 DEFINER=`root`@`localhost`*/ /*!50003 PROCEDURE `Get_Causales`()
BEGIN
	SELECT 
		*
	FROM Causales;
END */;;

/*!50003 SET SESSION SQL_MODE=@OLD_SQL_MODE */;;
# Dump of PROCEDURE Get_Residenciales
# ------------------------------------------------------------

/*!50003 DROP PROCEDURE IF EXISTS `Get_Residenciales` */;;
/*!50003 SET SESSION SQL_MODE=""*/;;
/*!50003 CREATE*/ /*!50020 DEFINER=`root`@`localhost`*/ /*!50003 PROCEDURE `Get_Residenciales`()
BEGIN
	SELECT 
		*
	FROM Residenciales;
END */;;

/*!50003 SET SESSION SQL_MODE=@OLD_SQL_MODE */;;
# Dump of PROCEDURE Search_Casos_Apt_Edif_Resi
# ------------------------------------------------------------

/*!50003 DROP PROCEDURE IF EXISTS `Search_Casos_Apt_Edif_Resi` */;;
/*!50003 SET SESSION SQL_MODE=""*/;;
/*!50003 CREATE*/ /*!50020 DEFINER=`root`@`localhost`*/ /*!50003 PROCEDURE `Search_Casos_Apt_Edif_Resi`(IN p_apt VARCHAR(11),IN p_edif VARCHAR(11),IN p_resi INT(11))
BEGIN
	SELECT
		ca.id,
		( SELECT 
				`residencial`
			FROM Residenciales re
			WHERE re.id = ca.residencial
		) AS 'residencial',
		ca.edificio AS 'edificio', 
		ca.apartamento AS 'apartamento', 
		ca.area AS 'area', 
		ca.nombre AS 'nombre', 
		ca.caso_recibido AS 'casoRecibido', 
		ca.seleccionado AS 'seleccionado', 
		ca.completado AS 'completado', 
		( SELECT 
				`causal`
			FROM Causales cau
			WHERE cau.id = ca.causal
		)  AS 'causal', 
		ca.renta_mensual AS 'rentaMensual', 
		ca.meses_adeudados AS 'mesesAdeudados', 
		ca.deuda_renta AS 'deudaRenta', 
		ca.deuda_renta_negativa AS 'deudaRentaNegativa', 
		ca.deuda_recibida AS 'deudaRecibida', 
		ca.deuda_total AS 'deudaTotal', 
		ca.ultimo_reexamen AS 'ultimoReexamen', 
		ca.incumplimiento AS 'incumplimiento', 
		ca.caso AS 'caso', 
		ca.presentacion AS 'presentacion', 
		ca.diligenciado AS 'diligenciado', 
		ca.diligenciado_en AS 'diligenciadoEn', 
		ca.sala AS 'sala', 
		ca.hora AS 'hora', 
		ca.primera_comparecencia AS 'primeraComparecencia', 
		ca.segunda_comparecencia AS 'segundaComparecencia', 
		ca.vista_en_su_fondo AS 'vistaEnSuFondo', 
		ca.sentencia AS 'sentencia', 
		ca.lanzamiento AS 'lanzamiento', 
		ca.observaciones AS 'observaciones'
	FROM Casos ca
	WHERE ca.residencial = p_resi
	AND ca.apartamento = p_apt
	AND ca.edificio = p_edif;
END */;;

/*!50003 SET SESSION SQL_MODE=@OLD_SQL_MODE */;;
# Dump of PROCEDURE Search_Casos_Caso
# ------------------------------------------------------------

/*!50003 DROP PROCEDURE IF EXISTS `Search_Casos_Caso` */;;
/*!50003 SET SESSION SQL_MODE=""*/;;
/*!50003 CREATE*/ /*!50020 DEFINER=`root`@`localhost`*/ /*!50003 PROCEDURE `Search_Casos_Caso`(IN p_caso VARCHAR(11))
BEGIN
	SELECT
		id,
		( SELECT 
				`residencial`
			FROM Residenciales re
			WHERE re.id = ca.residencial
		) AS 'residencial',
		edificio AS 'edificio', 
		apartamento AS 'apartamento', 
		area AS 'area', 
		nombre AS 'nombre', 
		caso_recibido AS 'casoRecibido', 
		seleccionado AS 'seleccionado', 
		completado AS 'completado', 
		( SELECT 
				`causal`
			FROM Causales cau
			WHERE cau.id = ca.causal
		)  AS 'causal', 
		renta_mensual AS 'rentaMensual', 
		meses_adeudados AS 'mesesAdeudados', 
		deuda_renta AS 'deudaRenta', 
		deuda_renta_negativa AS 'deudaRentaNegativa', 
		deuda_recibida AS 'deudaRecibida', 
		deuda_total AS 'deudaTotal', 
		ultimo_reexamen AS 'ultimoReexamen', 
		incumplimiento AS 'incumplimiento', 
		caso AS 'caso', 
		presentacion AS 'presentacion', 
		diligenciado AS 'diligenciado', 
		diligenciado_en AS 'diligenciadoEn', 
		sala AS 'sala', 
		hora AS 'hora', 
		primera_comparecencia AS 'primeraComparecencia', 
		segunda_comparecencia AS 'segundaComparecencia', 
		vista_en_su_fondo AS 'vistaEnSuFondo', 
		sentencia AS 'sentencia', 
		lanzamiento AS 'lanzamiento', 
		observaciones AS 'observaciones'
	FROM Casos ca
	WHERE ca.caso like CONCAT('%',p_caso,'%');
END */;;

/*!50003 SET SESSION SQL_MODE=@OLD_SQL_MODE */;;
# Dump of PROCEDURE Search_Casos_Nombre
# ------------------------------------------------------------

/*!50003 DROP PROCEDURE IF EXISTS `Search_Casos_Nombre` */;;
/*!50003 SET SESSION SQL_MODE=""*/;;
/*!50003 CREATE*/ /*!50020 DEFINER=`root`@`localhost`*/ /*!50003 PROCEDURE `Search_Casos_Nombre`(IN p_nombre VARCHAR(11))
BEGIN
	SELECT
		id,
		( SELECT 
				`residencial`
			FROM Residenciales re
			WHERE re.id = ca.residencial
		) AS 'residencial',
		edificio AS 'edificio', 
		apartamento AS 'apartamento', 
		area AS 'area', 
		nombre AS 'nombre', 
		caso_recibido AS 'casoRecibido', 
		seleccionado AS 'seleccionado', 
		completado AS 'completado', 
		( SELECT 
				`causal`
			FROM Causales cau
			WHERE cau.id = ca.causal
		)  AS 'causal', 
		renta_mensual AS 'rentaMensual', 
		meses_adeudados AS 'mesesAdeudados', 
		deuda_renta AS 'deudaRenta', 
		deuda_renta_negativa AS 'deudaRentaNegativa', 
		deuda_recibida AS 'deudaRecibida', 
		deuda_total AS 'deudaTotal', 
		ultimo_reexamen AS 'ultimoReexamen', 
		incumplimiento AS 'incumplimiento', 
		caso AS 'caso', 
		presentacion AS 'presentacion', 
		diligenciado AS 'diligenciado', 
		diligenciado_en AS 'diligenciadoEn', 
		sala AS 'sala', 
		hora AS 'hora', 
		primera_comparecencia AS 'primeraComparecencia', 
		segunda_comparecencia AS 'segundaComparecencia', 
		vista_en_su_fondo AS 'vistaEnSuFondo', 
		sentencia AS 'sentencia', 
		lanzamiento AS 'lanzamiento', 
		observaciones AS 'observaciones'
	FROM Casos ca
	WHERE ca.nombre like CONCAT('%',p_nombre,'%');
END */;;

/*!50003 SET SESSION SQL_MODE=@OLD_SQL_MODE */;;
# Dump of PROCEDURE Update_Caso
# ------------------------------------------------------------

/*!50003 DROP PROCEDURE IF EXISTS `Update_Caso` */;;
/*!50003 SET SESSION SQL_MODE=""*/;;
/*!50003 CREATE*/ /*!50020 DEFINER=`root`@`localhost`*/ /*!50003 PROCEDURE `Update_Caso`(
	IN p_id INT(11),
	IN p_residencial INT(11), 
	IN p_edificio INT(11), 
	IN p_apartamento VARCHAR(11), 
	IN p_area VARCHAR(11), 
	IN p_nombre VARCHAR(11), 
	IN p_casoRecibido DATE, 
	IN p_seleccionado TINYINT(1), 
	IN p_completado TINYINT(1), 
	IN p_causal INT(11), 
	IN p_rentaMensual DECIMAL(11,0), 
	IN p_mesesAdeudados INT(11), 
	IN p_deudaRenta DECIMAL(11,0), 
	IN p_deudaRentaNegativa DECIMAL(11,0), 
	IN p_deudaRecibida DECIMAL(11,0), 
	IN p_deudaTotal DECIMAL(11,0), 
	IN p_ultimoReexamen DATE, 
	IN p_incumplimiento VARCHAR(11), 
	IN p_caso VARCHAR(11), 
	IN p_presentacion DATE, 
	IN p_diligenciado TINYINT(1), 
	IN p_diligenciadoEn DATE, 
	IN p_sala VARCHAR(11), 
	IN p_hora TIME, 
	IN p_primeraComparecencia DATE, 
	IN p_segundaComparecencia DATE, 
	IN p_vistaSegundo DATE, 
	IN p_sentencia DATE, 
	IN p_lanzamiento DATE, 
	IN p_observaciones VARCHAR(11),
	IN p_rediligenciar TINYINT(1), 
	IN p_ejecutar TINYINT(1)
)
BEGIN
	UPDATE Casos
	SET
		residencial = p_residencial ,
		edificio = p_edificio , 
		apartamento = p_apartamento , 
		area = p_area , 
		nombre = p_nombre , 
		caso_recibido = p_casoRecibido , 
		seleccionado = p_seleccionado , 
		completado = p_completado , 
		causal = p_causal , 
		renta_mensual = p_rentaMensual , 
		meses_adeudados = p_mesesAdeudados , 
		deuda_renta = p_deudaRenta , 
		deuda_renta_negativa = p_deudaRentaNegativa , 
		deuda_recibida = p_deudaRecibida , 
		deuda_total = p_deudaTotal , 
		ultimo_reexamen = p_ultimoReexamen , 
		incumplimiento = p_incumplimiento , 
		caso = p_caso , 
		presentacion = p_presentacion , 
		diligenciado = p_diligenciado , 
		diligenciado_en = p_diligenciadoEn , 
		sala = p_sala , 
		hora = p_hora , 
		primera_comparecencia = p_primeraComparecencia , 
		segunda_comparecencia = p_segundaComparecencia , 
		vista_en_su_fondo = p_vistaSegundo , 
		sentencia = p_sentencia , 
		lanzamiento = p_lanzamiento , 
		observaciones = p_observaciones ,
		rediligenciar = p_rediligenciar ,
		ejecutar = p_ejecutar 
	WHERE
	Casos.id = p_id;
END */;;

/*!50003 SET SESSION SQL_MODE=@OLD_SQL_MODE */;;
DELIMITER ;

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
