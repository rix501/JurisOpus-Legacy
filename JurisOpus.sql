# ************************************************************
# Sequel Pro SQL dump
# Version 3408
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: 127.0.0.1 (MySQL 5.5.14)
# Database: JurisOpus
# Generation Time: 2011-09-16 01:06:22 +0000
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
  KEY `causal` (`causal`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `Casos` WRITE;
/*!40000 ALTER TABLE `Casos` DISABLE KEYS */;

INSERT INTO `Casos` (`id`, `residencial`, `edificio`, `apartamento`, `nombre`, `ingresado`, `area`, `completado`, `renta_mensual`, `meses_adeudados`, `deuda_renta`, `deuda_recargo`, `deuda_renta_negativa`, `deuda_total`, `ultimo_reexamen`, `incumplimiento`, `causal`, `caso`, `presentacion`, `sala`, `hora`, `primera_comparecencia`, `segunda_comparecencia`, `vista_en_su_fondo`, `lanzamiento`, `observaciones`, `sentencia`, `diligenciado`, `seleccionado`, `diligenciado_en`, `ejecutar`, `rediligenciar`, `desistido`, `caso_recibido`, `deuda_recibida`)
VALUES
	(1,NULL,NULL,NULL,'t',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	(2,NULL,NULL,NULL,'edsaf',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'0',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	(3,NULL,NULL,NULL,'ricardo',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'0',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	(4,NULL,NULL,NULL,'ricardo',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'juan',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	(5,NULL,NULL,NULL,'sdf',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	(6,NULL,'qwe','rty','fg',NULL,'asd',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'z',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	(7,NULL,NULL,NULL,'rix',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	(8,NULL,'ldsk','dkls','sdkl',NULL,'klsd',0,0,0,0,NULL,0,0,'0000-00-00','dsf',1,'sdf','0000-00-00','sdf','00:00:00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','','0000-00-00',0,0,'09/04/2011',NULL,NULL,NULL,'0000-00-00','0000-00-00');

/*!40000 ALTER TABLE `Casos` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table Causales
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Causales`;

CREATE TABLE `Causales` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `causal` varchar(11) DEFAULT NULL,
  `siglas` varchar(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `Causales` WRITE;
/*!40000 ALTER TABLE `Causales` DISABLE KEYS */;

INSERT INTO `Causales` (`id`, `causal`, `siglas`)
VALUES
	(1,'Test Caus','TC');

/*!40000 ALTER TABLE `Causales` ENABLE KEYS */;
UNLOCK TABLES;


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

LOCK TABLES `Residenciales` WRITE;
/*!40000 ALTER TABLE `Residenciales` DISABLE KEYS */;

INSERT INTO `Residenciales` (`id`, `residencial`, `num_proyecto`, `area`)
VALUES
	(1,'Test Resi','1','1');

/*!40000 ALTER TABLE `Residenciales` ENABLE KEYS */;
UNLOCK TABLES;



--
-- Dumping routines (PROCEDURE) for database 'JurisOpus'
--
DELIMITER ;;

# Dump of PROCEDURE Create_Caso
# ------------------------------------------------------------

/*!50003 DROP PROCEDURE IF EXISTS `Create_Caso` */;;
/*!50003 SET SESSION SQL_MODE=""*/;;
/*!50003 CREATE*/ /*!50020 DEFINER=`root`@`localhost`*/ /*!50003 PROCEDURE `Create_Caso`(
	IN p_edificio VARCHAR(11), 
	IN p_apartamento VARCHAR(11), 
	IN p_area VARCHAR(11), 
	IN p_nombre VARCHAR(11), 
	IN p_casoRecibido VARCHAR(11), 
	IN p_seleccionado VARCHAR(11), 
	IN p_completado VARCHAR(11), 
	IN p_causal VARCHAR(11), 
	IN p_rentaMensual VARCHAR(11), 
	IN p_mesesAdeudados VARCHAR(11), 
	IN p_deudaRenta VARCHAR(11), 
	IN p_deudaRentaNegativa VARCHAR(11), 
	IN p_deudaRecibida VARCHAR(11), 
	IN p_deudaTotal VARCHAR(11), 
	IN p_ultimoReexamen VARCHAR(11), 
	IN p_incumplimiento VARCHAR(11), 
	IN p_caso VARCHAR(11), 
	IN p_presentacion VARCHAR(11), 
	IN p_diligenciado VARCHAR(11), 
	IN p_diligenciadoEn VARCHAR(11), 
	IN p_sala VARCHAR(11), 
	IN p_hora VARCHAR(11), 
	IN p_primeraComparecencia VARCHAR(11), 
	IN p_segundaComparecencia VARCHAR(11), 
	IN p_vistaSegundo VARCHAR(11), 
	IN p_sentencia VARCHAR(11), 
	IN p_lanzamiento VARCHAR(11), 
	IN p_observaciones VARCHAR(11)
)
BEGIN
	INSERT INTO Casos
	(edificio, apartamento, area, nombre, caso_recibido, seleccionado, completado, causal, renta_mensual, meses_adeudados, deuda_renta, deuda_renta_negativa, deuda_recibida, deuda_total, ultimo_reexamen, incumplimiento, caso, presentacion, diligenciado, diligenciado_en, sala, hora, primera_comparecencia, segunda_comparecencia, vista_en_su_fondo, sentencia, lanzamiento, observaciones)
	VALUES
	(p_edificio, p_apartamento, p_area, p_nombre, p_casoRecibido, p_seleccionado, p_completado, p_causal, p_rentaMensual, p_mesesAdeudados, p_deudaRenta, p_deudaRentaNegativa, p_deudaRecibida, p_deudaTotal, p_ultimoReexamen, p_incumplimiento, p_caso, p_presentacion, p_diligenciado, p_diligenciadoEn, p_sala, p_hora, p_primeraComparecencia, p_segundaComparecencia, p_vistaSegundo, p_sentencia, p_lanzamiento, p_observaciones);
END */;;

/*!50003 SET SESSION SQL_MODE=@OLD_SQL_MODE */;;
# Dump of PROCEDURE Get_Casos
# ------------------------------------------------------------

/*!50003 DROP PROCEDURE IF EXISTS `Get_Casos` */;;
/*!50003 SET SESSION SQL_MODE=""*/;;
/*!50003 CREATE*/ /*!50020 DEFINER=`root`@`localhost`*/ /*!50003 PROCEDURE `Get_Casos`()
BEGIN
	SELECT 
		*
	FROM Casos;
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
DELIMITER ;

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
