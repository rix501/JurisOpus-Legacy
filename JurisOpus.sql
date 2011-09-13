# ************************************************************
# Sequel Pro SQL dump
# Version 3408
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: 127.0.0.1 (MySQL 5.5.10)
# Database: JurisOpus
# Generation Time: 2011-09-13 03:21:21 +0000
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
  `fecha_presentacion` date DEFAULT NULL,
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




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
