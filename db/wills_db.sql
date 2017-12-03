# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.19)
# Database: cryptosim
# Generation Time: 2017-12-03 03:57:37 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table Coins
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Coins`;

CREATE TABLE `Coins` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `coin_id` int(11) NOT NULL,
  `key_id` varchar(255) NOT NULL,
  `base_url` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `symbol` varchar(255) NOT NULL,
  `coin_name` varchar(255) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `sort_order` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `Coins` WRITE;
/*!40000 ALTER TABLE `Coins` DISABLE KEYS */;

INSERT INTO `Coins` (`id`, `coin_id`, `key_id`, `base_url`, `url`, `image_url`, `name`, `symbol`, `coin_name`, `full_name`, `sort_order`, `createdAt`, `updatedAt`)
VALUES
	(1,4321,'42','https://www.cryptocompare.com','/coins/42/overview','/media/12318415/42.png','42','42','42 Coin','42 Coin (42)',34,'2017-11-30 11:56:33','2017-11-30 11:56:33'),
	(2,33639,'365','https://www.cryptocompare.com','/coins/365/overview','/media/352070/365.png','365','365','365Coin','365Coin (365)',916,'2017-11-30 11:56:33','2017-11-30 11:56:33'),
	(3,21227,'404','https://www.cryptocompare.com','/coins/404/overview','/media/351001/404.png','404','404','404Coin','404Coin (404)',602,'2017-11-30 11:56:33','2017-11-30 11:56:33'),
	(4,20909,'611','https://www.cryptocompare.com','/coins/611/overview','/media/350985/611.png','611','611','SixEleven','SixEleven (611)',586,'2017-11-30 11:56:33','2017-11-30 11:56:33'),
	(5,28223,'808','https://www.cryptocompare.com','/coins/808/overview','/media/351513/808.png','808','808','808','808 (808)',750,'2017-11-30 11:56:33','2017-11-30 11:56:33'),
	(6,29462,'888','https://www.cryptocompare.com','/coins/888/overview','/media/351639/888.png','888','888','Octocoin','Octocoin (888)',811,'2017-11-30 11:56:33','2017-11-30 11:56:33'),
	(7,20824,'1337','https://www.cryptocompare.com','/coins/1337/overview','/media/350976/1337.png','1337','1337','1337','1337 (1337)',577,'2017-11-30 11:56:33','2017-11-30 11:56:33'),
	(8,3744,'2015','https://www.cryptocompare.com','/coins/2015/overview','/media/20180/2015.png','2015','2015','2015 coin','2015 coin (2015)',33,'2017-11-30 11:56:33','2017-11-30 11:56:33'),
	(9,100954,'USC','https://www.cryptocompare.com','/coins/usc/overview','/media/1383363/usc.png','USC','USC','Ultimate Secure Cash','Ultimate Secure Cash (USC)',1233,'2017-11-30 11:56:33','2017-11-30 11:56:33'),
	(10,105206,'DUX','https://www.cryptocompare.com','/coins/dux/overview','/media/1383364/dux.png','DUX','DUX','DuxCoin','DuxCoin (DUX)',1234,'2017-11-30 11:56:33','2017-11-30 11:56:33'),
	(11,105220,'XPS','https://www.cryptocompare.com','/coins/xps/overview','/media/1383365/xps.png','XPS','XPS','PoisonIvyCoin','PoisonIvyCoin (XPS)',1235,'2017-11-30 11:56:33','2017-11-30 11:56:33'),
	(12,105263,'EQT','https://www.cryptocompare.com','/coins/eqt/overview','/media/1383366/eqt.png','EQT','EQT','EquiTrader','EquiTrader (EQT)',1236,'2017-11-30 11:56:33','2017-11-30 11:56:33'),
	(13,105284,'INSN','https://www.cryptocompare.com','/coins/insn/overview','/media/1383366/insn.png','INSN','INSN','Insane Coin','Insane Coin (INSN)',1237,'2017-11-30 11:56:33','2017-11-30 11:56:33'),
	(14,107672,'BAT','https://www.cryptocompare.com','/coins/bat/overview','/media/1383370/bat.png','BAT','BAT','Basic Attention Token','Basic Attention Token (BAT)',1238,'2017-11-30 11:56:33','2017-11-30 11:56:33'),
	(15,108099,'F16','https://www.cryptocompare.com','/coins/f16/overview','/media/1383372/f16.png','F16','F16','F16Coin','F16Coin (F16)',1240,'2017-11-30 11:56:33','2017-11-30 11:56:33'),
	(16,112363,'HAMS','https://www.cryptocompare.com','/coins/hams/overview','/media/1383381/hams.png','HAMS','HAMS','HamsterCoin','HamsterCoin (HAMS)',1241,'2017-11-30 11:56:33','2017-11-30 11:56:33'),
	(17,112392,'QTUM','https://www.cryptocompare.com','/coins/qtum/overview','/media/1383382/qtum.png','QTUM','QTUM','QTUM','QTUM (QTUM)',1242,'2017-11-30 11:56:33','2017-11-30 11:56:33'),
	(18,112405,'NEF','https://www.cryptocompare.com','/coins/nef/overview','/media/1383383/nef.png','NEF','NEF','NefariousCoin','NefariousCoin (NEF)',1243,'2017-11-30 11:56:33','2017-11-30 11:56:33'),
	(19,116180,'ZEN','https://www.cryptocompare.com','/coins/zen/overview','/media/1383502/zen.png','ZEN','ZEN','ZenCash','ZenCash (ZEN)',1244,'2017-11-30 11:56:33','2017-11-30 11:56:33'),
	(20,116384,'BOS','https://www.cryptocompare.com','/coins/bos/overview','/media/1383521/bos.png','BOS','BOS','BOScoin','BOScoin (BOS)',1245,'2017-11-30 11:56:33','2017-11-30 11:56:33'),
	(21,1182,'BTC','https://www.cryptocompare.com','/coins/btc/overview','/media/19633/btc.png','BTC','BTC','Bitcoin','Bitcoin (BTC)',1,'2017-11-30 11:56:33','2017-11-30 11:56:33'),
	(22,12192,'DIGS','https://www.cryptocompare.com','/coins/digs/overview','/media/20706/digs.png','DIGS','DIGS','Diggits','Diggits (DIGS)',464,'2017-11-30 11:56:33','2017-11-30 11:56:33');

/*!40000 ALTER TABLE `Coins` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table Portfolios
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Portfolios`;

