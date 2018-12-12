-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.3.10-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Volcando estructura de base de datos para devoluciones_bd
CREATE DATABASE IF NOT EXISTS `devoluciones_bd` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci */;
USE `devoluciones_bd`;

-- Volcando estructura para tabla devoluciones_bd.tb_changes
CREATE TABLE IF NOT EXISTS `tb_changes` (
  `__id` int(15) NOT NULL AUTO_INCREMENT,
  `changeId` int(20) DEFAULT NULL,
  `orderId` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `username` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `addressLine` varchar(300) COLLATE utf8_spanish_ci NOT NULL,
  `commune` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `region` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `country` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `phone` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `email` varchar(250) COLLATE utf8_spanish_ci NOT NULL,
  `courier` int(1) NOT NULL DEFAULT 1,
  `productId` int(30) NOT NULL,
  `partNumber` char(50) COLLATE utf8_spanish_ci NOT NULL,
  `skuId` char(50) COLLATE utf8_spanish_ci NOT NULL,
  `size` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `color` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `reazonChange` varchar(150) COLLATE utf8_spanish_ci NOT NULL,
  `price` varchar(150) COLLATE utf8_spanish_ci NOT NULL,
  `changeDate` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`__id`),
  KEY `__id` (`__id`)
) ENGINE=InnoDB AUTO_INCREMENT=1002 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci CHECKSUM=1;

-- Volcando datos para la tabla devoluciones_bd.tb_changes: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `tb_changes` DISABLE KEYS */;
INSERT INTO `tb_changes` (`__id`, `changeId`, `orderId`, `username`, `addressLine`, `commune`, `region`, `country`, `phone`, `email`, `courier`, `productId`, `partNumber`, `skuId`, `size`, `color`, `reazonChange`, `price`, `changeDate`) VALUES
	(1000, NULL, '12345875456', 'Lisa Blink', 'Calle olaya - la bolichera', 'Los Andes de Santiago', 'Santiago', 'Chile', '98745321', 'lisa@gmail.com', 1, 10001, 'PN0001', '100025', 'S', 'Red', 'Por que no me gusta', '782', '2018-12-12 16:30:27'),
	(1001, NULL, '12345875456', 'Lisa Blink', 'Calle olaya - la bolichera', 'Los Andes de Santiago', 'Santiago', 'Chile', '98745321', 'lisa@gmail.com', 1, 10001, 'PN0001', '100025', 'S', 'Red', 'Por que no me gusta', '782', '2018-12-12 16:31:27');
/*!40000 ALTER TABLE `tb_changes` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