CREATE TABLE `Portfolios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `currency` varchar(255) NOT NULL,
  `amount` float NOT NULL,
  `expired` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `portfolios_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `Portfolios` WRITE;
/*!40000 ALTER TABLE `Portfolios` DISABLE KEYS */;

INSERT INTO `Portfolios` (`id`, `currency`, `amount`, `expired`, `createdAt`, `updatedAt`, `UserId`)
VALUES
	(1,'USD',5000,0,'2017-11-30 18:58:48','2017-12-03 03:36:34',1),
	(2,'USD',4000,0,'2017-11-30 18:58:48','2017-12-03 03:36:34',1),
	(3,'BTC',0.45,1,'2017-11-30 18:58:48','2017-11-30 18:58:48',1),
	(4,'BTC',50,1,'2017-12-03 03:36:34','2017-12-03 03:36:34',1),
	(5,'USD',1,0,'2017-12-03 03:36:34','2017-12-03 03:36:34',1);

/*!40000 ALTER TABLE `Portfolios` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table Transactions
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Transactions`;

CREATE TABLE `Transactions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `currency` varchar(255) NOT NULL,
  `amount` float NOT NULL,
  `price_paid` float NOT NULL,
  `transaction_type` varchar(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `Transactions` WRITE;
/*!40000 ALTER TABLE `Transactions` DISABLE KEYS */;

INSERT INTO `Transactions` (`id`, `currency`, `amount`, `price_paid`, `transaction_type`, `createdAt`, `updatedAt`, `UserId`)
VALUES
	(1,'BTC',0.45,10000,'B','2017-11-30 18:58:48','2017-11-30 18:58:48',1),
	(2,'USD',5000,1,'B','2017-11-30 18:58:48','2017-11-30 18:58:48',1),
	(3,'BTC',50,500,'B','2017-12-03 03:36:34','2017-12-03 03:36:34',1);

/*!40000 ALTER TABLE `Transactions` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table Users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Users`;

CREATE TABLE `Users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `facebook_id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `token` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;

INSERT INTO `Users` (`id`, `facebook_id`, `name`, `email`, `token`, `createdAt`, `updatedAt`)
VALUES
	(1,'123','James Doe','james@doe.com','def','2017-11-30 18:58:48','2017-11-30 18:58:48');

/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;