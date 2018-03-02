/*
SQLyog Community
MySQL - 5.7.17-log : Database - gdes_pipeline_test
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`gdes_pipeline_test` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `gdes_pipeline_test`;

/*Table structure for table `areas` */

DROP TABLE IF EXISTS `areas`;

CREATE TABLE `areas` (
  `areaId` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Identificador único de área',
  `nombre` varchar(255) NOT NULL COMMENT 'Nombre del área',
  PRIMARY KEY (`areaId`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COMMENT='Áreas a las que pertenecerá la oferta';

/*Data for the table `areas` */

insert  into `areas`(`areaId`,`nombre`) values 
(1,'DMT - DESMANTELAMIENTO'),
(2,'IDI - INGENIERÍA e I+D+i'),
(4,'IND - INDUSTRIAL'),
(5,'NUC - MANTENIMIENTO NUCLEAR'),
(6,'LOG - LOGÍSTICA'),
(7,'RED - REDES ELÉCTRICAS'),
(8,'REV - TRATAMIENTO DE SUPERFICIES'),
(9,'WND - MANTENIMIENTO EÓLICO'),
(10,'PR - PROTECCIÓN RADIOLÓGICA'),
(11,'TER - TERMOSOLAR'),
(12,'PPC'),
(13,'LTO'),
(14,'PPC - PROTECCIÓN TÉRMICA'),
(15,'LTO - MONITORIZACIÓN Y ANÁLISIS');

/*Table structure for table `centros` */

DROP TABLE IF EXISTS `centros`;

CREATE TABLE `centros` (
  `centroId` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Identificador del centro',
  `nombre` varchar(255) NOT NULL COMMENT 'Nombre del centro',
  PRIMARY KEY (`centroId`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 COMMENT='Centros establecidos';

/*Data for the table `centros` */

insert  into `centros`(`centroId`,`nombre`) values 
(0,'No Existe Centro'),
(1,'CN ALMARAZ'),
(2,'CN TRILLO'),
(3,'CN COFRENTES'),
(4,'CN VANDELLÓS II'),
(5,'CN ASCÓ I y II'),
(6,'CN JOSE CABRERA'),
(7,'CN LAGUNA VERDE'),
(8,'EL CABRIL'),
(9,'CIEMAT'),
(10,'REPSOL CORUÑA'),
(11,'REPSOL CARTAGENA'),
(12,'ACERINOX'),
(13,'CEPSA TENERIFE'),
(14,'GNF-RÍO HATO'),
(15,'GNF-MONTERREY'),
(16,'GNF-MEX DF'),
(17,'DOUNREAY'),
(18,'OTRO');

/*Table structure for table `centros_establecidos` */

DROP TABLE IF EXISTS `centros_establecidos`;

CREATE TABLE `centros_establecidos` (
  `centroEstablecidoId` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Identificador de centro establecido',
  `nombre` varchar(255) DEFAULT NULL COMMENT 'Nombre de centro establecido',
  PRIMARY KEY (`centroEstablecidoId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

/*Data for the table `centros_establecidos` */

insert  into `centros_establecidos`(`centroEstablecidoId`,`nombre`) values 
(1,'N/A');

/*Table structure for table `directores_area` */

DROP TABLE IF EXISTS `directores_area`;

CREATE TABLE `directores_area` (
  `directorId` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`directorId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `directores_area` */

/*Table structure for table `divisas` */

DROP TABLE IF EXISTS `divisas`;

CREATE TABLE `divisas` (
  `divisaId` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Identificador de divisa',
  `nombre` varchar(255) DEFAULT NULL COMMENT 'Nombre de divisa',
  PRIMARY KEY (`divisaId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

/*Data for the table `divisas` */

insert  into `divisas`(`divisaId`,`nombre`) values 
(1,'EUR'),
(2,'USD'),
(3,'MXN'),
(4,'GBP');

/*Table structure for table `empresas` */

DROP TABLE IF EXISTS `empresas`;

CREATE TABLE `empresas` (
  `empresaId` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Identificador único de la empresa',
  `nombre` varchar(255) NOT NULL COMMENT 'Nombre de la empresa',
  PRIMARY KEY (`empresaId`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COMMENT='Empresas del grupo';

/*Data for the table `empresas` */

insert  into `empresas`(`empresaId`,`nombre`) values 
(1,'GDEA'),
(2,'GDES '),
(3,'GDFR '),
(4,'GDLC '),
(5,'GDUK '),
(6,'GDMX '),
(7,'GDPA'),
(8,'IYM '),
(9,'REV '),
(10,'GDWD '),
(11,'TIT - Ofertas de TITANIA'),
(12,'T4S - Ofertas de T4S'),
(13,'INN - Ofertas de INNOMERICS');

/*Table structure for table `estados` */

DROP TABLE IF EXISTS `estados`;

CREATE TABLE `estados` (
  `estadoId` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Identificador interno del estado',
  `nombre` varchar(255) NOT NULL COMMENT 'Nombre del estado',
  `orden` int(11) DEFAULT NULL,
  PRIMARY KEY (`estadoId`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COMMENT='Estados en los que se puede encontrar una oferta';

/*Data for the table `estados` */

insert  into `estados`(`estadoId`,`nombre`,`orden`) values 
(1,'EN PROCESO',1),
(2,'PRESENTADA',2),
(3,'NO PRESENTADA',3),
(4,'ADJUDICADA',9),
(5,'PERDIDA',8),
(6,'COMPROMISO',4),
(7,'OTROS',7),
(8,'INVITADOS',5),
(9,'NO INVITADOS',6);

/*Table structure for table `fases_oferta` */

DROP TABLE IF EXISTS `fases_oferta`;

CREATE TABLE `fases_oferta` (
  `faseOfertaId` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`faseOfertaId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `fases_oferta` */

/*Table structure for table `grupos_actividades` */

DROP TABLE IF EXISTS `grupos_actividades`;

CREATE TABLE `grupos_actividades` (
  `grupoActividadId` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Identificador único del grupo de actividad',
  `nombre` varchar(255) NOT NULL COMMENT 'Nombre del grupo de actividad',
  PRIMARY KEY (`grupoActividadId`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8 COMMENT='Agrupaciones de tipos de actividad';

/*Data for the table `grupos_actividades` */

insert  into `grupos_actividades`(`grupoActividadId`,`nombre`) values 
(52,'GRUPO');

/*Table structure for table `grupos_usuarios` */

DROP TABLE IF EXISTS `grupos_usuarios`;

CREATE TABLE `grupos_usuarios` (
  `grupoUsuarioId` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Identificador único del grupo de usuario',
  `nombre` varchar(255) NOT NULL COMMENT 'Nombre del grupo',
  PRIMARY KEY (`grupoUsuarioId`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8 COMMENT='Esta es la tabla que contiene los grupos de usuarios';

/*Data for the table `grupos_usuarios` */

insert  into `grupos_usuarios`(`grupoUsuarioId`,`nombre`) values 
(1,'Administradores'),
(2,'Usuarios'),
(5,'GDES-NUC'),
(8,'GDES-DMT'),
(9,'LOG'),
(11,'GDES-REV'),
(13,'GDES-ERBA'),
(14,'GDES-LINEMAN'),
(15,'GDUK'),
(16,'PR'),
(19,'GDES-IDI'),
(23,'GDES FRANCE'),
(24,'GDMX-IND'),
(25,'CNA');

/*Table structure for table `ofertas` */

DROP TABLE IF EXISTS `ofertas`;

CREATE TABLE `ofertas` (
  `ofertaId` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Identificador único del tipo de oferta',
  `numeroOferta` varchar(255) DEFAULT NULL COMMENT 'Número de la oferta',
  `fechaOferta` date DEFAULT NULL COMMENT 'Fecha original de la oferta',
  `fechaLimiteProyecto` date DEFAULT NULL COMMENT 'Fecha estimada para el proyecto ofertado',
  `fechaUltimoEstado` date DEFAULT NULL COMMENT 'Fecha en la que se produjo el cambio a estado actual',
  `importePresupuesto` decimal(12,2) DEFAULT NULL COMMENT 'Importe presupuestado',
  `importePresupuestoDivisa` decimal(12,2) DEFAULT NULL COMMENT 'Importe presupuestado en otra moneda',
  `codigoDivisa` varchar(255) DEFAULT NULL COMMENT 'Código de la divisa de la otra moneda (ISO 4217)',
  `importeInversion` decimal(12,2) DEFAULT NULL COMMENT 'Importe de la inversión',
  `importeRetorno` decimal(12,2) DEFAULT NULL COMMENT 'Importe retorno de la inversión',
  `descripcion` text COMMENT 'Descripción del servicio',
  `observaciones` text COMMENT 'Observaciones de la oferta',
  `tiempoEmpleado` int(11) DEFAULT NULL COMMENT 'Tiempo empleado (horas)',
  `autorizaciones` text COMMENT 'Campo libre para mostrar autorizaciones',
  `numeroPedido` varchar(255) DEFAULT NULL COMMENT 'Número de pedido asociado a la oferta',
  `personaContacto` varchar(255) DEFAULT NULL COMMENT 'Persona de contacto en el cliente.',
  `empresaId` int(11) DEFAULT NULL COMMENT 'Empresa relacionada',
  `proyectoId` int(11) DEFAULT NULL COMMENT 'Proyecto relacionado',
  `areaId` int(11) DEFAULT NULL COMMENT 'Área relacionada',
  `tipoActividadId` int(11) DEFAULT NULL COMMENT 'Tipo de actividad relacionada',
  `paisId` int(11) DEFAULT NULL COMMENT 'Pais relacionado',
  `estadoId` int(11) DEFAULT NULL COMMENT 'Estado de la oferta',
  `tipoSoporteId` int(11) DEFAULT NULL COMMENT 'Tipo soporte relacionado',
  `responsableId` int(11) DEFAULT NULL COMMENT 'Responsable de GDES',
  `centroId` int(11) DEFAULT NULL COMMENT 'Centro relacionado',
  `tipoOfertaId` int(11) DEFAULT NULL COMMENT 'Tipo de oferta',
  `ofertaSingular` tinyint(1) DEFAULT '0' COMMENT 'Caracteriza esta oferta como singular',
  `periodo` varchar(255) DEFAULT NULL COMMENT 'Periodo de la oferta',
  `fechaEntrega` date DEFAULT NULL COMMENT 'Fecha de entrega de la oferta',
  `colaboradores` text COMMENT 'Asociaciones / colaboradores que participan en la oferta',
  `margenContribucion` decimal(5,2) DEFAULT NULL COMMENT 'Porcentaje de margen de contribución',
  `importeContribucion` decimal(12,2) DEFAULT NULL COMMENT 'Importe contribución',
  `centroEstablecidoId` int(11) DEFAULT NULL COMMENT 'Relacion con el centro establecido',
  `divisaId` int(11) DEFAULT NULL COMMENT 'Relacion con la divisa',
  `numeroLicitacion` varchar(255) DEFAULT NULL COMMENT 'Numero licitacion',
  `cliente` varchar(255) DEFAULT NULL COMMENT 'Nombre del cliente',
  `version` int(11) DEFAULT '0' COMMENT 'Campo con el número de versión de la oferta. De moemento se incrementa con cada ''Aceptar'' del formulario.',
  `multiplicador` decimal(5,2) DEFAULT NULL COMMENT 'Factor multiplicador de divisa',
  `fechaDivisa` date DEFAULT NULL COMMENT 'Fecha en la que se aplicó la última conversión de divisa',
  `codigoGdes` decimal(12,2) DEFAULT NULL COMMENT 'Código de oferta GDES',
  `importeInversionDivisa` decimal(12,2) DEFAULT NULL COMMENT 'Importe de inversión en la divisa',
  `nombreCorto` varchar(255) DEFAULT NULL COMMENT 'Nombre corto para la oferta',
  `ubicacion` varchar(255) DEFAULT NULL,
  `paisUbicacion` varchar(255) DEFAULT NULL,
  `unidadNegocioId` int(11) DEFAULT NULL,
  `servicioId` int(11) DEFAULT NULL,
  `fechaCreacion` date DEFAULT NULL,
  `fechaAdjudicacion` date DEFAULT NULL,
  `fechaInicioContrato` date DEFAULT NULL,
  `fechaFinContrato` date DEFAULT NULL,
  PRIMARY KEY (`ofertaId`),
  KEY `oft_proyecto` (`proyectoId`),
  KEY `oft_area` (`areaId`),
  KEY `oft_tipo_actividad` (`tipoActividadId`),
  KEY `oft_pais` (`paisId`),
  KEY `oft_estado` (`estadoId`),
  KEY `oft_tipo_soporte` (`tipoSoporteId`),
  KEY `oft_responsable` (`responsableId`),
  KEY `oft_centros` (`centroId`),
  KEY `oft_empresa` (`empresaId`),
  KEY `oft_tipo_oferta` (`tipoOfertaId`),
  KEY `oft_centroEstablecido` (`centroEstablecidoId`),
  KEY `oft_divisas` (`divisaId`),
  KEY `oft_unidad_negocio` (`unidadNegocioId`),
  KEY `oft_servicio` (`servicioId`),
  CONSTRAINT `oft_area` FOREIGN KEY (`areaId`) REFERENCES `areas` (`areaId`),
  CONSTRAINT `oft_centroEstablecido` FOREIGN KEY (`centroEstablecidoId`) REFERENCES `centros_establecidos` (`centroEstablecidoId`),
  CONSTRAINT `oft_centros` FOREIGN KEY (`centroId`) REFERENCES `centros` (`centroId`),
  CONSTRAINT `oft_divisas` FOREIGN KEY (`divisaId`) REFERENCES `divisas` (`divisaId`),
  CONSTRAINT `oft_empresa` FOREIGN KEY (`empresaId`) REFERENCES `empresas` (`empresaId`),
  CONSTRAINT `oft_estado` FOREIGN KEY (`estadoId`) REFERENCES `estados` (`estadoId`),
  CONSTRAINT `oft_pais` FOREIGN KEY (`paisId`) REFERENCES `paises` (`paisId`),
  CONSTRAINT `oft_proyecto` FOREIGN KEY (`proyectoId`) REFERENCES `proyectos` (`proyectoId`),
  CONSTRAINT `oft_responsable` FOREIGN KEY (`responsableId`) REFERENCES `responsables` (`responsableId`),
  CONSTRAINT `oft_servicio` FOREIGN KEY (`servicioId`) REFERENCES `servicios` (`servicioId`),
  CONSTRAINT `oft_tipo_actividad` FOREIGN KEY (`tipoActividadId`) REFERENCES `tipos_actividades` (`tipoActividadId`),
  CONSTRAINT `oft_tipo_oferta` FOREIGN KEY (`tipoOfertaId`) REFERENCES `tipos_oferta` (`tipoOfertaId`),
  CONSTRAINT `oft_tipo_soporte` FOREIGN KEY (`tipoSoporteId`) REFERENCES `tipos_soporte` (`tipoSoporteId`),
  CONSTRAINT `oft_unidad_negocio` FOREIGN KEY (`unidadNegocioId`) REFERENCES `unidades_negocio` (`unidadNegocioId`)
) ENGINE=InnoDB AUTO_INCREMENT=216 DEFAULT CHARSET=utf8 COMMENT='Tabla general de ofertas';

/*Data for the table `ofertas` */

insert  into `ofertas`(`ofertaId`,`numeroOferta`,`fechaOferta`,`fechaLimiteProyecto`,`fechaUltimoEstado`,`importePresupuesto`,`importePresupuestoDivisa`,`codigoDivisa`,`importeInversion`,`importeRetorno`,`descripcion`,`observaciones`,`tiempoEmpleado`,`autorizaciones`,`numeroPedido`,`personaContacto`,`empresaId`,`proyectoId`,`areaId`,`tipoActividadId`,`paisId`,`estadoId`,`tipoSoporteId`,`responsableId`,`centroId`,`tipoOfertaId`,`ofertaSingular`,`periodo`,`fechaEntrega`,`colaboradores`,`margenContribucion`,`importeContribucion`,`centroEstablecidoId`,`divisaId`,`numeroLicitacion`,`cliente`,`version`,`multiplicador`,`fechaDivisa`,`codigoGdes`,`importeInversionDivisa`,`nombreCorto`,`ubicacion`,`paisUbicacion`,`unidadNegocioId`,`servicioId`,`fechaCreacion`,`fechaAdjudicacion`,`fechaInicioContrato`,`fechaFinContrato`) values 
(6,'1','2017-03-22',NULL,'2017-04-03',14000.00,NULL,NULL,NULL,NULL,'Preparación y Sellado de Bidones de la Planta de Secado e Inmovilización de Bidones de Hierros en Central Nuclear de Almaraz.','Se facturará en función del número de bidones realizados. Se estiman las siguientes cantidades\n- Pre hormigonado de bidones: 60 unidades a 153.37 €/unidad\n- Sellado de bidones: 48 unidades a 39.15 €/unidad\n- Inmovilización de bidones de hierros: 40-45 bidones anuales a 75.45 €/unidad',NULL,'No se precisa ninguna autorización adicional','SN17RA42980PA',NULL,2,2,5,1,1,4,NULL,24,1,0,0,'2017','2017-01-11',NULL,NULL,NULL,1,1,'207317','CNAT',16,NULL,NULL,101.00,NULL,NULL,'ZDBG78999',NULL,2,1,'2018-03-02','2018-03-01','2018-03-02','2018-03-03'),
(7,'3','2017-03-22',NULL,'2017-03-30',1600.00,NULL,NULL,NULL,NULL,'TOMA DE MUESTRAS Y ANALÍTICA DE AGUA DE CONSUMO HUMANO\n',NULL,NULL,'No se precisa ninguna autorización adicional','SN17SM43283PB',NULL,2,2,5,4,1,4,NULL,24,1,0,0,'2017','2017-03-13',NULL,NULL,NULL,1,1,'208910','CNAT',6,NULL,NULL,5103.00,NULL,NULL,NULL,'FRT44579',NULL,NULL,NULL,NULL,NULL,NULL),
(8,'2','2017-03-22',NULL,'2017-05-18',315000.00,NULL,NULL,NULL,NULL,'SERVICIO DE TURNO CERRADO DE QUÍMICA Y RADIOQUÍMICA',NULL,NULL,'Debe rellenar el documento \'Bid no Bid\' (BNB). Vea la ayuda','SN17QR43864PB',NULL,2,2,5,5,1,4,3,24,1,0,0,'2017-2021','2017-03-17',NULL,NULL,NULL,1,1,'2017-03-QR-CNA.R0','CNAT',7,NULL,NULL,5102.00,NULL,'QUIMICA CNA',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(9,'4','2017-03-22',NULL,'2017-03-23',98273.00,NULL,NULL,NULL,NULL,'Trabajos de limpieza para la Sustitución HCFC en unidades VA-X-CH-98-A/B \"0-MDP-02578-08\"',NULL,NULL,'No se precisa ninguna autorización adicional','SM17RA43228PB',NULL,2,2,5,13,1,4,NULL,24,1,0,0,'2017','2017-03-10',NULL,NULL,NULL,1,1,'209110','CNAT',3,NULL,NULL,5104.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(10,'3','2017-03-23',NULL,'2017-06-30',528703.70,571000.00,NULL,NULL,NULL,'Montaje Electromecánico Subestación El Torno','Por 2.000 $ de diferencia se lo adjudican a COBRA.',NULL,'Debe rellenar el documento \'Proposal report\' (PPR). Vea la ayuda',NULL,'Pablo Quintero - Compras',7,2,7,29,4,5,3,14,0,0,0,'2017-5 meses','2017-03-24',NULL,13.00,68731.48,1,2,'1637','GNF',6,1.08,'2017-03-24',0.00,NULL,'EL TORNO',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(11,'102','2017-03-23',NULL,'2017-06-06',434497.22,469257.00,NULL,99074.07,NULL,'Línea de Media Tensión El Coco','Se incluye en los costes el 50% del coste del equipo como amortización.\nEn Ronda 3: K= 2,08 .La poleas cuestan aprox. 12.000 $ y se estima que no nos solicitarán el ing. residente, etc. La amortización se hace a 4 años según reunión del Comité.\nSe pierde por precio, en una ronda 4 piden una K=1,72 objetivo y nosotros mantenemos el 2.08. Se lo adjudican a T&C.\n',NULL,'Debe rellenar el documento \'Proposal report\' (PPR). Vea la ayuda',NULL,NULL,7,2,7,30,4,5,NULL,14,0,0,1,'2017 - 5 meses','2017-03-17',NULL,13.50,58657.12,1,2,NULL,'GNF',6,1.08,'2017-03-17',0.00,107000.00,'EL COCO LMT',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(12,'03','2017-03-23',NULL,'2017-12-28',2077844.98,2240000.00,NULL,NULL,NULL,'Alumbrado ENSA Colón y Panamá','La Declaran Desierta. No Adjudican a Nadie. Ramses se reunirá con Marina y Héctor Iglesias (Dir. de Compras) para ver si la sacan otra vez  o no. ',NULL,'Debe rellenar el documento \'Proposal report\' (PPR). Vea la ayuda',NULL,'Marina Bermudez',7,2,7,17,4,3,3,14,0,0,1,'2017-2020','2017-03-03',NULL,5.00,NULL,1,2,'VSS-DC-SC-007-2017','ENSA',4,1.08,'2017-03-03',0.00,NULL,'ALUMBRADO ENSA',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(13,'5','2017-03-23',NULL,'2017-09-18',35856.00,NULL,NULL,NULL,NULL,'Trabajos de apoyo a la empresa Nalco Española, S.L. en las Torres TEVA de Central Nuclear de Almaraz.',NULL,NULL,'No se precisa ninguna autorización adicional',NULL,NULL,2,2,5,13,1,4,NULL,24,1,0,0,'Mayo-Octubre 2017','2017-03-30',NULL,NULL,NULL,1,1,NULL,'Nalco España SL',5,NULL,NULL,5105.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(14,'6','2017-03-27',NULL,'2017-06-20',290952.88,NULL,NULL,NULL,NULL,'LIMPIEZA INDUSTRIAL DE ZONA CONVENCIONAL Y GHD DURANTE 25R1',NULL,NULL,'No se precisa ninguna autorización adicional','SR17RA43656PB',NULL,2,2,5,13,1,4,1,24,1,0,0,'JUNIO-AGOSTO 2017','2017-03-27',NULL,NULL,NULL,1,1,'209221','CNAT',4,NULL,NULL,5106.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(15,'7','2017-03-27',NULL,'2017-06-20',497091.00,NULL,NULL,NULL,NULL,'LIMPIEZA Y DESCONTAMINACIÓN DE ZONA CONTROLADA Y RUTA CRÍTICA DURANTE 25R1.',NULL,NULL,'No se precisa ninguna autorización adicional','SR17RA43657PA',NULL,2,2,5,7,1,4,1,24,1,0,0,'JUNIO-AGOSTO 2017','2017-03-27',NULL,NULL,NULL,1,1,'209222A','CNAT',4,NULL,NULL,5107.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(16,'8','2017-03-27',NULL,'2017-06-30',164528.00,NULL,NULL,NULL,NULL,'LAVANDERÍA DE ZONA CONTROLADA, MANTENIMIENTO DE VESTUARIO Y EPO DURANTE 25R1',NULL,NULL,'No se precisa ninguna autorización adicional','SR17RA43658PA',NULL,2,2,5,7,1,4,1,24,1,0,1,'JUNIO-AGOSTO 2017','2017-03-27',NULL,NULL,NULL,1,1,'209243','CNAT',6,NULL,NULL,5108.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(17,'9','2017-04-06',NULL,'2017-06-30',19996.92,NULL,NULL,NULL,NULL,'Realización de trabajos de apoyo de limpieza y descontaminación de zonas afectadas por la MD 1-02156-00-01 (Sustitución del control de la turbobomba de AF).',NULL,NULL,'No se precisa ninguna autorización adicional','SM17RA43784PB',NULL,2,2,5,7,1,4,NULL,24,1,0,0,'Marzo-Agosto','2017-04-06',NULL,NULL,NULL,1,1,'209263','CNAT',1,NULL,NULL,5109.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(18,'10','2017-04-10',NULL,'2017-06-20',36095.00,NULL,NULL,NULL,NULL,'Servicio de limpiezas, gestión de residuos líquidos y pruebas con GHD durante la 25R1',NULL,NULL,'No se precisa ninguna autorización adicional','SR17MA43665PB',NULL,2,2,5,13,1,4,1,24,1,0,0,'JUNIO-AGOSTO 2017','2017-04-10',NULL,NULL,NULL,1,1,'209322','CNAT',4,NULL,NULL,5110.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(19,'11','2017-04-18',NULL,'2017-08-10',53725.00,NULL,NULL,NULL,NULL,'Trabajos de limpieza y descontaminación para el Venteo Filtrado del Recinto de Contención MD 1/2-MDP-02967-03',NULL,NULL,'No se precisa ninguna autorización adicional','SM17RA43737PA',NULL,2,2,5,7,1,4,NULL,24,1,0,0,'Abril-Julio 2017','2017-04-18',NULL,NULL,NULL,1,1,'209496','CNAT',3,NULL,NULL,5111.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(20,'170003','2017-05-11',NULL,'2017-10-31',58430.00,58430.00,NULL,0.00,NULL,'EL SERVICIO DE RECOGIDA DE MUESTRAS REFERIDAS EN EL PVRA, GESTIÓN DE EQUIPOS Y TRABAJOS DE MANTENIMIENTO EN PALOMARES \n',NULL,NULL,'No se precisa ninguna autorización adicional',NULL,'MARCELIANO CURIEL',2,2,1,18,1,4,NULL,3,0,0,0,'22 MESES A PARTIR DE LA FIRMA DEL CONTRATO','2017-05-09',NULL,41.59,24301.04,NULL,NULL,'270.900','CIEMAT',8,0.00,'2017-05-09',0.00,NULL,'PVRA',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(21,'170006','2017-05-11',NULL,'2017-05-11',13021.00,NULL,NULL,2400.00,NULL,'TRABAJOS DE CORTE DE CABEZALES DE COBALTOTERAPIA THERATRON, PARA ENAJENAR, POR MEDIO DE ENRESA, EL URANIO EMPOBRECIDO QUE CONTIENEN.',NULL,NULL,'No se precisa ninguna autorización adicional',NULL,NULL,2,2,1,8,1,2,NULL,3,0,0,0,'5 SEMANAS A PARTIR DE LA FIRMA DEL CONTRATO','2017-05-09',NULL,23.79,3097.70,NULL,NULL,'NO EXISTE','Telematic & Biomedical Services S.L',3,NULL,NULL,0.00,NULL,'CABEZALES DE COBALTOTERAPIA THERATRON,',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(22,'2017/01','2017-05-16',NULL,'2017-05-16',1395.00,NULL,NULL,NULL,NULL,'SERVICIOS DE LIMPIEZA Y ACONDICIONAMIENTO DE LABORATORIOS DEL INSTITUTO DE INVESTIGACIONES BIOMÉDICAS DE MADRID “ALBERTO SOLS” DEL CSIC-UAM',NULL,NULL,'No se precisa ninguna autorización adicional','mtmacias17 35994','Marceliano Curiel',2,2,1,7,1,4,NULL,3,0,0,0,'2 dias','2017-02-28',NULL,45.00,627.75,NULL,NULL,NULL,'Instituto de Investigaciones Biomédicas-CSIC de Madrid,',1,NULL,NULL,0.00,NULL,'“ALBERTO SOLS” DEL CSIC-UAM',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(23,'2017-002','2017-05-16',NULL,'2017-05-16',5410.36,NULL,NULL,NULL,NULL,'SERVICIO DE RECOGIDA DE MUESTRAS REFERIDAS EN EL PVRA, GESTIÓN DE EQUIPOS Y TRABAJOS DE MANTENIMIENTO EN PALOMARES \n',NULL,NULL,'No se precisa ninguna autorización adicional','271.522','Marceliano Curiel',2,2,1,18,1,4,NULL,3,0,0,0,'2 MESES','2017-03-13',NULL,43.00,2326.45,NULL,NULL,'271.522','CIEMAT',3,NULL,NULL,0.00,NULL,'PVRA',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(24,'170004','2017-05-16',NULL,'2017-10-31',138.32,NULL,NULL,NULL,NULL,'SUMINISTRO DE MATERIAL AL CIEMAT\n',NULL,NULL,'No se precisa ninguna autorización adicional',NULL,NULL,2,2,1,18,1,4,NULL,3,0,0,0,'NO APLICA','2017-05-03',NULL,25.00,34.58,NULL,NULL,NULL,'CIEMAT',3,NULL,NULL,0.00,NULL,'SUMINISTRO  DE MATERIAL AL CIEMAT',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(26,'170005','2017-05-16',NULL,'2017-05-16',1640.00,NULL,NULL,NULL,NULL,'SUSTITUCION DE LOS FILTROS DE LA IR-15b',NULL,NULL,'No se precisa ninguna autorización adicional',NULL,NULL,2,2,1,18,1,1,NULL,3,0,0,0,'2 dias','2017-05-08',NULL,52.98,868.87,NULL,NULL,NULL,'CIEMAT',2,NULL,NULL,0.00,NULL,'FILTROS',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(27,'BIDSF 019 015 001','2017-05-16',NULL,'2017-05-16',7882528.80,NULL,NULL,NULL,NULL,'desmontaje previo, desmantelamiento y fragmentación, clasificación y embalaje, manejo y transporte de componentes y sistemas ubicados en la zona controlada V1 de la CN (fuera de los límites de la zona hermética) que no son esenciales para actividades futuras durante la etapa 2 del desmantelamiento de CN V1, así como todas las demás actividades relacionadas.',NULL,NULL,'Debe rellenar el documento \'Proposal report\' (PPR). Vea la ayuda',NULL,NULL,2,2,1,7,1,2,NULL,3,0,0,0,'42 MESES','2017-03-21',NULL,12.50,985316.10,NULL,NULL,'BIDSF 019 015 001','JAVYS /BIDSF',0,NULL,NULL,0.00,NULL,'D4.4B – DESMANTELAMIENTO DE SISTEMAS IN V1 NPP AREA CONTROLADA – PARTE 1',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(28,'2017-0007','2017-05-16',NULL,'2017-05-16',5410.36,NULL,NULL,NULL,NULL,'SERVICIO DE RECOGIDA DE MUESTRAS REFERIDAS EN EL PVRA, GESTIÓN DE EQUIPOS Y TRABAJOS DE MANTENIMIENTO EN PALOMARES \n','AMPLIACIÓN CONTRATO JUNIO-JULIO',NULL,'Debe rellenar el documento \'Proposal report\' (PPR). Vea la ayuda',NULL,'Marceliano Curiel',2,2,1,18,1,4,NULL,3,0,0,1,'2 MESES (junio-julio)','2017-05-10',NULL,43.00,2326.45,1,NULL,'272426','CIEMAT',3,NULL,NULL,0.00,NULL,'PVRA',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(29,'0104','2017-05-16',NULL,'2018-01-30',903113.94,1000000.00,NULL,NULL,NULL,'GESTIÓN DE COMPRA Y SUMINISTRO DE PIEZAS DE REPOSICIÓN DE CENTRALES HIDRÁULICAS PARA GNF EN PANAMA','12/05/2017.No han sacado la licitación. Estamos esperando que GNF nos envíe el listado de repuestos que necesitan para evaluar las piezas.\nNecesitan que hagamos una labor de búsqueda de las piezas de similares características a las que aparecen en el listado y que posiblemente estén obsoletas o descatalogadas. Tras la búsqueda de las piezas, ellos validarán técnicamente dichas piezas, y entonces procederemos a la compra y suministro de las mismas. Pago a 30 dáis tras recibo de la pieza. Posiblemente un adelanto en el momento de la validación de las piezas. ',NULL,'Debe rellenar el documento \'Proposal report\' (PPR). Vea la ayuda',NULL,'Pablo Quintero - Compras',7,2,7,18,4,3,NULL,14,0,1,0,'2 MESES','2017-05-26',NULL,23.00,207716.21,1,2,NULL,'GNF',2,1.11,'2017-05-26',0.00,NULL,'SUMINISTRO PIEZAS',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(30,'41','2017-05-18',NULL,'2017-07-03',408000.00,NULL,NULL,NULL,NULL,'SERVICIO DE REPARACIÓN Y MANTENIMIENTO DE EQUIPOS MÉDICOS Y PRECISIÓN',NULL,NULL,'Debe rellenar el documento \'Bid no Bid\' (BNB). Vea la ayuda',NULL,'JAVIER RIVERO',2,2,10,21,1,5,NULL,30,0,0,0,'48 MESES','2017-04-10',NULL,10.00,40800.00,1,NULL,'G/201/20/1/0536/OSC1/0000/022017','OSAKIDETZA',1,NULL,NULL,0.00,NULL,'RX PAÍS VASCO',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(31,'0001','2017-05-18',NULL,'2017-05-18',200.00,NULL,NULL,NULL,NULL,'SERVICIOS PARA EL COLEGIO DE ODONTÓLOGOS Y ESTOMATÓLOGOS DE VALENCIA\n','CONTRATO MARCO PARA LOS ODONTÓLOGOS DE VALENCIA. PRECIO UNITARIO POR EQUIPO.',NULL,'No se precisa ninguna autorización adicional',NULL,'ISIDRO PÉREZ',2,2,10,21,1,2,NULL,30,0,0,0,'12 MESES','2017-05-03',NULL,NULL,NULL,1,NULL,'-','COLEGIO ODONTÓLOGOS VLC.',1,NULL,NULL,0.00,NULL,'RX ODONTÓLOGOS',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(32,'2','2017-05-24',NULL,'2017-07-17',136010.00,0.00,NULL,NULL,NULL,'SERVICIO DE DOSIMETRÍA OFICIAL EXTERNA PERSONAL PARA EL PLAN DE DESMANTELAMIENTO Y CLAUSURA DE LA CENTRAL NUCLEAR JOSÉ CABRERA','Perdida por precio. Adjudicada a INFOCITEC por 78.300 €.',NULL,'No se precisa ninguna autorización adicional',NULL,'JAVIER RIVERO',2,2,10,21,1,5,NULL,30,0,0,0,'29','2017-05-31',NULL,14.00,19041.40,1,1,'060-CO-OE-201 7-001','C.N. ZORITA',2,NULL,NULL,0.00,NULL,'ZORITA',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(33,'17008','2017-05-30',NULL,'2017-05-30',3844019.00,NULL,NULL,NULL,NULL,'Preparation of Waste Materials for Cyclife Sweden AB in NPP Trino',NULL,NULL,'Debe rellenar el documento \'Proposal report\' (PPR). Vea la ayuda',NULL,NULL,2,2,1,7,1,2,NULL,3,0,0,0,'38 meses +2','2017-05-29',NULL,15.00,576602.85,1,NULL,'2017/ S 087-170515',' Cyclife Sweden AB in NPP Trino',1,NULL,NULL,0.00,NULL,'Preparation of Waste Materials for Cyclife Sweden AB in NPP Trino',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(34,'12','2017-05-30',NULL,'2017-06-28',26413.00,NULL,NULL,NULL,NULL,'Trabajos para el Filtrado de Agua de Piscina de Combustible Gastado de U-1 con Equipo de Filtrado LD9-46 durante la 25ª Recarga de U-1.',NULL,NULL,'No se precisa ninguna autorización adicional','SR17RA44374PA',NULL,2,3,5,7,1,4,NULL,24,1,0,0,'25 Recarga U-1','2017-05-26',NULL,NULL,NULL,1,1,'210206','CNAT',1,NULL,NULL,170112.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(35,'170003','2017-05-31',NULL,'2017-07-04',452742.00,NULL,NULL,NULL,NULL,'SERVICIO DE ASISTENCIA TÉCNICA Y FORMACIÓN EN MATERIA DE PROTECCIÓN RADIOLÓGICA Y CONTROL DE CALIDAD DE LOS EQUIPOS DE RADIOLOGÍA Y ELECTROMEDICINA DE LOS CENTROS ASISTENCIALES Y HOSPITALARIOS DE FREMAP, MUTUA COLABORADORA CON LA SEGURIDAD SOCIAL Nº61',NULL,NULL,'Debe rellenar el documento \'Proposal report\' (PPR). Vea la ayuda',NULL,'VICENT GUARDIA',2,2,10,6,1,5,2,30,0,0,0,'48 meses','2017-06-02',NULL,10.00,45274.20,NULL,NULL,'LICT/99/109/2017/0016','FREMAP',3,NULL,NULL,0.00,NULL,'FREMAP',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(36,'0','2017-06-01',NULL,'2017-06-29',900000.00,NULL,NULL,NULL,NULL,'TRATAMIENTO DE RESIDUOS LÍQUIDOS DE LA LIMPIEZA DE LOS GGVV DE ASCÓ','En estudio el proceso para tratamiento de los residuos. El estudio lo lleva Titania (Amparo Ponce).\nPor ahora no van a solicitar oferta pues tienen el contrato con SOCODEL y hasta finales de 2017 está vigente.',NULL,'No se precisa ninguna autorización adicional',NULL,'Antonio Martínez',2,2,5,25,1,3,NULL,2,4,1,0,'2017','2017-10-09',NULL,15.00,135000.00,1,NULL,'no aplica','ANAV',3,NULL,NULL,0.00,NULL,'TRATAMIENTO RESIDUOS',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(37,'19','2017-06-05',NULL,'2017-06-05',449777.78,8096000.00,NULL,NULL,NULL,'PIntura calderas y chimenas',NULL,NULL,'Debe rellenar el documento \'Proposal report\' (PPR). Vea la ayuda',NULL,'Fernando Fernandez.   Juan Carlos Santamaria OHL',6,2,4,3,3,1,NULL,13,0,0,0,'4','2017-08-15',NULL,15.50,69715.56,NULL,2,NULL,'OHL',0,18.00,'2017-06-05',0.00,NULL,'Pint Empalme 1',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(38,'1','2017-06-09',NULL,'2017-12-28',331136.00,NULL,NULL,NULL,NULL,'Reparaciones mecánicas en CNC',NULL,NULL,'No se precisa ninguna autorización adicional',NULL,NULL,2,2,5,18,1,5,NULL,29,3,0,0,'2017','2017-01-27',NULL,NULL,NULL,1,1,'739002','IBERDROLA',4,NULL,NULL,0.00,NULL,'Reparaciones mecánicas en CNC',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(39,'2','2017-06-09',NULL,'2017-12-28',39136.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'No se precisa ninguna autorización adicional',NULL,NULL,2,2,5,11,1,5,NULL,29,3,0,0,'2017','2017-01-30',NULL,NULL,NULL,1,1,NULL,'IBERDROLA',1,NULL,NULL,0.00,NULL,'Retirada y gestión de residuos de construcción y demolición',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(40,'3','2017-06-09',NULL,'2017-06-09',5850.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'No se precisa ninguna autorización adicional','4503838444','Luis López Álvarez',2,2,5,7,1,4,NULL,29,3,0,0,'2º TRIMESTRE 2017','2017-02-07',NULL,NULL,NULL,1,1,NULL,'IBERDROLA',1,NULL,NULL,0.00,NULL,'ACTIVIDADES DE LIMPIEZA PARA CORTE DE BARRAS Y CANALES',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(41,'4','2017-06-09',NULL,'2017-06-09',58125.00,NULL,NULL,NULL,NULL,'Los trabajos consisten en:\n-	Vaciar el agua remanente (unos 50 cm) de la balsa que se va a limpiar por medio de una bomba chupacharcos hacia la otra balsa.\n-	Bombear el fango de la balsa por medio de una bomba chupalodos hacia un primer depósito de unos 4 m3 en la explanada de la balsa de vertidos.\n-	Bombear desde ese primer depósito hasta otro depósito intermedio de igual capacidad situado en la zona del puente del canal de agua de circulación.\n-	Bombear desde este segundo depósito al cono central del espesador del N75.\nLa operación del sistema N75 para el procesado de los fangos correrá a cargo de Iberdrola Generación. El ritmo de producción de lodo desgotado es de unos 6 m3/h.\n-	Descargar el fango tratado a camines apropiados para su posterior traslado al vertedero de inertes de la Central. Es obligatorio la utilización de dos camiones para optimizar el tiempo del proceso, estos camiones deberán estar preparados para no dejar caer al exterior el agua que todavía poder soltar el lodo tratado.\nAl inicio del llenado de cada camión se tomará una muestra del lodo que analizará la Unidad de Química. En todo caso se tomará una muestra cada 5 m3 o fracción cargada.\nCada camión deberá pesarse en la báscula de la Central y una vez conocido el resultado del análisis, si este es satisfactorio, se trasladará el lodo tratado al vertedero de Inertes, situado a uno 2 km de la Central.\n',NULL,NULL,'No se precisa ninguna autorización adicional',NULL,NULL,2,2,5,13,1,5,NULL,29,3,0,0,'1 MES','2017-02-10',NULL,NULL,NULL,1,1,'741300','IBERDROLA',2,NULL,NULL,0.00,NULL,'EXTRACCIÓN LODOS DE LAS BALSAS DE VERTIDO Y TRASLADO A VERTEDERO DE INERTES',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(42,'5','2017-06-09',NULL,'2017-06-09',5091.16,NULL,NULL,NULL,NULL,'Alquiler de remolque para traslado de equipos de Gestión de Emergencia con las siguientes características.',NULL,NULL,'No se precisa ninguna autorización adicional','4503901343','Fernando Albertos',2,2,5,10,1,4,NULL,29,3,0,0,'3 meses','2017-03-22',NULL,NULL,NULL,1,1,NULL,'IBEDROLA',2,NULL,NULL,0.00,NULL,'ALQUILER REMOLQUE PARA TRASLADO DE EQUIPOS FUKUSHIMA',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(43,'6','2017-06-09',NULL,'2017-06-09',9226.10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'No se precisa ninguna autorización adicional','4503845429',NULL,2,2,5,NULL,1,4,NULL,29,3,0,0,'2 meses','2017-02-23',NULL,NULL,NULL,1,1,'740254','IBERDROLA',1,NULL,NULL,0.00,NULL,'SERVICIO COMPLEMENTARIO DE PR PARA PROYECTO DE CORTE DE BARRAS Y CANALES',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(44,'7','2017-06-09',NULL,'2017-06-09',4724.00,NULL,NULL,NULL,NULL,'Actualización de la base de datos de productos químicos en almacén.\nListado y actualización de las fichas de seguridad de los productos químicos.\n',NULL,NULL,'No se precisa ninguna autorización adicional','4503886621','Raúl Redondo Herranz',2,2,5,10,1,4,NULL,29,3,0,0,'2 meses','2017-03-02',NULL,NULL,NULL,1,1,NULL,'IBERDROLA',0,NULL,NULL,0.00,NULL,'Actualización de bases de datos y gestión de almacén de Productos Químicos',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(45,'8','2017-06-09',NULL,'2017-06-09',98876.00,NULL,NULL,NULL,NULL,'•	Resolución de anomalías informadas por los distintos Equipos de Inspección.\nTomando como referencia recargas anteriores, se estima, que serán un número aproximado a las 1700, las deficiencias de distintas disciplinas que serán reportadas por los Equipos de Inspección. Las deficiencias ubicadas en cubículos inaccesibles en Operación Normal, deberán quedar  resueltas antes del arranque de la Planta.\n\n•	Acondicionamiento y Orden de las instalaciones y zonas de trabajo.\nConsecuencia de la gran cantidad de trabajos y personas que intervienen en la recarga, se hace necesario a la finalización de la misma, acometer multitud de actividades, con el objetivo de devolver la Planta al estado de conservación en el que se encontraba al inicio de la Recarga, haciendo especial hincapié en aquellas actividades que eviten la acumulación de cargas térmicas (incluidos plásticos), obstrucciones en Sumideros y Equipos Auxiliares sueltos en Edificios Sísmicos. Se estima que estas actividades, al igual que en recargas anteriores, ronde las 2.000 actuaciones. Específicamente se relacionan a continuación las actividades objeto de este alcance:\n-	Retirada de Equipos Auxiliares sin autorizar.\n-	Anclaje de Elementos sueltos.\n-	Retirada de herramientas abandonadas.\n-	Retirada de plásticos.\n-	Retirada de cargas térmicas\n-	Retirada de mangueras mecánicas no conectadas y fuera de su lugar de acopio. \n-	Retiradas de alargaderas eléctricas sin conectar y fuera de su lugar de acopio.\n-	Retirada de cables o bobinas sin conectar y abandonados.\n-	Reposición de aislamiento térmico deteriorado.\n-	Reposición de placas de identificación deterioradas.\n-	Retirada de productos químicos sin autorización (Sin identificar según PC-005)\n-	Retirada de FME abandonados o fuera de su lugar de acopio.\n-	Retirada de basura almacenada en los cubículos.\n-	Resolución de defectos de pintura detectados.\n•	Limpieza final especifica de las zonas de trabajo en los 32 cubículos , inaccesibles en Operación Normal,	que contienen Equipos y Componentes relacionados con la seguridad.\nTras la realización de las actividades relacionadas en los puntos anteriores se procederá a una Limpieza Específica de los cubículos que con mayor intensidad han sido afectados por la Recarga, priorizando las intervenciones en función del riesgo radiológico y el nivel de accesibilidad.\n',NULL,NULL,'No se precisa ninguna autorización adicional','4503867633','Ángel Lázaro Lorentes',2,2,5,7,1,4,NULL,29,3,0,0,'1 mes','2017-03-23',NULL,NULL,NULL,1,1,'740437','IBERDROLA',2,NULL,NULL,0.00,NULL,'RECUPERACIÓN DE PLANTA - RECARGA 21',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(46,'9','2017-06-09',NULL,'2017-06-09',173695.00,NULL,NULL,NULL,NULL,'2.1.	TRABAJOS DE CARÁCTER MECÁNICO. Edición de Orden Cambio de Proyecto (OCP) Instalación de elementos de maniobras para válvulas N11FF098A, N11FF098B, N11FF098C y N11FF098D. Edición de Orden Cambio de Proyecto (OCP) Instalación de elementos de maniobras para izado de válvulas en R21.	Estudio y análisis en campo para la edición de Orden de Cambio de Proyecto para instalación de (OCP) PLATAFORMA FIJA EN MURO NORTE •	Implantación mecánica de la OCP para Instalación de elementos de maniobras para válvulas N11FF098A, N11FF098B, N11FF098C y N11FF098D.•	Implantación mecánica de la OCP para  Instalación de elementos de maniobra para izado de válvulas en R21.•	Suministro, fabricación y montaje aislamiento térmico para válvulas N11FF098B y N11FF098D. 2.2.	TRABAJOS DE OBRA CIVIL•	Reparación estructural del hormigón de todo el muro superior norte del túnel de vapor (A404). Incluido el recubrimiento posterior conforme a los procedimientos/productos de la propia central.•	Realización de pequeñas reparaciones estructurales de hormigón junto a las compuertas del propio túnel de vapor. Incluido el recubrimiento posterior conforme a los procedimientos/productos de la propia central.•	Inspección de detalle del estado estructural de los muros de hormigón, y reparar en consecuencia, del hueco de equipos existente entre el propio túnel de vapor y el cubículo A008.•	Montaje y posterior desmontaje de andamio colgante eléctrico (plataforma suspendida modular), desde la terraza superior del edificio de auxiliar, para poder ejecutar la reparación del muro superior norte del túnel de vapor. Se tratará de un andamio colgante totalmente homologado (UNE-EN 1808 y otros requisitos en materia de prevención de riesgos laborales) y conforme a los requisitos de montaje de estructuras temporales de acceso de la propia central. •	Realización de los taladros necesarios para la colocación del nombrado andamio sobre el forjado de losas de hormigón superior. Incluido el posterior tapado de los taladros realizados y la reposición de la lámina de impermeabilización superior de la terraza. 2.3.	TRABAJOS ELÉCTRICOS•	Mejorar la iluminación del cubículo, a fin de reducir los tiempos de estancia mientras se realicen trabajos en el cubículo, factor determinante al ser una zona de radiación V. (Instalación de 6 nuevos puntos de luz y sustitución de punto de luz existente. Sustitución de acometida en los circuitos interiores del cubículo). •	Ampliación de 6 tomas de corriente de 380 – 220 V para el uso de herramienta eléctrica. •	Revisión y adecuación del cuadro de protecciones para el Puente Grúa Túnel de Vapor. •	Modificar la situación de los interruptores de encendido de la iluminación en el Túnel Vapor. •	Sustitución  de los cuadros de alumbrado normal y de Salvaguardia, AN1-4-7, AS1-2-7 y AS2-2-5. •	Sustitución cable de alimentación Polipasto L35EE002.•	Sustitución del cable y la pasteca para el Puente Grúa del Túnel de Vapor (Sustitución del cable metálico de elevación, motón inferior, 2 poleas y placa de capacidad) 2.4. SUMINISTRO DE MATERIAL\n•	De los paneles eléctricos a sustituir según especificación técnica Nº 02-1E-0902 \n•	De los proyectores a instalar según OCP-5359 y especificación técnica O2-1E-0901 y R52-4A018\n•	De los materiales auxiliares necesarios para el saneado de la instalación o necesarios para la nueva instalación (cables, bridas, flexos, soportes, protecciones, etc.)\n•	Soportación y los accesorios para habilitar la soportación existente.\n•	Interruptores de encendido\n•	Protecciones eléctricas para las tomas de corriente marechales.\n•	Cable metálico de elevación y gancho para el Puente Grúa \n•	Placa de capacidad del Puente Grúa \n•	Motón inferior de 2 poleas para el Puente Grúa\nLas tomas de corriente marechales y los materiales necesarios para su instalación, el cable eléctrico, el conduit y sus accesorios serán suministrados por CNC.','Subcontratada CEGELEC para trabajos eléctricos\nSubcontratada IOC MARTÍNEZ para trabajos Obra Civil',NULL,'No se precisa ninguna autorización adicional','4503919490','Angel Lázaro Lorente',2,2,5,18,1,4,NULL,29,3,0,0,'2 meses','2017-03-14','CEGELEC\nIOC MARTÍNEZ',NULL,NULL,1,1,'745260','IBERDROLA',7,NULL,NULL,0.00,NULL,'TRABAJOS EN TÚNEL DE VAPOR DURANTE RECARGA 21',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(47,'10','2017-06-09',NULL,'2017-06-09',32818.54,NULL,NULL,NULL,NULL,'LIMPIEZA TECTYL EN ROTOR LPB Y DIAFRAGMAS\n\n•	Retirada de la protección de Tectyl del rotor LPB de repuesto y de los diafragmas 10, 14, 15 y 16 L/T y L/G:\n-	Preparación de los trabajos de retirada del Tectyl y de recogida de los residuos  generados por la limpieza.\n-	Pulverización o impregnación del rotor y los diafragmas con disolvente para limpieza.\n-	Retirada del recubrimiento de protección del rotor y de los diafragmas y del disolvente empleado para limpieza.\n-	Limpieza y acondicionamiento de la zona.\n•	REPOSICIÓN DE LA PROTECCIÓN DE TECTYL DEL ROTOR LPB DE REPUESTO Y DE LOS DIAFRAGMAS 10, 14, 15 y 16 L/T y L/G:\n-	Preparación de los trabajos de reposición del Tectyl y de recogida de los residuos  generados.\n-	Aplicación de una capa de Tectyl para protección anti-corrosión a toda la superficie del rotor LPB y los diafragmas de acuerdo a los requisitos del GEK 42257\n-	Limpieza y acondicionamiento de la zona.\n\nQuedarán incluidos dentro del alcance de este servicio el suministro de los productos (disolventes, Tectyl, etc...), materiales, maquinaria  y medios auxiliares (andamios) necesarios para el desarrollo de las actividades descritas anteriormente.\n\nTras la ejecución del servicio se procederá a la regularización de informes de las actividades realizadas (actualización de planes de mantenimiento, ubicaciones técnicas, hojas de ruta, etc.)\n\n',NULL,NULL,'No se precisa ninguna autorización adicional',NULL,'Rubén Álvarez',2,2,5,13,1,2,NULL,29,3,0,0,'1,5 meses','2017-06-02',NULL,NULL,NULL,1,1,'746186','IBERDROLA',1,NULL,NULL,0.00,NULL,'LIMPIEZA Y REPOSICIÓN TÉCTYL EN ROTOR LPB',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(48,'11','2017-06-09',NULL,'2017-12-28',18165.00,NULL,NULL,NULL,NULL,'-	Verificación del cumplimiento de los procedimientos de planta por parte de las empresas contratistas, bajo la supervisión del responsable e ejecución de la organización de C. N. Cofrentes.\n-	Comunicación de incidencias detectadas al responsable de ejecución.\n-	Cumplimentación y archivo de los registros generados durante los trabajos.\n-	Realización de informes diarios del desarrollo de los trabajos.\n',NULL,NULL,'No se precisa ninguna autorización adicional',NULL,NULL,2,2,5,18,1,5,NULL,29,3,0,0,'2 meses','2017-06-29',NULL,NULL,NULL,1,1,'742649','IBERDROLA',2,NULL,NULL,0.00,NULL,'SUPERVISIÓN EJECUCIÓN EN PLANTA DE CORTE DE BARRAS Y CANALES ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(49,'12','2017-06-09',NULL,'2017-06-09',122593.00,NULL,NULL,NULL,NULL,'Actividad 1: Fontanería (posición 00010).\n•	Desmontar tuberías de fontanería y saneamiento, y replantear, si procede.\n•	Instalación de fontanería completa con tuberías multicapa PERT-AL-PERT  utilizando el sistema roscado de colectores para las redes de agua fría y caliente y con tuberías de PVC serie B para las redes de desagüe. \n•	Montar sanitarios y puesta en servicio de los mismos:\n	9 ud. Lavabo de porcelana vitrificada en blanco de 550x485 mm colocado con pedestal y con anclajes a la pared, con grifería monomando, con rompechorros y enlaces de alimentación flexibles, incluso válvula de desagüe de 32 mm, llaves de escuadra de 1/2\" cromadas, y latiguillos flexibles de 200 mm y de 1/2\". Preferentemente marca ROCA.\n	6 ud. Inodoro de porcelana vitrificada en blanco con sifón, de tanque bajo, colocado mediante tacos y tornillos al solado, incluso sellado con silicona, y compuesto por: taza, tanque bajo con tapa y mecanismos y asiento con tapa lacados, con bisagras de acero, instalado, incluso con llave de escuadra de 1/2\" cromada y latiguillo flexible de 200 mm y de 1/2\". Preferentemente marca ROCA.\n	6 ud. Escobillero.\n	6 ud. Portarrollos. Preferentemente marca ROCA.\n	5 ud. Urinario mural de porcelana vitrificada blanco con sifón, colocado mediante anclajes de fijación a la pared, y dotado de tapón de limpieza y manguito, instalado con grifo temporizador para urinarios, incluso enlace de 1/2\" y llave de escuadra de 1/2\" cromada. Preferentemente marca ROCA.\n	18 ud. Plato de ducha de porcelana con grifería mezcladora exterior monomando, con ducha teléfono, flexible de 1500 mm y soporte articulado, incluso válvula de desagüe sifónica, con salida horizontal de 60 mm. Comprobar que el desagüe tiene la inclinación suficiente para que una vez instalado no revoque el agua. Preferentemente marca ROCA.\n•	18 ud. Percha doble. Preferentemente marca ROCA.\n2.3	Actividad 2: Obra civil (posición 00020).\n•	Desmontar los alicatados actuales mediante medios manuales y/o mecánicos.\n•	Las baldosas del suelo no se levantarán y se respetarán colocando el nuevo solado sobre el actual. \n•	Alicatar todas las paredes con azulejo de 310x430 mm, BIII s/EN-14411 (azulejo poros prensado esmaltado), color ocre s/NTE-RPA-4:\n	Con listelo del mismo material de 100x310 mm, recibido con adhesivo C2 s/EN-12004 (adhesivo cementoso mejorado).\n	Rejuntado con mortero tapajuntas CG2 s/EN-13888 (material de rejuntado cementoso mejorado).\n•	Instalar baldosas de gres esmaltado 310 x 310 mm, aproximadamente, para tráfico denso (abrasión IV) (AI,AIIa s/EN-121, EN-186) s/NTE-RSR-2:\n	Recibido con adhesivo C1 s/EN-12004 gris(adhesivo cementoso normal).\n	Rejuntado con mortero tapajuntas CG2 s/EN-13888 (material de rejuntado cementoso mejorado).\nActividad 3: Pintura (posición 00030).\n•	Para las paredes que van pintadas (vestuario): guarnecido maestreado de yeso proyectado a máquina en paramentos verticales de 15 mm . de espesor (incluido formación de rincones, guarniciones de huecos y remates con pavimento) con maestras cada 1,50 m.\n•	Pintar puertas exteriores (2 ud.) de color blanco e instalar barra antipánico de apertura hacia el exterior.\n•	Pintar las paredes enlucidas con yeso con pintura plástica acrílica lisa mate lavable profesional, en blanco. Dos manos, incluso imprimación y plastecido.\nActividad 4: Reparaciones (posición 00040).\n•	Retirar los elementos metálicos, mobiliario y otros componentes existentes en el interior de la zona de trabajo (vestuarios, duchas y aseos). Todo el mobiliario que haya que moverse será coordinado por personal de Iberdrola indicándoles dónde deben colocarlo.\n•	Retirar los espejos, puertas de acceso interiores y ventanas.\n•	Todos los escombros generados no reutilizables ni valorables serán depositados en los contenedores identificados correspondientes para su posterior retirada.\n•	Para las paredes que van alicatadas (aseos y duchas): enfoscado maestreado y fratasado con mortero de cemento CSIV-W2, en paramentos verticales de 20 mm de espesor (incluido regleado, sacado de aristas y rincones) con maestras cada 3 m.\n•	Instalar nuevas ventanas (24 ud.) y puertas interiores (3 ud., una de ellas con cerradura) de aluminio lacado color blanco.\n•	Montaje de toda la instalación eléctrica adecuándola a la existente.\n	1 ud. Punto de luz sencillo, incluyendo caja de mecanismo universal con tornillos e interruptor unipolar. Preferentemente marca SIMON.\n	4 ud. Punto conmutado sencillo, incluyendo cajas de mecanismo universal con tornillos y conmutadores. Preferentemente marca SIMON.\n	5 ud. Base de enchufe con toma de tierra lateral Schuko y embornamiento rápido, en sistema monofásico con toma de tierra (fase, neutro y tierra), incluyendo caja de mecanismo universal con tornillos y base de enchufe sistema schuko 10-16 A. (II+t.). Preferentemente marca SIMON.\n	1 ud. Toma de teléfono con 6 contactos para conector RJ-12, incluyendo caja de mecanismo universal con tornillos y toma de teléfono con 6 contactos para conector RJ-12. Preferentemente marca SIMON.\n	5 ud. Luminaria de emergencia con grado de protección IP65 (280 x 59,7 x 120 mm, largo x ancho x alto), un flujo luminoso de 350 lm, con una autonomía mínima de 1 hora, funcionamiento no permanente y alimentada a 220 Vca/50 Hz. Preferentemente marca Legrand modelo B65 LED.\n	Luminarias de techo con grado de protección IP65 (1500 x 80 x 80 mm, largo x ancho x alto) y un flujo luminoso de 5800 lm. Preferentemente marca OSRAM modelo NEPTUNE LED Large.\n	Luminarias de techo con grado de protección IP44 (1500 x 80 x 80 mm, largo x ancho x alto) y un flujo luminoso de 5800 lm. Preferentemente marca OSRAM modelo NEPTUNE LED Large.\n•	Suministrar y montar:\n	Jabonera. Preferentemente marca ROCA.\n	Espejos con marco de acero inoxidable para lavabos. \n	Secamanos de aire caliente.\n	Dispensador de rollo de papel secamanos.\n	Dosificadores de jabón líquido.\n	Papeleras\n	Extractores en la zona de vestuarios y aseos.\n',NULL,NULL,'No se precisa ninguna autorización adicional',NULL,NULL,2,2,5,18,1,3,NULL,29,3,0,0,'4 meses','2017-04-06',NULL,NULL,NULL,1,NULL,'742826','IBERDROLA',1,NULL,NULL,0.00,NULL,'REHABILITACIÓN VESTUARIO VPR-2',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(50,'13','2017-06-09',NULL,'2017-06-09',5.84,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'No se precisa ninguna autorización adicional',NULL,'Juan José Broseta Diez',2,2,5,NULL,1,4,NULL,29,3,0,0,'2 meses','2017-04-20',NULL,NULL,NULL,1,1,NULL,'REVANTI ',0,NULL,NULL,0.00,NULL,'ADECUACIÓN DE MATERIALES PREVIO A SU TRATAMIENTO EN LA ESTACIÓN DE CHORRO',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(51,'14','2017-06-09',NULL,'2017-06-09',28960.00,NULL,NULL,NULL,NULL,NULL,'Se subcontrata a al empresa MECANOL',NULL,'No se precisa ninguna autorización adicional','4503905706',NULL,2,2,5,2,1,4,NULL,29,3,0,0,'2 meses','2017-04-27','MECANOL',NULL,NULL,1,1,'743669','IBERDROLA',0,NULL,NULL,0.00,NULL,'ESTRUCTURAS Y SOPORTES RECOMBINADORES',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(52,'15','2017-06-09',NULL,'2017-12-28',34300.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'No se precisa ninguna autorización adicional',NULL,'José Antonio Cegarra',2,2,5,18,1,5,NULL,29,3,0,1,'2 meses','2017-04-27',NULL,NULL,NULL,NULL,1,'744420','IBERDROLA',2,NULL,NULL,0.00,NULL,'MONTAJE DE PUERTA PCI-SISMICO',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(53,'16','2017-06-09',NULL,'2017-06-09',5768.33,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'No se precisa ninguna autorización adicional','4503905706','Luis López',2,2,5,7,1,4,NULL,29,3,0,0,'2 meses','2017-05-10',NULL,NULL,NULL,1,1,NULL,'IBERDROLA',0,NULL,NULL,0.00,NULL,'ALQUILER DEL EQUIPO  DE FILTRADO SUMERGIBLES PARA APOYO AL PROYECTO DE CORTES DE BARRAS Y CANALES',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(54,'17/120','2017-06-13',NULL,'2017-11-14',496577.00,NULL,NULL,NULL,NULL,'Conditionnement de 740 fûts de déchets historiques TFA du radier G2, site MARCOULE  ','Bid/No Bid',NULL,'Debe rellenar el documento \'Bid No Bid\' (BNB). Vea la ayuda',NULL,NULL,3,2,1,1,2,5,3,32,18,0,0,'Avant sept2018','2017-07-05',NULL,NULL,NULL,1,1,NULL,'CEA Marcoule',13,NULL,NULL,0.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(55,'170009','2017-06-13',NULL,'2017-10-31',9971.78,NULL,NULL,NULL,NULL,'SUMINISTRO Y SUSTITUCIÓN DE LOS FILTROS DEL SISTEMA DE VENTILACIÓN DEL ÁREA DEL ALMACÉN DE RESIDUOS RADIACTIVOS  DEL HOSPITAL UNIVERSITARIO LA PAZ, AÑO 2017\n',NULL,NULL,'No se precisa ninguna autorización adicional',NULL,'Marceliano Curiel',2,2,1,8,1,4,NULL,3,0,0,0,'2017','2017-06-13',NULL,58.85,5868.39,NULL,NULL,'NO EXISTE','HOSPITAL UNIVERSITARIO LA PAZ',2,NULL,NULL,0.00,NULL,'SUMINISTRO Y SUSTITUCIÓN DE LOS FILTROS DEL SISTEMA DE VENTILACIÓN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(56,'13','2017-06-14',NULL,'2017-07-12',8785.00,NULL,NULL,NULL,NULL,'Servicio de apoyo de limpieza a los trabajos de reparación del Diesel IV',NULL,NULL,'No se precisa ninguna autorización adicional','US17RA44529PB',NULL,2,2,5,13,1,4,NULL,24,1,0,0,'Mayo 2017','2017-06-13',NULL,NULL,NULL,1,1,'210027','CNAT',1,NULL,NULL,170113.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(57,'170004','2017-06-14',NULL,'2017-06-14',5469.00,NULL,NULL,NULL,NULL,'SERVICIOS DE CONTROL DE CALIDAD DE EQUIPOS DE RADIODIAGNÓSTICO MÉDICO Y DOSIMETRÍA PERSONAL ','EL PRECIO DEL SERVICIO DE DOSIMETRÍA ES:\nPERSONAL  80 € AÑO/USUARIO, ÁREA 80 € AÑO/PUNTO Y EXTREMIDADES 80 €/AÑO/USUARIO.',NULL,'No se precisa ninguna autorización adicional',NULL,'ISIDRO PÉREZ',2,2,10,21,1,2,NULL,30,0,0,0,'12 meses','2017-06-14',NULL,10.00,546.90,NULL,NULL,NULL,'MARINA SALUD, S. A.',0,NULL,NULL,0.00,NULL,'HOSPITAL DE DENIA',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(59,'170501','2017-06-14',NULL,'2017-06-14',52300.00,52300.00,NULL,0.00,0.00,'Limpieza 3 tanques en puerto valencia',NULL,NULL,'No se precisa ninguna autorización adicional',NULL,'Javier Rodrigo - jefe planta',2,2,5,13,1,2,3,2,0,0,0,'4ºT 2017','2017-06-14',NULL,30.00,15690.00,NULL,1,NULL,'GALP',2,1.00,'2017-06-14',0.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(60,'0014','2017-06-15',NULL,'2017-06-15',1442185.74,NULL,NULL,NULL,NULL,'SERVICIO DE INSPECCIÓN DE RESIDUOS RADIACTIVOS DE INSTALACIONES RADIACTIVAS Y NO REGULADAS Y ASISTENCIA TÉCNICA A LAS ACTIVIDADES DE LA UTPR',NULL,NULL,'Debe rellenar el documento \'Proposal report\' (PPR). Vea la ayuda',NULL,'JAVIER RIVERO',2,2,10,21,1,5,NULL,30,0,0,0,'36 MESES','2017-02-07',NULL,10.00,144218.57,NULL,NULL,'Al 0-CO-UT-201 6-0004','ENRESA',0,NULL,NULL,NULL,NULL,'ENRESA',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(61,'0048','2017-06-15',NULL,'2017-06-15',10500.00,NULL,NULL,NULL,NULL,'OFERTA DE EVALUACIÓN DE IMPACTO RADIOLÓGICO',NULL,NULL,'No se precisa ninguna autorización adicional',NULL,'BENJAMÍN MORA',2,2,10,21,1,4,NULL,30,0,0,0,'6 MESES','2017-05-04',NULL,15.00,1575.00,NULL,NULL,NULL,'FERTIBERIA',0,NULL,NULL,NULL,NULL,'FERTIBERIA',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(62,'17010','2017-06-20',NULL,'2017-10-31',2407.90,NULL,NULL,NULL,NULL,'ESTUDIO DE LA SEGREGACIÓN DE FUENTES RADIACTIVAS DE Am y Ra DE LOS DETECTORES DIH EN EL ALMACÉN DE RESIDUOS RADIACTIVOS DEL HOSPITAL UNIVERSITARIO LA PAZ, AÑO 2017\n',NULL,NULL,'No se precisa ninguna autorización adicional',NULL,NULL,2,2,1,1,1,4,NULL,3,0,0,0,'2017','2017-06-16',NULL,15.00,361.19,NULL,NULL,'NO EXISTE','HOSPITAL UNIVERSITARIO LA PAZ',1,NULL,NULL,0.00,NULL,'HOSPITAL UNIVERSITARIO LA PAZ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(63,'17/119','2017-06-20',NULL,'2017-06-20',6921987.00,NULL,NULL,NULL,NULL,'Prestation de services  de décontamination chimique des circuit RRA et RCV pour les centrales Edf. Contrat sur 5,5ans',NULL,NULL,'Debe rellenar el documento \'Proposal report\' (PPR). Vea la ayuda',NULL,NULL,3,2,5,7,2,5,NULL,32,18,0,0,NULL,'2017-03-03',NULL,NULL,NULL,1,NULL,NULL,'EDF',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(64,'0054','2017-06-20',NULL,'2017-08-10',106836.00,1923048.00,NULL,NULL,NULL,'Pintura tuberías cogeneracion Altamira',NULL,NULL,'No se precisa ninguna autorización adicional',NULL,'Jorge Raposo',6,2,4,3,3,5,NULL,13,0,0,0,NULL,'2017-08-28','FREI',19.00,20298.84,NULL,3,NULL,'Tamoin',3,18.00,'2017-08-28',2017.00,NULL,'Cog Tamoin Altamira',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(65,'2017-0051','2017-06-19',NULL,'2017-06-19',1978736.39,35617255.00,NULL,NULL,NULL,'Pintura CCC Escobedo, Nuevo Leon',NULL,NULL,'Debe rellenar el documento \'Proposal report\' (PPR). Vea la ayuda',NULL,'Alan Flores Castro',6,2,4,3,3,2,NULL,13,0,0,0,NULL,'2018-02-24',NULL,17.70,383890.70,NULL,1,NULL,'Iberdrola',4,18.00,'2018-02-24',NULL,NULL,'Pint Escobedo',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(66,'0052','2017-06-22',NULL,'2017-06-22',2165803.67,38984466.00,NULL,NULL,NULL,'Pintura en CCC Emplame 2. Guaymas Sonora.',NULL,NULL,'Debe rellenar el documento \'Proposal report\' (PPR). Vea la ayuda',NULL,NULL,6,2,4,3,3,2,NULL,13,0,0,0,NULL,'2017-12-28','FREI',17.70,386328.70,NULL,3,NULL,'Duro Felguera-sener',1,18.00,'2017-12-28',NULL,NULL,'Empalme 2',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(67,'0053','2017-06-23',NULL,'2017-06-23',62386.00,1122948.00,NULL,NULL,NULL,'Estación de bombeo de ac sulfúrico CCC Tamazunchale',NULL,NULL,'No se precisa ninguna autorización adicional',NULL,NULL,6,2,4,18,3,2,NULL,13,0,0,0,NULL,'2017-10-21',NULL,18.00,0.00,NULL,3,NULL,'Iberdrola',0,18.00,'2017-06-23',NULL,NULL,'Estacion Bombeo Tama',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(68,'0014','2017-06-23',NULL,'2017-06-23',259325.00,4667850.00,NULL,NULL,NULL,'Trabajos de pintura en parada de mantenimiento',NULL,NULL,'Debe solicitar autorización por correo electrónico',NULL,'HUGO',6,2,4,3,3,5,NULL,13,0,0,0,NULL,'2017-03-06',NULL,20.20,52383.65,NULL,3,NULL,'IENOVA',0,18.00,'2017-06-23',NULL,NULL,'Ienova Mexicali',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(69,'16','2017-06-24',NULL,'2017-08-10',52666.67,948000.00,NULL,0.00,NULL,'Contruccion caseta PTA CCC Altamira 3y4',NULL,NULL,'No se precisa ninguna autorización adicional',NULL,'Guadalupe Cruz Contreras',6,2,4,23,3,5,NULL,13,0,0,0,'2 meses','2017-08-16',NULL,19.00,10006.67,NULL,3,'17/007','Iberdrola ALtamira',2,18.00,'2017-08-16',2017.00,NULL,'Caseta PTA',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(70,'170011','2017-06-27',NULL,'2017-06-27',1640.00,NULL,NULL,NULL,NULL,'SUSTITUCION DE LOS FILTROS DE LA IR-15c',NULL,NULL,'No se precisa ninguna autorización adicional',NULL,NULL,2,2,1,1,1,1,NULL,3,9,0,0,'2 DIAS','2017-06-20',NULL,52.98,868.87,NULL,NULL,'NO EXISTE','CIEMAT',2,NULL,NULL,0.00,NULL,'fILTROS',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(71,'0056','2017-06-30',NULL,'2017-08-10',4469.67,67045.00,NULL,NULL,NULL,'Reparacion 2 m de pared balsas de refrigeración',NULL,NULL,'No se precisa ninguna autorización adicional',NULL,'Eduardo Cab',6,2,4,23,3,4,NULL,13,0,0,0,'7 días','2017-08-15',NULL,20.00,NULL,NULL,3,NULL,'Iberdrola',1,15.00,'2017-08-15',2017.00,NULL,'Reparacion pared balsa',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(72,'0057','2017-07-01',NULL,'2017-07-01',11566.67,208200.00,NULL,NULL,NULL,'Mantenimiento cobertizos dosificadores',NULL,NULL,'No se precisa ninguna autorización adicional',NULL,'Eduardo Cab',6,2,4,18,3,2,NULL,13,0,0,0,'1  mes ','2017-04-04',NULL,19.00,2222.36,NULL,3,NULL,'Iberdrola',1,18.00,'2017-04-04',2017.00,NULL,'Cobertizos',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(73,'0058','2017-07-01',NULL,'2017-07-01',247277.44,4450994.00,NULL,NULL,NULL,'Proyección protección pasiva contra el fuego en estaciones de tren.',NULL,NULL,'Debe solicitar autorización por correo electrónico',NULL,'Jorge Yuste',6,2,4,24,3,1,NULL,13,0,0,0,' 1 mes','2017-04-09',NULL,21.00,51928.26,NULL,3,NULL,'Chepro',0,18.00,'2017-07-01',2017.00,NULL,'Estaciones  tren ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(74,'11','2017-06-30',NULL,'2017-06-30',200256.28,3604613.00,NULL,NULL,NULL,'Limpieza domos naves de producción.',NULL,NULL,'Debe solicitar autorización por correo electrónico',NULL,'Sergio Moncada',6,2,4,13,3,5,NULL,13,0,0,0,'5,5 meses','2017-02-07',NULL,24.00,48061.51,NULL,3,NULL,'Nemak',1,18.00,'2017-02-07',201770011.00,NULL,'Limpieza domos',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(75,'0029','2017-07-01',NULL,'2017-07-01',8213.22,147838.00,NULL,NULL,NULL,'Limpieza tuberías ventilación',NULL,NULL,'No se precisa ninguna autorización adicional',NULL,NULL,6,2,4,13,3,2,NULL,13,0,0,0,'POr dia','2017-05-29',NULL,20.00,1642.64,NULL,3,NULL,'PSW',0,18.00,'2017-07-01',2017.00,NULL,'Limpieza PSW',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(76,'0001','2017-07-01',NULL,'2017-07-01',6815821.67,122684790.00,NULL,NULL,NULL,'Prefabricado y montaje tuberías Peñoles Torreón.',NULL,NULL,'Debe rellenar el documento \'Proposal report\' (PPR). Vea la ayuda',NULL,'Arturo ',6,2,4,18,3,2,NULL,13,0,0,0,'1 año','2017-01-24',NULL,19.50,1329085.23,NULL,3,NULL,'Sener',1,18.00,'2017-01-24',2017.00,NULL,'Peñoles Torreon sener',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(77,'0022','2017-06-30',NULL,'2017-07-01',13747.94,247463.00,NULL,NULL,NULL,'Sand blast y pintura tuberías cogeneracion de Tamoin en Altamira',NULL,NULL,'No se precisa ninguna autorización adicional',NULL,'Jorge Raposo',6,2,4,3,3,5,NULL,13,0,0,0,'2 semanas','2017-02-28',NULL,19.00,2612.11,NULL,3,NULL,'Tamoin',1,18.00,'2017-02-28',2017.00,NULL,'snad y pintura',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(78,'0015','2017-06-30',NULL,'2017-08-10',72577.11,1306388.00,NULL,NULL,NULL,'Fabricacion y montaje de aislamientos varios',NULL,NULL,'No se precisa ninguna autorización adicional',NULL,NULL,6,2,4,24,3,5,NULL,13,0,0,0,'1 mes','2017-02-27',NULL,21.00,15241.19,NULL,3,NULL,'Tamoin ',1,18.00,'2017-02-27',2017.00,NULL,'Aislamiento Empalme 2',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(79,'0015','2017-06-30',NULL,'2017-06-30',41066.67,739200.00,NULL,NULL,NULL,'Pintura algunos sistemas Empalme 2',NULL,NULL,'No se precisa ninguna autorización adicional',NULL,'Roberto Redondo',6,2,4,3,3,5,NULL,13,0,0,0,'5 meses','2017-02-15',NULL,21.00,8624.00,NULL,3,NULL,'Tamoin',1,18.00,'2017-02-15',2017.00,NULL,'Pintura empalme 2 tamoin',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(80,'3','2017-07-04',NULL,'2017-07-04',159672.00,NULL,NULL,100000.00,NULL,'Servicios de gestión y administración Almacén Begasa','SHORT LIST - PERDIDA POR PRECIO',NULL,'Debe solicitar autorización por correo electrónico',NULL,'ANTONIO ANDRÉS',2,2,6,10,1,5,NULL,4,0,0,0,'3 AÑOS','2017-02-20',NULL,15.00,23950.80,1,1,NULL,'VIESGO',1,NULL,NULL,0.00,NULL,'BEGASA',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(81,'5','2017-07-04',NULL,'2017-07-04',157000.00,NULL,NULL,38000.00,NULL,'gestión y administración de almacén VIESCO','SHORT LIST- PERDIDA POR PRECIO',NULL,'Debe solicitar autorización por correo electrónico',NULL,'ANTONIO ANDRES',2,2,6,10,1,5,NULL,4,0,0,0,'3 AÑOS','2017-02-20',NULL,15.00,23550.00,1,1,NULL,'VIESCO',1,NULL,NULL,0.00,NULL,'VIESCO',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(83,'170005','2017-07-05',NULL,'2017-07-05',882924.25,1000000.00,NULL,NULL,NULL,'Pedido Abierto para Servicio de logística de plantas de respaldo y construcción de infraestructuras electromecánicas y civiles para provisión de servicios,','Precio por administración. Se trata de un servicio por pedido abierto; 1 mill $ anuales. No hay una oferta física presentada. Tenemos el contrato (por firmar) y nos han enviado los precios unitarios por hora.',NULL,'N/A',NULL,'Ingeniero Bouche',7,2,7,NULL,4,4,NULL,14,0,0,0,'12 meses','2017-07-05',NULL,50.00,NULL,1,2,'-','GNF-PANAMA',0,1.13,'2017-07-05',0.00,NULL,'GRUPO ELECTRÓGENO',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(84,'4220-0030-17','2017-07-14',NULL,'2017-07-14',799546.13,NULL,NULL,NULL,NULL,'SERVICIO TÉCNICO DE CLASIFICACIÓN Y CONTROL De MATERIALES PARA EL PDC DE CNJC','Oferta con subrogación de personal (3 operarios de Marsein).\nJurídico revisa con Marceliano el cálculo del pasivo laboral para incluirlo en la oferta.\nSe realiza en UTE con MONCOBRA con las mismas condiciones que los proyectos anteriores.\nEl Ppto máximo de licitación es de 801.078 € (MONLAIN oferta un -0,19%).\nEl adjudicatario actual del servicio es Marsein. Para esta licitación han dividido el servicio en 2 lotes. Lote 1 y Lote 2. Nos presentamos sólo al lote 2 porque no cumplimos el perfil técnico del personal que solicitan para el lote 1 (muy específico del personal actual), además el lote 1 actúa de supervisión del lote 2 y por eso creemos que quieren diferenciarlos, y tener diferentes proveedores.\n',NULL,'Debe rellenar el documento \'Bid no Bid\' (BNB). Vea la ayuda',NULL,'Marceliano Curiel',2,2,1,1,1,2,NULL,3,6,0,0,'28 MESES','2017-07-12','UTE con MONCOBRA al 50%',17.80,142319.21,1,NULL,NULL,'ENRESA',0,NULL,NULL,4220.00,NULL,'ZORITA-GESTIÓN MATERIALES ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(85,'17502','2017-07-14',NULL,'2017-07-14',14922.24,NULL,NULL,NULL,NULL,'SERVICIOS PARA LA LIMPIEZA INTERIOR DE LOS TUBOS DE UN INTERCAMBIADOR DE CALOR TIPO 20-EA-01B','Inicialmente se oferta por 15.384 € (12.600 por la limpieza y 2.784 € por transporte, carga y descarga). Finalmente se ofrece un descuento del 4% quedando la oferta en 14.922 €.',NULL,'No se precisa ninguna autorización adicional','4500084325',NULL,2,2,5,13,1,4,NULL,2,0,0,0,'1 SEMANA','2017-06-20',NULL,15.00,2238.34,1,NULL,NULL,'RIPSA',0,NULL,NULL,0.00,NULL,'INTERCAMBIADORES RIPSA',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(86,'170005','2017-07-20',NULL,'2017-07-20',6000.00,NULL,NULL,NULL,NULL,'SERVICIOS DE PROTECCIÓN RADIOLÓGICA EN CICLOTRON EN SAN SEBASTIÁN','EN LA OFERTA SE CONTEMPLA LA MODIFICACIÓN DE LA DOCUMENTACION TÉCNICA. PRECIO POR MODIFICACIÓN 2.000. NO INCLUIDOS EN EL IMPORTE.',NULL,'No se precisa ninguna autorización adicional',NULL,'JAVIER RIVERO',2,2,10,6,1,2,3,30,0,0,1,'12','2017-07-20',NULL,10.00,600.00,NULL,NULL,NULL,'CIC BiomaGUNE',1,NULL,NULL,NULL,NULL,'CIC BiomaGUNE',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(87,'0072','2017-07-20',NULL,'2017-07-20',11000.00,NULL,NULL,NULL,NULL,'CURSO DE FORMACIÓN DE CAPACITACIÓN DE OPERADORES DE INSTALACIONES RADIACTIVAS en el campo específico de “RADIOGRAFÍA INDUSTRIAL LIMITADA A RAYOS X.','DURACIÓN CURSO 1 SEMANA',NULL,'No se precisa ninguna autorización adicional',NULL,'VICENT GUARDIA',2,2,10,NULL,1,2,NULL,30,0,0,0,'1','2017-07-13',NULL,10.00,1100.00,NULL,NULL,NULL,'GUARDIA CIVIL',0,NULL,NULL,NULL,NULL,'GUARDIA CIVIL',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(88,'01','2017-07-26',NULL,'2017-07-26',87747.00,NULL,NULL,NULL,NULL,'Desarrollo y construcción de un equipo para el rescate de objetos del interior de las piscinas de contención de las Centrales Nucleares','El equipo empezó a desarrollarse en Julio 2016. El cliente abrió la licitación con carácter retroactivo respecto a la fecha de aprobación del consejo de administración de T4S. El periodo indicado (10 meses) corresponde al plazo de desarrollo que se acordó en el consejo de administración.',NULL,'No se precisa ninguna autorización adicional','4503978307',NULL,12,2,2,12,1,4,NULL,33,3,0,0,'10 MESES','2017-07-07',NULL,NULL,NULL,NULL,1,'747966','IBERDROLA GENERACION NUCLEAR S.A.U.',4,NULL,NULL,0.00,NULL,'RESHAND',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(89,'02','2017-07-26',NULL,'2017-08-16',7777.00,NULL,NULL,NULL,NULL,'Ampliación de la funcionalidad del sistema FILTRABRIS, con un sistema de aspiración localizada ',NULL,NULL,'No se precisa ninguna autorización adicional','4503999294',NULL,12,2,2,12,1,4,NULL,33,3,0,0,NULL,'2017-07-21',NULL,NULL,NULL,NULL,1,NULL,'IBERDROLA GENERACION NUCLEAR S.A.U.',3,NULL,NULL,0.00,NULL,'ASPIRACIÓN FILTRABRIS',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(90,'03','2017-07-26',NULL,'2017-07-26',98485.20,NULL,NULL,NULL,NULL,'Desarrollo y construcción de un sistema de aspirado y filtrado para el análisis de debris en centrales nucleares',NULL,NULL,'No se precisa ninguna autorización adicional','4503813016',NULL,12,2,2,12,1,4,NULL,33,3,0,0,'10 MESES','2016-08-30',NULL,NULL,NULL,NULL,1,'738811','IBERDROLA GENERACION NUCLEAR S.A.U.',1,NULL,NULL,0.00,NULL,'FILTRABRIS',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(91,'02','2017-07-26',NULL,'2017-07-26',26858.00,NULL,NULL,NULL,NULL,'Servicios adicionales relativos al Sistema de monitorización en continuo del OffGas: cambios en los modos de toma de muestras, suministro de equipos para deshumidificación y retención de condensados y suministro de repuestos mínimos',NULL,NULL,'No se precisa ninguna autorización adicional',NULL,NULL,12,2,2,18,1,4,NULL,33,3,0,0,'3 MESES','2016-08-09',NULL,NULL,NULL,NULL,1,NULL,'IBERDROLA GENERACION NUCLEAR S.A.U.',1,NULL,NULL,0.00,NULL,'OFF GAS_AMPLIACIÓN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(92,'01','2017-07-26',NULL,'2017-08-03',5520.00,NULL,NULL,NULL,NULL,'MODELO DE MARGEN DE SUBCRITICIDAD EN ARRANQUES Y CARGA DE COMBUSTIBLE',NULL,NULL,'No se precisa ninguna autorización adicional','4503996232',NULL,11,2,2,18,1,4,NULL,33,3,0,0,'2 MESES','2017-07-21',NULL,NULL,NULL,NULL,1,NULL,'IBERDROLA GENERACION NUCLEAR S.A.U.',2,NULL,NULL,0.00,NULL,'MODELO SUBCRITICIDAD',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(93,'05','2017-07-26',NULL,'2017-07-26',12133.00,NULL,NULL,NULL,NULL,'Servicio de Medida de Tiempo de Respuesta de Transmisores de Presión y Presión Diferencial en la Central Nuclear de  Cofrentes durante el año 2017',NULL,NULL,'No se precisa ninguna autorización adicional','4503749981',NULL,11,2,2,18,1,4,NULL,33,3,0,0,'2 MESES','2016-11-18',NULL,NULL,NULL,NULL,1,'735295','IBERDROLA GENERACION NUCLEAR S.A.U.',0,NULL,NULL,0.00,NULL,'TIEMPO RESPUESTA 2017',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(94,'04','2017-07-26',NULL,'2017-07-26',28421.00,NULL,NULL,NULL,NULL,'Aprovisionamiento de repuestos y supervisión de la reparación de la máquina de medida de canales de combustible de C.N. Cofrentes.',NULL,NULL,'No se precisa ninguna autorización adicional','4503705026',NULL,11,2,2,NULL,1,4,NULL,33,3,0,0,NULL,'2016-09-02',NULL,NULL,NULL,NULL,1,NULL,'IBERDROLA GENERACION NUCLEAR S.A.U.',0,NULL,NULL,0.00,NULL,'MAQUINA BOW',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(95,'02','2017-07-26',NULL,'2017-07-26',8704.00,NULL,NULL,NULL,NULL,'Desarrollo de nuevas funcionalidades de la máquina de SIPPING para la inspección de la integridad del combustible nuclear durante el año 2016.',NULL,NULL,'No se precisa ninguna autorización adicional','4503545765',NULL,11,2,2,18,1,4,NULL,33,3,0,0,NULL,'2016-04-25',NULL,NULL,NULL,NULL,1,'N/A','IBERDROLA GENERACION NUCLEAR S.A.U.',1,NULL,NULL,0.00,NULL,'SIPPING ABRIL 16',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(96,'04','2017-07-26',NULL,'2017-07-26',4030.00,NULL,NULL,NULL,NULL,'Apoyo al departamento de Ingeniería del Reactor de CN Cofrentes para procedimiento de medida  de canales de combustible durante la 20ª Recarga de la C.N. Cofrentes  ',NULL,NULL,'No se precisa ninguna autorización adicional','4503341098',NULL,11,2,2,18,1,4,NULL,33,3,0,0,NULL,'2015-09-29',NULL,NULL,NULL,NULL,1,NULL,'IBERDROLA GENERACION NUCLEAR S.A.U.',0,NULL,NULL,0.00,NULL,'MAQUINA BOW 2015',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(97,'03','2017-07-26',NULL,'2017-07-26',5984.00,NULL,NULL,NULL,NULL,'Apoyo al departamento de Ingeniería del Reactor de CN Cofrentes en la ejecución del procedimiento SIPPING para la inspección de la integridad del combustible nuclear ',NULL,NULL,'No se precisa ninguna autorización adicional','4503177597',NULL,11,2,2,18,1,4,NULL,33,3,0,0,NULL,'2015-04-24',NULL,NULL,NULL,NULL,1,NULL,'IBERDROLA GENERACION NUCLEAR S.A.U.',0,NULL,NULL,0.00,NULL,'SIPPING 2015',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(98,'0069','2017-07-26',NULL,'2017-10-20',14750.00,NULL,NULL,NULL,NULL,'PREPARACIÓN, COORDINACIÓN E IMPARTICIÓN DE CURSO DE FORMACIÓN EN EMERGENCIAS RADIOLÓGICAS','CURSO PARA CSN CON UNA DURACIÓN DE UNA SEMANA IMPARTIDO POR DOS PERSONAS',NULL,'No se precisa ninguna autorización adicional',NULL,'VICENTE GUARDIA',2,2,10,NULL,1,4,NULL,30,0,0,0,'1','2017-06-30',NULL,10.00,1475.00,NULL,NULL,NULL,'CONSEJO SEGURIDAD NUCLEAR',1,NULL,NULL,0.00,NULL,'CSN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(99,'170503','2017-08-02',NULL,'2017-08-02',33500.00,33500.00,NULL,0.00,NULL,'Limpieza de torre de refrigeracion y condensador en Central Termosolar Majadas',NULL,NULL,'No se precisa ninguna autorización adicional',NULL,NULL,2,2,5,15,1,2,NULL,7,18,0,0,NULL,'2017-08-04',NULL,20.00,6700.00,NULL,1,'2100423830','acciona',0,1.00,'2017-08-02',0.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(100,'1','2017-08-07',NULL,'2017-08-07',29500.00,NULL,NULL,0.00,NULL,'proyecto de consultoría para la optimización de los almacenes de palos y huelva',NULL,NULL,'No se precisa ninguna autorización adicional',NULL,NULL,2,2,6,10,1,4,NULL,4,18,0,0,'2 MESES','2017-01-17','Axis Corporate como subcontratado al 75%.',15.00,4425.00,NULL,1,NULL,'CEPSA',0,NULL,NULL,0.00,NULL,'CEPSA CONSULTORÍA',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(101,'17/122','2017-09-18',NULL,'2017-11-20',1000000.00,NULL,NULL,NULL,NULL,'Reprise et conditionnement de 978 fûts \"Déchets Historiques Amiante\" de l\'installation UP1-CEA Marcoule\nGroupement avec SOCODEI + DFD\nBudget total estimé du client est de 2-3 M€',NULL,NULL,'No se precisa ninguna autorización adicional',NULL,'André MARTINEZ',3,2,1,1,2,3,3,32,18,0,1,NULL,'2017-10-05',NULL,NULL,NULL,NULL,1,NULL,'CEA Marcoule',5,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(102,'17/123','2017-09-18',NULL,'2017-11-24',1400000.00,NULL,NULL,NULL,NULL,'PRESTATION D\'EXPERTISES RADIOLOGIQUES ET D\'ASSISTANCE EN RADIOPROTECTION\nContrat 48 mois \nBudget estimé de 350000 €/an ','Appel à candidature. Phase de candidature (pas CDC)',NULL,'No se precisa ninguna autorización adicional',NULL,'André MARTINEZ',3,2,5,21,2,5,NULL,32,18,1,0,NULL,'2017-09-15',NULL,NULL,NULL,1,1,NULL,'ANDRA',6,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(103,'17/124','2017-09-18',NULL,'2017-09-18',1.00,NULL,NULL,NULL,NULL,'Prise en charge, reconditionnement et évacuation vers le CIRES des déchets TFA de l\'INB37 du CEA Cadarache','Suite à la visite obligatoire et des réunions, SOCODEI ne souhaite pas se positionner sur ce marché. Nous ne disposons pas d\'ICPE pour conditionner ces déchets donc nous ne pouvons pas nous positionner.',NULL,'No se precisa ninguna autorización adicional',NULL,'André MARTINEZ',3,2,1,1,2,3,NULL,32,18,0,0,NULL,'2017-09-29',NULL,NULL,NULL,NULL,NULL,NULL,'CEA Cadarache',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(104,'17/125','2017-09-18',NULL,'2017-09-18',150000.00,NULL,NULL,NULL,NULL,'Chantier pilote (1mois) de découpe de béton proposée par le client aux entreprises qualifiées CAEAR D3.3.\nGroupement avec Westinhouse \nRemmuneration forfaitaire de 150K€','Arrêté par le client CEA',NULL,'No se precisa ninguna autorización adicional',NULL,'André MARTINEZ',3,2,1,8,2,1,NULL,32,18,0,0,NULL,'2017-11-01',NULL,NULL,NULL,NULL,1,NULL,'CEA Fontenay aux Roses',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(105,'17/126','2017-09-18',NULL,'2017-09-18',1900000.00,NULL,NULL,NULL,NULL,'Développement d\'un robot d\'application de \"résine d\'étanchéité\"  et rachat d\'une licence d\'exploitation avec des conditions préférentielles.\nBudget de 1,9M€\nRencontre en octobre',NULL,NULL,'No se precisa ninguna autorización adicional',NULL,'André MARTINEZ',3,2,2,22,2,1,NULL,32,18,1,0,NULL,'2017-10-11',NULL,NULL,NULL,NULL,1,NULL,'EDF Lab',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(106,'17/127','2017-09-18',NULL,'2017-09-18',5000000.00,NULL,NULL,NULL,NULL,'Démantèlement de l\'installation AMI (Atelier des Matériaux Irradiés) en Chinon.\nRencontre avec EDF le 20 mars 2017. Prévu recevoir l\'AO à la fin de l\'année. \nBudget de 215M€',NULL,NULL,'No se precisa ninguna autorización adicional',NULL,NULL,3,2,1,8,2,1,NULL,32,18,1,0,NULL,'2017-12-31',NULL,NULL,NULL,NULL,1,NULL,'EDF ',3,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(107,'170006','2017-09-19',NULL,'2017-11-08',740.00,NULL,NULL,NULL,NULL,'REVISION EQUIPO RAYOS X',NULL,NULL,'No se precisa ninguna autorización adicional',NULL,'ISIDRO PÉREZ',2,2,10,6,1,4,NULL,30,0,0,0,'12','2017-09-19',NULL,15.00,111.00,NULL,NULL,'211410','CENTRAL NUCLEAR ALMARAZ',1,NULL,NULL,0.00,NULL,'CNA',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(108,'170007','2017-09-26',NULL,'2017-11-22',150360.00,NULL,NULL,NULL,NULL,'PRESTACIÓN DE SERVICIOS DE UNA UNIDAD TÉCNICA DE PROTECCIOÓN RADIOLÓGICA, PARA LAS INSTALACIONES RADIACTIVAS Y DE\nRADIODIAGNÓSTICO CON DESTINO AL DEPARTAMENTO DE ADUANAS E II.EE.\n',NULL,NULL,'Debe solicitar autorización por correo electrónico',NULL,'VICENTE GUARDIA',2,2,10,6,1,4,NULL,30,0,0,0,'48','2017-09-27',NULL,5.00,7518.00,NULL,NULL,'17710055200/2017 ','AGENCIA TRIBUTARIA',1,NULL,NULL,NULL,NULL,'AGENCIA TRIBUTARIA',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(109,'14','2017-10-26',NULL,'2017-10-26',3166.00,NULL,NULL,NULL,NULL,'Ampliación Alcance Servicio de Prevención y Control de Legionelosis (CAGE)',NULL,NULL,'No se precisa ninguna autorización adicional','SN16MA40263PB',NULL,2,2,5,34,1,4,1,24,1,0,0,NULL,'2017-07-14',NULL,NULL,NULL,1,1,NULL,'CNAT',3,NULL,NULL,170114.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(110,'170001','2017-10-31',NULL,'2017-10-31',14150.00,283000.00,NULL,NULL,NULL,'Propuesta de anteproyecto. Consultoría para el outsourcing de las actividades logísticas de CFE en Bajío','Pendiente de presupuesto',NULL,'No se precisa ninguna autorización adicional',NULL,NULL,6,2,6,10,3,2,3,4,0,0,0,'1 MES','2017-03-16',NULL,100.00,14150.00,1,3,'-','CFE ',0,20.00,'2017-04-01',0.00,NULL,'CFE MEXICO',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(111,'17007','2017-10-31',NULL,'2017-10-31',453188.40,9063768.00,NULL,NULL,NULL,'Ajuste de tarifas de la operación actual','Validado técnicamente. Pendiente de aprobación por compras',NULL,'No se precisa ninguna autorización. Es un ajuste de precios',NULL,NULL,6,2,6,10,3,1,NULL,4,0,0,0,'24 MESES','2017-03-27',NULL,100.00,453188.40,1,3,NULL,'GNF MEXICO',1,20.00,'2017-03-27',0.00,NULL,'GNF MEXICO-AJUSTE TARIFAS',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(112,'170012','2017-10-31',NULL,'2017-10-31',20000.00,NULL,NULL,NULL,NULL,'Proyecto de I+D+i. Adjudicación de unos 20.000 eur que se dedicarán a pagar el recurso que participe en el proyecto','Pendiente de adjudicación',NULL,'No se precisa ninguna autorización adicional',NULL,NULL,2,2,6,NULL,1,1,NULL,4,0,0,0,'12 MESES','2017-05-29',NULL,0.00,0.00,1,NULL,NULL,'GENERALITAT VALENCIANA',0,NULL,NULL,0.00,NULL,'PROYECTO I+D FM',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(113,'170013','2017-10-31',NULL,'2017-10-31',0.00,NULL,NULL,NULL,NULL,'Inicialmente era adjudicación directa pero finalmente será licitación. Pendiente de recibir licitación. Pudiera ser que saliera con la licitación de la renovación del resto de almacenes','Pendiente de recibir licitación',NULL,'Faltan datos para determinar la autorización necesaria',NULL,NULL,6,2,6,NULL,3,1,NULL,4,0,1,0,NULL,'2017-04-30',NULL,NULL,NULL,1,NULL,NULL,'GNF MEXICO',0,NULL,NULL,NULL,NULL,'GNF MÉXICO - Almacén 4 Sonora',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(114,'170014','2017-10-31',NULL,'2017-10-31',0.00,NULL,NULL,NULL,NULL,'Existe una necesidad y se está trabajando dos proyectos para Stanhome en México','Pendiente de Recibir licitación',NULL,'Faltan datos para determinar la autorización necesaria',NULL,NULL,6,2,6,10,3,1,NULL,4,0,1,0,NULL,'2017-04-30',NULL,NULL,NULL,1,NULL,NULL,'STANHOME',0,NULL,NULL,NULL,NULL,'STANHOME ALMACENAMIENTO',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(115,'170015','2017-10-31',NULL,'2017-10-31',0.00,NULL,NULL,NULL,NULL,'STANHOME ABASTECIMIENTO DIRECTO','Existe una necesidad y se está trabajando dos proyectos para Stanhome en México',NULL,'Faltan datos para determinar la autorización necesaria',NULL,NULL,6,2,6,10,3,1,NULL,4,0,1,0,NULL,'2017-04-30',NULL,NULL,NULL,1,NULL,NULL,'STANHOME ',0,NULL,NULL,NULL,NULL,'STANHOME ABASTECIMIENTO DIRECTO',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(116,'170015','2017-10-31',NULL,'2017-10-31',0.00,NULL,NULL,NULL,NULL,'Oportunidad para hacer manipulados o maquilas para tupperwere. Pendiente ','Hunting. En fase de análisis. No hay licitación',NULL,'Faltan datos para determinar la autorización necesaria',NULL,NULL,2,2,6,10,1,1,NULL,4,0,1,0,NULL,'2017-04-30',NULL,NULL,NULL,1,NULL,NULL,'TUPPERWARE',0,NULL,NULL,NULL,NULL,'TUPPERWARE',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(117,'17017','2017-10-31',NULL,'2017-10-31',15500000.00,NULL,NULL,2600000.00,3.00,'Proyecto para la renovación actual del movimiento de chatarra y para la gestión de movimientos de materiales en el puerto',NULL,NULL,'Debe rellenar el documento \'Proposal report\' (PPR). Vea la ayuda',NULL,NULL,2,2,6,10,1,2,2,4,12,0,1,'5 AÑOS','2017-09-12',NULL,15.00,2325000.00,1,NULL,NULL,'ACERINOX',1,NULL,NULL,NULL,NULL,'ACERINOX CHATARRA+PUERTO',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(118,'170017','2017-10-31',NULL,'2017-10-31',63400.00,NULL,NULL,NULL,NULL,'Suministro y montaje de estanterías',NULL,NULL,'No se precisa ninguna autorización adicional',NULL,NULL,2,2,6,NULL,1,4,NULL,4,10,0,0,'3 MESES','2017-03-30',NULL,NULL,NULL,1,NULL,NULL,'REPSOL',2,NULL,NULL,NULL,NULL,'REPSOL CORUÑA ESTANTERÍAS',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(119,'170018','2017-10-31',NULL,'2017-10-31',0.00,NULL,NULL,NULL,NULL,'Servicio de gestión del almacén y de paño de la planta de Ensa (6-7 personas)','Pendiente de Recibir',NULL,'Faltan datos para determinar la autorización necesaria',NULL,NULL,2,2,6,10,1,1,NULL,4,0,0,0,NULL,'2017-04-30',NULL,NULL,NULL,1,NULL,NULL,'ENSA',0,NULL,NULL,NULL,NULL,'ALMACEN ENSA',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(120,'17003','2017-10-31',NULL,'2017-10-31',1160000.00,NULL,NULL,NULL,NULL,'Terminando el proyecto de consultoría. Va a salir la licitación para el outsourcing de servicios logísticos de Palos y Huelva',NULL,NULL,'Debe rellenar el documento \'Proposal report\' (PPR). Vea la ayuda',NULL,NULL,2,2,6,NULL,1,1,NULL,4,0,0,0,'5 AÑOS','2017-10-01',NULL,5.00,58000.00,1,NULL,NULL,'CEPSA',0,NULL,NULL,NULL,NULL,'CEPSA PALOS Y HUELVA',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(123,'170006','2017-10-31',NULL,'2017-10-31',45000.00,NULL,NULL,NULL,NULL,'Elaboración de guías operativas para Panamá y México',NULL,NULL,'No se precisa ninguna autorización adicional',NULL,NULL,2,2,6,NULL,1,5,NULL,4,0,0,0,NULL,'2017-02-10',NULL,20.00,9000.00,1,NULL,NULL,'GNF',0,NULL,NULL,NULL,NULL,'GNF GUÍAS OPERATIVAS',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(124,'170009','2017-10-31',NULL,'2017-10-31',202000.00,NULL,NULL,NULL,NULL,'Gestión del catalizador durante la parada general.','Perdido por precio',NULL,'Debe solicitar autorización por correo electrónico',NULL,NULL,2,2,6,NULL,1,5,NULL,4,11,0,0,'2 MESES','2017-03-27',NULL,25.00,50500.00,1,NULL,NULL,'REPSOL',0,NULL,NULL,NULL,NULL,'REPSOL CARTAGENA CATALIZADOR',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(125,'170010','2017-10-31',NULL,'2017-10-31',1088346.00,NULL,NULL,NULL,NULL,'Renovación del contrato de servicio de laboratorio de Repsol cartagena',NULL,NULL,'Debe rellenar el documento \'Proposal report\' (PPR). Vea la ayuda',NULL,NULL,2,2,6,NULL,1,5,NULL,4,11,0,0,'3 AÑOS','2017-04-18',NULL,10.00,108834.60,1,NULL,NULL,'REPSOL',0,NULL,NULL,NULL,NULL,'REPSOL CARTAGENA LABORATORIO',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(126,'170011','2017-10-31',NULL,'2017-10-31',76078.00,NULL,NULL,NULL,NULL,'Limpieza de las aceras con agua. Riego','Perdida por precio',NULL,'No se precisa ninguna autorización adicional',NULL,NULL,2,2,6,NULL,1,5,NULL,4,12,0,1,'1 AÑO','2017-03-24',NULL,15.00,11411.70,1,NULL,NULL,'ACERINOX',1,NULL,NULL,NULL,NULL,'ACERINOX RIEGO CALLES',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(127,'170019','2017-10-31',NULL,'2017-12-28',0.00,NULL,NULL,NULL,NULL,'Proyecto de outsourcing logístico de las Centrales Nucleares de Almaraz y Trillo',NULL,NULL,'Faltan datos para determinar la autorización necesaria',NULL,NULL,2,2,6,NULL,1,5,NULL,4,0,0,0,'4 AÑOS','2017-10-31',NULL,NULL,NULL,1,NULL,NULL,'CNAT',1,NULL,NULL,NULL,NULL,'CNAT SERVICIO DE ALMACÉN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(128,'4220/0038','2017-10-31',NULL,'2017-10-31',1400000.00,NULL,NULL,NULL,NULL,'TRABAJOS DE RETIRADA DE ELEMENTOS ESTRUCTURALES Y EMBEBIDOS CONTAMINADOS RADIOLÓGICAMENTE EN EL EDIFICIO DE CONTENCIÓN DE CNJC ','UTE con MONCOBRA',NULL,'Debe rellenar el documento \'Proposal report\' (PPR). Vea la ayuda',NULL,NULL,2,2,1,8,1,4,NULL,3,6,0,0,'2017-2018','2017-09-12',NULL,5.00,70000.00,1,NULL,'060-CO-TA-2017-0002','ENRESA',0,NULL,NULL,NULL,NULL,'TUBERÍAS ENTERRADAS CNJC',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(129,'0','2017-10-31',NULL,'2017-10-31',48216.00,NULL,NULL,NULL,NULL,'Ampliación.Servicio de rehabilitación radiológica en Instalaciones nucleares y Radiológicas del CIEMAT',NULL,NULL,'No precisa autorización',NULL,NULL,2,2,1,NULL,1,1,NULL,3,9,0,0,'2 MESES','2017-10-27',NULL,15.00,7232.40,1,NULL,NULL,'CIEMAT',1,NULL,NULL,NULL,NULL,'DMT CIEMAT',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(130,'0','2017-10-31',NULL,'2017-10-31',331657.00,NULL,NULL,NULL,NULL,'Servicio de rehabilitación radiológica en Instalaciones nueclears y Radiológicas del CIEMAT',NULL,NULL,'Debe rellenar el documento \'Bid no Bid\' (BNB). Vea la ayuda',NULL,NULL,2,2,1,8,1,1,NULL,3,9,0,0,'1 AÑO','2017-11-03',NULL,15.00,49748.55,1,NULL,NULL,'CIEMAT',0,NULL,NULL,NULL,NULL,'REHABILITACIÓN CIEMAT',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(131,'15','2017-10-31',NULL,'2017-11-10',16408.00,NULL,NULL,NULL,NULL,'Servicio de limpieza para los trabajos de MM en housings de ventilación en los edificios de combustible VA1-MS-19B y VA2-MS-19A/B',NULL,NULL,'No se precisa ninguna autorización adicional','SN17RA45381PA',NULL,2,2,5,7,1,4,1,24,1,0,0,'16/10/2017 al 16/01/2018','2017-10-13',NULL,NULL,NULL,1,1,'212015','CNAT',3,NULL,NULL,170115.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(132,'16','2017-10-31',NULL,'2017-11-29',16283.00,NULL,NULL,NULL,NULL,'Servicio de limpieza para trabajos programados de sustitución de tuberías SW1-TSP afectadas por MIC en 1DG y 3DG',NULL,NULL,'No se precisa ninguna autorización adicional','US17RA45370PB',NULL,2,2,5,13,1,4,1,24,1,0,0,'01/10/17 al 30/11/17','2017-10-13',NULL,NULL,NULL,1,1,'212011','CNAT',2,NULL,NULL,170116.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(133,'17','2017-10-31',NULL,'2017-11-10',9746.00,NULL,NULL,NULL,NULL,'Limpieza de almacenes exteriores, especialmente el E-5 con mucha presencia de residuos de palomas, impregnando producto para evitar presencia de arañas',NULL,NULL,'No se precisa ninguna autorización adicional','SN17TA45451PB',NULL,2,2,5,13,1,4,1,24,1,0,0,'01/11/17 al 31/12/17','2017-10-26',NULL,NULL,NULL,1,1,'212114','CNAT',2,NULL,NULL,170117.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(134,'20','2017-11-16',NULL,'2017-11-29',8954.00,NULL,NULL,NULL,NULL,'Realización de trabajos de limpieza durante la ejecución de MD ATI (1/2-MDP-03322) en Zona Controlada durante el año 2017. ',NULL,NULL,'No se precisa ninguna autorización adicional','US17RA45694PB',NULL,2,2,5,7,1,4,1,24,1,0,0,'2017','2017-11-14',NULL,NULL,NULL,1,1,'212344','CNAT',2,NULL,NULL,170120.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(135,'19','2017-11-16',NULL,'2017-11-16',14000.00,NULL,NULL,NULL,NULL,'Preparación y sellado final de bidones de la planta de secado e inmovilización de bidones de hierros, año 2018, en Central Nuclear de Almaraz.','Se facturará en función del número de bidones realizados. Se estiman las siguientes cantidades\n- Pre hormigonado de bidones: 60 unidades a 153.37 €/unidad\n- Sellado de bidones: 48 unidades a 39.15 €/unidad\n- Inmovilización de bidones de hierros: 40-45 bidones anuales a 75.45 €/unidad',NULL,'No se precisa ninguna autorización adicional',NULL,NULL,2,2,5,11,1,2,1,24,1,0,0,'2018','2017-11-16',NULL,NULL,NULL,1,1,'211906','CNAT',2,NULL,NULL,170119.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(136,'17/121','2017-11-20',NULL,'2017-11-20',133065.00,NULL,NULL,NULL,NULL,'DEMANTELEMENT DE LA BACHE VAPEUR 242.01 ET REMPLACEMENT PAR UN POT DE RECUPERATION DES CONDENSATS',NULL,NULL,'No se precisa ninguna autorización adicional',NULL,'André MARTINEZ',3,2,1,8,2,2,3,32,18,0,1,'Avant sept2018','2017-11-13',NULL,NULL,NULL,NULL,1,NULL,'CEA Marcoule',4,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(137,'17/129','2017-11-22',NULL,'2017-11-22',20110249.00,NULL,NULL,NULL,NULL,'Codigo GDES C-RAO-DSN&CND-PC-101422-RA\nNPGV-TEFF 900-1300MWe 2020-2026\n','Pour 4 interventions pour la partie FERME\n',NULL,'Debe rellenar el documento \'Proposal report\' (PPR). Vea la ayuda',NULL,'Patrice GUERRA',3,2,5,14,2,2,2,32,18,0,0,'2020-2026','2017-11-08',NULL,NULL,NULL,1,1,'C4557C0160','EDF-DIPDE',2,NULL,NULL,0.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(138,'3','2017-11-24',NULL,'2017-11-24',25000.00,25000.00,NULL,NULL,NULL,'Budgetary offer for the supply of LD-2 RPV flange nuts cleaning equipment.','El Código GDES de la oferta es: T4S-IDI-170003.R0',NULL,'No se precisa ninguna autorización adicional',NULL,NULL,12,2,2,7,6,2,NULL,33,18,1,0,'2 MESES','2017-11-23',NULL,NULL,NULL,1,1,'NA','Curtiss Wright Nuclear Division',0,1.00,'2017-11-24',0.00,NULL,'LD2_USA',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(139,'170406','2017-11-30',NULL,'2017-11-30',58745.00,NULL,NULL,0.00,NULL,'SECADO SECUNDARIO EN CN VANDELLÓS II','R22 : (25 días de secado): 31.120 €\nR23: (21 días de secado):  27.624 €\n875 €/día',NULL,'No se precisa ninguna autorización',NULL,'ANA URQUIJO',2,2,5,NULL,1,2,2,2,4,0,0,'2018-2019','2017-12-04','N/A',13.50,7930.58,1,NULL,'IBE000180926','ANAV',1,NULL,NULL,0.00,NULL,'SEC SECUNDARIO CNVII',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(140,'170401','2017-12-01',NULL,'2017-12-01',61416.00,NULL,NULL,NULL,NULL,'Biologo Subcontratado  SEGUIMIENTO DE VIDA MARINA  EN TOMA DE MAR','3 años (20.472 €/a)',NULL,'No se precisa ninguna autorización','1400458908',NULL,2,2,5,13,1,4,2,2,4,0,0,'2017-2019-36 meses','2017-01-20','N/A',15.00,9212.40,1,NULL,'IBE000163924','ANAV',0,NULL,NULL,NULL,NULL,'INCRUSTACIONES MARINAS',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(141,'170402','2017-12-01',NULL,'2017-12-01',1050.00,NULL,NULL,NULL,NULL,'IMPARTIR CURSO BÁSICO DE PR A PERSONAL DE NAVEC EN VANDELLÓS','OFERTA + ampliación de alcance',NULL,'No se precisa ninguna autorización','318457',NULL,2,2,5,NULL,1,4,NULL,2,4,0,0,'2017 - 1DIA','2017-05-02','N/A',100.00,1050.00,1,NULL,NULL,'NAVEC',0,NULL,NULL,NULL,NULL,'CURSO DE PR BASICO',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(142,'170403','2017-12-01',NULL,'2017-12-01',557657.00,NULL,NULL,NULL,NULL,'Diseño, suministro e instalaciones de Protecciones Pasivas homologadas de 1 hora de resistencia al fuego en conducciones eléctricas de los PCD\'s V/36192 y V/36193 en C.N. Vandellós II','.R0: 595.500 € (355k€ corresponde al precio medible. El resto es una estimación del precio de las interferencias que, hasta que no se haga la ingeniería de detalle, no se puede saber con exactitud. Los precios están referenciados a precios unitarios. El importe de la oferta está hecho con unas mediciones estimadas por ANAV. Facturación por hitos. 10% a la firma 10% a la entrega de la información técnica.)\n.R1: la aceptada (557.657 €)',NULL,'Se requiere: Bid no Bid(BNB). Autoriza el Dir. de Operaciones. Descargue el formato en AYUDA',NULL,NULL,2,2,5,24,1,4,3,27,4,0,0,'2017-2018-10 meses','2017-04-18',NULL,10.90,60784.61,1,NULL,'1400249807B11','ANAV',1,NULL,NULL,NULL,NULL,'PROTECCIONES PASIVAS VANDELLOS',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(143,'170403','2017-12-01',NULL,'2018-02-21',0.00,NULL,NULL,NULL,NULL,'Servicio de Mantenimiento Anual para el Sellado de Penetraciones en C.N. Ascó','Cancelada.\nSe unifican las dos plantas en una única licitación (oferta ref 180600)',NULL,'N/A',NULL,NULL,2,2,5,24,1,7,3,27,5,0,0,NULL,'2017-09-29',NULL,0.00,0.00,1,NULL,'20170803 B11','ANAV',3,NULL,NULL,NULL,NULL,'SELLADOS ASCO',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(144,'170404','2017-12-01',NULL,'2018-02-21',0.00,NULL,NULL,NULL,NULL,'Servicio de Mantenimiento Anual para el Sellado de Penetraciones en C.N. Vnadellos','Cancelada.\nSe unifican las dos plantas en una única licitación (oferta ref 180600)',NULL,'N/A',NULL,NULL,2,2,5,24,1,7,3,27,4,0,0,NULL,'2017-09-29',NULL,NULL,NULL,1,NULL,'20170803 B11','ANAV',3,NULL,NULL,NULL,NULL,'SELLADOS VANDELLOS',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(145,'170405','2017-12-01',NULL,'2017-12-20',189591.00,NULL,NULL,NULL,NULL,'REPARACION DE SELLADOS EN BARRAS 5 y 6 ASCO I y II','Perdida por precio.\n3 licitantes. Adjudicado al actual contratista de mantenimiento (CHEPRO 30% mas barato). KAEFER bastante mas caro que GDES.',NULL,'Autoriza el Dir. de Área de Negocio (si aplica). Comunicar al Departamento de Apoyo a Ofertas. No requiere registro documental',NULL,NULL,2,2,5,24,1,5,3,27,5,0,0,NULL,'2017-09-29',NULL,20.00,37918.20,1,NULL,'IBE000174108','ANAV',4,NULL,NULL,NULL,NULL,'SELLADO BARRAS ASCO',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(146,'2','2017-12-05',NULL,'2017-12-11',5440.00,5440.00,NULL,NULL,NULL,'Apoyo en la operación de la máquina de medida de canales de combustible de C.N. Cofrentes, Diciembre 2017.',NULL,NULL,'No se precisa ninguna autorización',NULL,NULL,11,2,2,18,1,4,NULL,33,3,0,0,'1 semana','2017-12-05',NULL,NULL,NULL,1,1,'NA','IBERDROLA GENERACION NUCLEAR S.A.U.',2,1.00,'2017-12-05',0.00,NULL,'BOW 2017',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(147,'17/130','2017-12-06',NULL,'2017-12-06',26000.00,NULL,NULL,NULL,NULL,'ESSAIS COMPLEMMENTAIRES OCSTB-EXTRADOS',NULL,NULL,'No se precisa ninguna autorización',NULL,'Patrice GUERRA',3,2,8,3,2,1,1,32,18,0,0,NULL,'2017-12-08',NULL,NULL,NULL,NULL,1,NULL,'EDF-DIPDE',3,NULL,NULL,0.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(150,'21','2017-12-12',NULL,'2018-02-16',18871.00,NULL,NULL,NULL,NULL,'Trabajos de limpieza para la ejecución de la MD “0-MDP-02701\" Anexo 5',NULL,NULL,'No se precisa ninguna autorización','US18RA46609PA',NULL,2,2,5,7,1,4,1,24,1,0,0,'20/11 al 20/12/2017','2017-11-27',NULL,NULL,NULL,1,NULL,'212618','CNAT',2,NULL,NULL,170121.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(151,'221','2017-12-12',NULL,'2017-12-12',20000.00,NULL,NULL,NULL,NULL,'SERVICIO DE M.D. CONTENEDORES DPT EN C.N. TRILLO','Atención telefónica. MANTENEMOS PRECIOS 2015. Precio Aproximado.',NULL,'No se precisa ninguna autorización',NULL,NULL,2,2,5,7,1,4,NULL,35,2,0,0,NULL,'2017-12-12','N/A',NULL,NULL,1,NULL,NULL,'ENSA',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(152,'170220','2017-12-12',NULL,'2017-12-27',329800.00,NULL,NULL,NULL,NULL,'SERVICIO DE TURNO CERRADO DE QUÍMICA Y RADIOQUÍMICA EN CN TRILLO','R0 340.000 € sin incluir la formación ni el retén.\nNos solicitan una revisión, incluyendo a un analista mas (6T) y un retén con actuación en 30 min y 60 min. En la R1 ofertamos una rebaja del precio total del 3% y proponemos un incremento de 41.200 € en caso de que se incluya un analista mas. El coste del retén será de 387 €/semana además de las 2 horas extras de incorporación/desincorporación, los kilómetros desde el domicilio y las horas dedicadas al trabajo. Solo para acuda de 60 min. En una nueva solicitud del días 11/12/17 les comentamos que el personal que les falta (ahora tienen 4T por bajas/salidas) que lo tendremos formado a partir de Febrero del 18 y siempre que CNAT apruebe las formaciones y costes.',NULL,'Se requiere: Bid no Bid(BNB). Autoriza el Dir. de Operaciones. Descargue el formato en AYUDA',NULL,NULL,2,2,5,NULL,1,4,3,35,2,0,0,NULL,'2017-10-27',NULL,10.00,32980.00,1,NULL,'2017-16-QU-CNT.R0','CNAT',2,NULL,NULL,NULL,NULL,'ANALISTAS CNT',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(153,'170219','2017-12-12',NULL,'2017-12-12',18497.00,NULL,NULL,NULL,NULL,'SERVICIO LIMPIEZA Y DESCONTAMINACIÓN DURANTE LA REVISIÓN DEL CAMBIADOR TA11B001',NULL,NULL,'No se precisa ninguna autorización',NULL,NULL,2,2,5,7,1,4,NULL,35,2,0,0,NULL,'2017-12-12',NULL,NULL,NULL,1,NULL,'547903','CNAT',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(154,'170218','2017-12-12',NULL,'2017-12-12',25000.00,NULL,NULL,NULL,NULL,'Limpieza del ATI',NULL,NULL,'No se precisa ninguna autorización',NULL,NULL,2,2,5,7,1,4,NULL,35,2,0,0,NULL,'2017-12-12',NULL,NULL,NULL,1,NULL,NULL,'CNAT',0,NULL,NULL,NULL,NULL,'ATI',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(155,'170217','2017-12-12',NULL,'2017-12-12',9983.00,NULL,NULL,NULL,NULL,'TRABAJOS DE LIMPIEZA Y PROTECCION RADIOLOGICA PARA LA PLANIMETRIA DEL FONDO DE POZO DE COFRES',NULL,NULL,'No se precisa ninguna autorización',NULL,NULL,2,2,5,7,1,4,NULL,35,2,0,0,NULL,'2017-12-12',NULL,NULL,NULL,1,NULL,NULL,'CNAT',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(156,'170215','2017-12-12',NULL,'2017-12-12',23805.00,NULL,NULL,NULL,NULL,'SERVICIOS DE APOYO A LA OPERACIÓN Y MANTENIMIENTO DE LA PLANTA DE LODOS DEL SISTEMA UC-2',NULL,NULL,'No se precisa ninguna autorización',NULL,NULL,2,2,5,11,1,4,NULL,35,2,0,0,NULL,'2017-12-12',NULL,NULL,NULL,1,NULL,NULL,'CNAT',0,NULL,NULL,NULL,NULL,'LODOS UC-2',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(157,'170214','2017-12-12',NULL,'2017-12-12',6000.00,NULL,NULL,NULL,NULL,'SERVICIO DESCONTAMINACIÓN DE ACEITES USADOS MEDIANTE LA APLICACIÓN DEL SISTEMA SDAL',NULL,NULL,'No se precisa ninguna autorización',NULL,NULL,2,2,5,7,1,4,NULL,35,2,0,0,NULL,'2017-12-12',NULL,NULL,NULL,1,NULL,NULL,'CNAT',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(158,'170213','2017-12-12',NULL,'2017-12-12',21973.00,NULL,NULL,NULL,NULL,'LIMPIEZAS DURANTE TRABAJOS DE IMPLANTACION DE LA 4-MDP-02945-xx/01: VENTEO FILTRADO DE LA CONTENCION',NULL,NULL,'No se precisa ninguna autorización',NULL,NULL,2,2,5,7,1,4,NULL,35,2,0,0,NULL,'2017-12-12',NULL,NULL,NULL,1,NULL,NULL,'CNAT',1,NULL,NULL,0.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(165,'170212','2017-12-12',NULL,'2017-12-12',56983.00,NULL,NULL,NULL,NULL,'SERVICIO PARA ACTIVIDADES CON LOS AUXILIARES DE OPERACIÓN EN RECARGA 2017',NULL,NULL,'No se precisa ninguna autorización',NULL,NULL,2,2,5,4,1,4,NULL,35,2,0,0,NULL,'2017-03-15',NULL,NULL,NULL,1,NULL,NULL,'CNAT',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(166,'170211','2017-12-12',NULL,'2017-12-12',753096.00,NULL,NULL,NULL,NULL,'LIMPIEZA Y DESCONTAMINACION EN ZONA CONTROLADA EN RECARGA 2017 (R429)',NULL,NULL,'No precisa Autorización',NULL,NULL,2,2,5,7,1,4,1,35,2,0,0,NULL,'2017-03-15',NULL,NULL,NULL,1,NULL,NULL,'CNAT',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(167,'170210','2017-12-12',NULL,'2017-12-12',68000.00,NULL,NULL,NULL,NULL,'FILTRADO Y DESCONTAMINACIÓN SUBACUATICA DE LA CAVIDAD DEL REACTOR EN RECARGA 2017 (R429)',NULL,NULL,'No se precisa ninguna autorización',NULL,NULL,2,2,5,NULL,1,4,NULL,35,2,0,0,NULL,'2017-12-12',NULL,NULL,NULL,1,NULL,NULL,'CNAT',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(168,'170209','2017-12-12',NULL,'2017-12-12',28000.00,NULL,NULL,NULL,NULL,'LIMPIEZA DE LA BRIDA DE LA VASIJA DE PRESION DEL REACTOR EN RECARGA 2017 (R-429)',NULL,NULL,'No se precisa ninguna autorización',NULL,NULL,2,2,5,7,1,4,NULL,35,2,0,0,NULL,'2017-12-12',NULL,NULL,NULL,1,NULL,NULL,'CNAT',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(169,'170208','2017-12-12',NULL,'2017-12-12',362524.00,NULL,NULL,NULL,NULL,'LIMPIEZAS ESPECIALES EN RECARGA 2017 (R429)',NULL,NULL,'No precisa Autorización',NULL,NULL,2,2,5,13,1,4,1,35,2,0,0,NULL,'2017-12-12',NULL,NULL,NULL,1,NULL,NULL,'CNAT',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(170,'170207','2017-12-12',NULL,'2017-12-12',171536.00,NULL,NULL,NULL,NULL,'LIMPIEZA INDUSTRIAL EN RECARGA2017 (R429)',NULL,NULL,'Autoriza el Dir. de Área de Negocio (si aplica). Comunicar al Departamento de Apoyo a Ofertas. No requiere registro documental',NULL,NULL,2,2,5,NULL,1,4,1,35,2,0,0,NULL,'2017-12-12',NULL,NULL,NULL,1,NULL,NULL,'CNAT',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(171,'170205','2017-12-12',NULL,'2017-12-12',17260.00,NULL,NULL,NULL,NULL,'SERVICIO DE LIMPIEZA Y DESCONTAMINACION DURANTE LA REVISION DEL CAMBIADOR TA 11B001',NULL,NULL,'No se precisa ninguna autorización',NULL,NULL,2,2,5,7,1,4,NULL,35,2,0,0,NULL,'2017-12-12',NULL,NULL,NULL,1,NULL,NULL,'CNAT',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(172,'170204','2017-12-12',NULL,'2017-12-12',13481.00,NULL,NULL,NULL,NULL,'FILTRACIÓN DE ACEITE LUBRICACION DE LA TURBINA EN RECARGA 2017 (R429)',NULL,NULL,'No se precisa ninguna autorización',NULL,NULL,2,2,5,13,1,4,NULL,35,2,0,0,NULL,'2017-12-12',NULL,NULL,NULL,1,NULL,NULL,'CNAT',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(173,'170203','2017-12-12',NULL,'2017-12-12',32000.00,NULL,NULL,NULL,NULL,'CONSERVACION DEL SECUNDARIO EN RECARGA 2016 (R429)',NULL,NULL,'No se precisa ninguna autorización',NULL,NULL,2,2,5,NULL,1,4,1,35,2,0,0,NULL,'2017-12-12',NULL,NULL,NULL,1,NULL,NULL,'CNAT',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(174,'170202','2017-12-12',NULL,'2017-12-12',34987.00,NULL,NULL,NULL,NULL,'SERVICIO DE LIMPIEZA DE COLECTORES Y DECANTADORES DE LODOS DEL SISTEMA UC-2”.',NULL,NULL,'No se precisa ninguna autorización',NULL,NULL,2,2,5,NULL,1,5,NULL,35,2,0,0,NULL,'2017-12-12',NULL,NULL,NULL,1,NULL,'545049','CNAT',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(175,'170201','2017-12-12',NULL,'2017-12-12',69999.00,NULL,NULL,NULL,NULL,'SERVICIO DE LIMPIEZA DURANTE TRABAJOS DE REVISIÓN DE REDUNDANCIAS',NULL,NULL,'No se precisa ninguna autorización',NULL,NULL,2,2,5,13,1,4,NULL,35,2,0,0,NULL,'2017-12-12',NULL,NULL,NULL,1,NULL,'545001','CNAT',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(176,'170200','2017-12-12',NULL,'2017-12-12',3671.00,NULL,NULL,NULL,NULL,'SERVICIOS DE ADECUACION EN UNIDADES ENFRIADORAS DEL UG',NULL,NULL,'No se precisa ninguna autorización',NULL,NULL,2,2,5,13,1,4,NULL,35,2,0,0,NULL,'2016-12-31',NULL,NULL,NULL,1,NULL,'telefonica','COFELLY',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(177,'17/131','2017-12-15',NULL,'2017-12-15',48000.00,NULL,NULL,NULL,NULL,'essais de revêtements renforcés ',NULL,NULL,'No se precisa ninguna autorización',NULL,NULL,3,2,8,NULL,2,1,3,32,18,0,0,NULL,'2017-12-15',NULL,NULL,NULL,NULL,1,NULL,NULL,1,NULL,NULL,0.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(178,'17/132 ','2017-12-19',NULL,'2017-12-19',20000.00,NULL,NULL,NULL,NULL,'CONTRÔLE RADIOLOGIQUE ÉCHAFAUDAGES avec un détecteur UNITECH ','Montant pour une semaine hors DRT',NULL,'No se precisa ninguna autorización',NULL,'Julie TRAINO',3,2,5,21,2,1,NULL,32,18,1,0,NULL,'2018-01-05',NULL,NULL,NULL,NULL,1,NULL,'EDF',2,NULL,NULL,0.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(179,'4','2017-12-19',NULL,'2017-12-19',6897.00,6897.00,NULL,NULL,NULL,'Implantación y pruebas en obra del equipo RESHAND',NULL,NULL,'No se precisa ninguna autorización',NULL,NULL,12,2,2,22,1,2,3,33,3,0,0,'2 semanas','2017-12-20',NULL,NULL,NULL,1,1,'NA','IBERDROLA GENERACION NUCLEAR S.A.U.',1,1.00,'2017-12-20',0.00,NULL,'IMPLANTACIÓN RESHAND',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(180,'5','2017-12-19',NULL,'2017-12-19',6897.00,6897.00,NULL,NULL,NULL,'Implantación y pruebas en obra del sistema FILTRABRIS',NULL,NULL,'No se precisa ninguna autorización',NULL,NULL,12,2,2,22,1,2,NULL,33,3,0,0,'2 SEMANAS','2017-12-20',NULL,NULL,NULL,1,1,'NA','IBERDROLA GENERACION NUCLEAR S.A.U.',0,1.00,'2017-12-19',0.00,NULL,'IMPLANTACIÓN FILTRABRIS',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(181,'1536','2017-12-20',NULL,'2017-12-20',143000.00,NULL,NULL,NULL,NULL,'Metalización de MSR en CN Vandellós II','Pedido realizado como subcontratistas de Enwesa por importe de 143 K€.',NULL,'No se precisa ninguna autorización',NULL,NULL,9,2,8,19,1,4,NULL,8,4,0,0,'2017','2017-06-06',NULL,NULL,NULL,1,NULL,NULL,'ANAV',1,NULL,NULL,NULL,NULL,'METALIZACIÓN VANDELLOS',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(182,'1616','2017-12-20',NULL,'2017-12-20',940828.00,NULL,NULL,NULL,NULL,'Reparación de GRC´s de Hormigón en la CN Vandelos II','precios unitarios: refuerzo estructural : 295 uds x 2.410 €/ud   +   246 uds x x 934 €/ud',NULL,'Se realiza PPR.',NULL,NULL,2,2,8,23,1,4,NULL,8,4,0,0,'2018-2019','2017-10-17',NULL,8.00,75266.24,1,NULL,NULL,'ANAV',0,NULL,NULL,NULL,NULL,'PANELES GRC VANDELLÓS',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(183,'17407','2017-12-20',NULL,'2017-12-20',195000.00,NULL,NULL,NULL,NULL,'Trabajos de sustitución del aislamiento térmico en la turbina principal en la Central Nuclear de Vandellós II','Se presentan 3 opciones, con distintas soluciones de aislamiento, de 150K, 195k y 198K € ',NULL,'Autoriza el Dir. de Área de Negocio (si aplica). Comunicar al Departamento de Apoyo a Ofertas. No requiere registro documental',NULL,NULL,2,2,5,24,1,2,3,27,4,0,0,'2018','2017-12-15',NULL,15.00,NULL,1,NULL,'1000012482','ANAV',3,NULL,NULL,0.00,NULL,'AISLAMIENTO TURBINA AP CNVII',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(184,'170407','2017-12-20',NULL,'2017-12-20',32300.00,NULL,NULL,NULL,NULL,'LIMPIEZA BRIDA VASIJA REACTOR ASCÓ VANDELLOS',NULL,NULL,'No se precisa ninguna autorización',NULL,NULL,2,2,5,13,1,2,NULL,2,4,0,0,NULL,'2017-12-19',NULL,15.00,4845.00,1,NULL,NULL,'WESTINGHOUSE',0,NULL,NULL,NULL,NULL,'LIMPIEZA BRIDA ASCÓ VANDELLOS',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(186,'GDES-NUC/TAM/OF/2017/601-R.0','2018-01-02',NULL,'2018-01-02',1245.60,NULL,NULL,NULL,NULL,'Andamios e identificacion Ocp-5372 (Cub R.3.04)','Sub-proyecto LAI0232-48. (Facturada 100% Junio 2017)',NULL,'No se precisa ninguna autorización','30877','INMACULADA PASTOR',2,2,5,NULL,1,4,NULL,31,3,0,0,NULL,'2017-01-19',NULL,NULL,NULL,1,1,NULL,'TAMOIN',0,NULL,NULL,1.00,NULL,'RAUL SANTIESTABAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(187,'18/001','2018-01-08',NULL,'2018-01-08',500000.00,NULL,NULL,NULL,NULL,'Nettoyage de 2 échangeurs RRA','500 K€-1 M€',NULL,'Se requiere: Proposal Report (PPR). Autoriza el Comité de Ofertas. Descargue el formato en AYUDA',NULL,'Julie TRAINO',3,2,5,7,2,1,3,32,18,0,0,NULL,'2018-01-22',NULL,NULL,NULL,NULL,1,NULL,'EDF Blayais 2',1,NULL,NULL,0.00,NULL,'ÉCHANGEURS BLAYAIS',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(188,'17008','2018-01-09',NULL,'2017-12-04',151338.00,NULL,NULL,NULL,NULL,'SERVICIO PROTECCIÓN RADIOLÓGICA DE LOS EQUIPOS DE RADIODIAGNÓSTICO INSTALADOS EN LOS CENTROS DE ATENCIÓN PRIMERIA, HOSPITAL VILADECANS, HOSPITAL TRIAS Y PUJOL DEL INSTITUTO CATALÁN DE SALUD','POR PRECIO. La ha ganado ACPRO 144.649 €',NULL,'No requieres de Autorización',NULL,'VICENTE GUARDIA',2,2,10,6,1,5,NULL,30,0,0,0,'12','2017-10-06',NULL,10.00,15133.80,NULL,NULL,'CSE/CC00/11666507/18/PA','ICS',1,NULL,NULL,170008.00,NULL,'ICS',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(189,'180001','2018-01-17',NULL,'2018-02-23',111000.00,NULL,NULL,NULL,NULL,'SERVICIO DE UNIDAD TÉCNICA DE PROTECCIÓN RADIOLÓGICA Y SERVICIOS CONEXOS EN EL DEPARTAMENTO DE SALUD VALENCIA HOSPITAL GENERAL','PRORROGA DE UN AÑO 55.500 €.  NO SE PRESENTA NINGUNA OTRA OFERTA.',NULL,'No se precisa ninguna autorización',NULL,'ISIDRO PÉREZ',2,2,10,6,1,4,2,30,0,0,0,'48','2018-01-15',NULL,40.00,44400.00,NULL,NULL,'L-SE-03-2018','CONSORCIO HOSPITAL GENERAL UNIVERSITARIO DE VALENCIA',2,NULL,NULL,180001.00,NULL,'HOSPITAL GENERAL',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(190,'22','2018-01-19',NULL,'2018-01-19',12769.00,NULL,NULL,NULL,NULL,'Servicio de apoyo de limpieza a las actividades de mantenimiento eléctrico en el sistema TETRA',NULL,NULL,'No se precisa ninguna autorización','US18RA46136PA',NULL,2,2,5,7,1,4,1,24,1,0,1,'02/12/17 A 27/12/17','2017-12-13',NULL,NULL,NULL,NULL,1,'212855','CNAT',3,NULL,NULL,180101.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(191,'180402','2018-01-19',NULL,'2018-01-19',34408.00,NULL,NULL,NULL,NULL,'SERVICIO PARA LA COLOCACIÓN Y RETIRADA DE MANGUERAS EN LAS TAREAS DE DRENAJE, LLENADO Y VENTEO DE SISTEMAS EN RECARGA Y PREPARACIÓN DE LA SOLUCIÓN DE ÁCIDO BÓRICO EN RECARGA','EN 2016 48.057 € (28% MENOS EN 2018). COMPETENCIA PRINCIPAL: MARSEIN',NULL,'No se precisa ninguna autorización',NULL,NULL,2,2,5,NULL,1,2,1,25,4,0,0,'R22','2018-01-22',NULL,15.00,5161.20,NULL,NULL,'IB000181848','ANAV',0,NULL,NULL,NULL,NULL,'COLOCACIÓN MANGUERAS',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(192,'23','2018-01-19',NULL,'2018-02-06',151300.00,NULL,NULL,NULL,NULL,'Servicios de lavanderia en Z.C., mantenimiento de vestuario y EPP. Recarga R224','El importe no incluye el CAP (complemento de actividades programadas)',NULL,'No requiere autorización ni registro',NULL,NULL,2,2,5,7,1,2,1,24,1,0,0,'09/04/18 a 13/05/18','2018-01-30',NULL,NULL,NULL,NULL,1,'212982','CNAT',6,NULL,NULL,180102.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(193,'24','2018-01-19',NULL,'2018-02-06',462221.00,NULL,NULL,NULL,NULL,'Servicios de limpieza y descontaminación de Z.Controlada incluyendo los trabajos de descontaminación durante la \"Ruta Crítica\". Recarga R224','El importe no incluye el CAP (complemento de actividades programadas)',NULL,'No requiere autorización ni registro',NULL,NULL,2,2,5,7,1,2,1,24,1,0,0,'04/04/18 a 13/05/18','2018-01-30',NULL,NULL,NULL,NULL,1,'212983','CNAT',6,NULL,NULL,180103.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(194,'25','2018-01-19',NULL,'2018-02-06',271731.12,NULL,NULL,NULL,NULL,'Limpieza industrial de Zona Convencional y GHD. Recarga R224',NULL,NULL,'No requiere autorización ni registro',NULL,NULL,2,2,5,13,1,2,1,24,1,0,0,'09/04/18 a 13/05/18','2018-01-30',NULL,NULL,NULL,NULL,1,'212984','CNAT',8,NULL,NULL,180104.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(195,'180195','2018-01-24',NULL,'2018-01-24',0.00,NULL,NULL,NULL,NULL,'DISMANTLING AND CLEANING IN CONTROLLED RADIATION AREAS ON THE CERN SITE',NULL,NULL,'Faltan datos para determinar la autorización necesaria. Ponerse en contacto con el Departamento de Apoyo a Ofertas',NULL,'MARINE ROUSSET',2,2,1,8,1,1,3,6,18,2,0,NULL,'2018-02-20',NULL,NULL,NULL,1,NULL,'MS-4372/EN','CERN',2,NULL,NULL,NULL,NULL,'CERN DMT & CLEAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(196,'0500','2018-01-29',NULL,'2018-01-29',0.00,NULL,NULL,NULL,NULL,'Descontaminación separador','GDES-NUC-180500.R0',NULL,'Faltan datos para determinar la autorización necesaria. Ponerse en contacto con el Departamento de Apoyo a Ofertas',NULL,NULL,2,2,5,7,1,1,2,2,18,0,0,'2018','2018-01-29',NULL,NULL,NULL,1,NULL,NULL,'RIPSA',1,NULL,NULL,0.00,NULL,'DESCONAMINACIÓN RIPSA',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(197,'0501','2018-01-29',NULL,'2018-01-29',0.00,NULL,NULL,NULL,NULL,'Filtración aceites termosolar',NULL,NULL,'Faltan datos para determinar la autorización necesaria. Ponerse en contacto con el Departamento de Apoyo a Ofertas',NULL,NULL,2,2,5,NULL,1,1,3,2,18,0,0,'2018','2018-01-31',NULL,NULL,NULL,1,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,'ACEITES',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(203,'26','2018-02-06',NULL,'2018-02-16',35346.36,NULL,NULL,NULL,NULL,'Servicio de limpieza, gestión de residuos líquidos y pruebas con camión GHD durante 24R2',NULL,NULL,'No se precisa ninguna autorización',NULL,NULL,2,2,5,13,1,2,NULL,24,1,0,0,'09/04/18 a 13/05/18','2018-02-12',NULL,NULL,NULL,NULL,1,'213268','CNAT',3,NULL,NULL,180105.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(204,'18/002','2018-02-06',NULL,'2018-02-06',300000.00,NULL,NULL,NULL,NULL,'Démantèlement électromécanique de la cellule MEC Bugey A',NULL,NULL,'Se requiere: Proposal Report (PPR). Autoriza el Comité de Ofertas. Descargue el formato en AYUDA',NULL,'Julie TRAINO',3,2,1,8,2,1,NULL,32,18,0,1,NULL,'2018-02-19',NULL,NULL,NULL,NULL,1,NULL,'EDF',0,NULL,NULL,0.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(205,'27','2018-02-07',NULL,'2018-02-16',27146.20,NULL,NULL,NULL,NULL,'Filtrado de agua de la piscina de combustible gastado con equipo LD9-46 durante la R224',NULL,NULL,'No se precisa ninguna autorización',NULL,NULL,2,2,5,13,1,2,NULL,24,1,0,0,'09/04/18 a 13/05/18','2018-02-12',NULL,NULL,NULL,NULL,1,'213503','CNAT',2,NULL,NULL,180106.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(206,'28','2018-02-08',NULL,'2018-02-16',33000.00,NULL,NULL,NULL,NULL,'Trabajos de limpieza y descontaminación durante los trabajos de Mto. Mco. en unidades de ventilación VA2-MS-19B y VA1-MS-19B.',NULL,NULL,'No se precisa ninguna autorización',NULL,NULL,2,2,5,7,1,2,NULL,24,1,0,0,'09/01/2018 a 31/03/2018','2018-02-12',NULL,NULL,NULL,1,1,'213253','CNAT',1,NULL,NULL,180107.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(207,'29','2018-02-08',NULL,'2018-02-16',25000.00,NULL,NULL,NULL,NULL,'Servicio de limpieza y descontaminación para trabajos de MD-3322 (ATI) durante el año 2018.',NULL,NULL,'No se precisa ninguna autorización',NULL,NULL,2,2,5,7,1,2,NULL,24,1,0,0,'AÑO 2018','2018-02-12',NULL,NULL,NULL,1,1,'213443','CNAT',1,NULL,NULL,180108.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(208,'18-0208','2018-02-12',NULL,'2018-02-12',10000.00,10000.00,NULL,10000.00,NULL,'AAAAA BLA2',NULL,NULL,'Il est nécessaire: Proposal Report (PPR). Autorise le Comité d\'Offres. Téléchargez le format dans AIDE',NULL,'Julie TRAINO',3,2,5,13,2,1,NULL,11,18,0,0,'06-2018 / 03-2019','2018-02-05',NULL,15.00,1500.00,1,1,NULL,'EDF',2,1.00,'2018-02-05',1.00,10000.00,'RRA',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(209,'18004','2018-02-20',NULL,'2018-02-20',111.12,NULL,NULL,NULL,NULL,'SERVICIO DE DOSIMETRÍA Y UNIDAD TÉCNICA DE PROTECCIÓN RADIOLÓGICA',NULL,NULL,'No se precisa ninguna autorización',NULL,'JAVIER RIVERO',2,2,10,6,1,2,NULL,30,0,0,0,'24','2018-02-14',NULL,5.00,NULL,NULL,NULL,'CG-2018/2821/0066','IBERMUTUAMUR',0,NULL,NULL,180004.00,NULL,'IBERMUTUAMUR',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(210,'180002','2018-02-20',NULL,'2018-02-20',1918497.00,NULL,NULL,NULL,NULL,'SERVICIO DE TURNO CERRADO DE PROTECCIÓN RADIOLÓGICA',NULL,NULL,'Se requiere: Proposal Report (PPR). Autoriza el Comité de Ofertas. Descargue el formato en AYUDA',NULL,'JAVIER RIVERO',2,2,10,6,1,2,NULL,30,0,0,0,'36','2018-02-12',NULL,10.00,191849.70,NULL,NULL,'2018-01-RA-LR-CNAT','CNA',0,NULL,NULL,180002.00,NULL,'CNA',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(211,'180003','2018-02-20',NULL,'2018-02-12',1048182.00,NULL,NULL,NULL,NULL,'SERVICIO DE TURNO CERRADO DE PROTECCIÓN RADIOLÓGICA',NULL,NULL,'Se requiere: Proposal Report (PPR). Autoriza el Comité de Ofertas. Descargue el formato en AYUDA',NULL,'JAVIER RIVERO',2,2,10,6,1,2,NULL,30,0,0,0,'36','2018-02-12',NULL,10.00,104818.20,NULL,NULL,'2018-01-RA-LR-CNAT','CNT',0,NULL,NULL,180003.00,NULL,'CNT',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(212,'180007','2018-02-20',NULL,'2018-02-13',3813.00,NULL,NULL,NULL,NULL,'SUPERVISOR DE INSTALACIONES RADIACTIVAS',NULL,NULL,'No se precisa ninguna autorización',NULL,'JAVIER RIVERO',2,2,10,6,1,2,NULL,30,0,0,0,'12','2018-02-13',NULL,10.00,381.30,NULL,NULL,NULL,'PROINTEC',0,NULL,NULL,180007.00,NULL,'PROINTEC',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(213,'180005','2018-02-20',NULL,'2018-02-08',15000.00,NULL,NULL,NULL,NULL,'PREPARACIÓN, COORDINACIÓN E IMPARTICIÓN DE CURSO DE FORMACIÓN EN EMERGENCIAS RADIOLÓGICAS','LA DURACIÓN DEL CURSO ES UNA SEMANA',NULL,'No se precisa ninguna autorización',NULL,'VICENTE GUARDIA',2,2,10,6,1,2,NULL,30,0,0,0,'1','2018-02-08',NULL,10.00,1500.00,NULL,NULL,NULL,'PROTECCIÓN CIVIL',0,NULL,NULL,180005.00,NULL,'PROTECCIÓN CIVIL',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(214,'180006','2018-02-20',NULL,'2018-02-01',80000.00,NULL,NULL,NULL,NULL,'Curso de formación de Supervisores y curso de formación de Operadores de Instalaciones Radiactivas en el campo de aplicación de Control de Procesos y Técnicas Analíticas',NULL,NULL,'No se precisa ninguna autorización',NULL,'VICENTE GUARDIA',2,2,10,6,1,2,NULL,30,0,0,0,'6','2018-02-01',NULL,10.00,8000.00,NULL,NULL,NULL,'ACERINOX',0,NULL,NULL,180006.00,NULL,'ACERINOX',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(215,'180600','2018-02-21',NULL,'2018-02-21',2392182.00,NULL,NULL,NULL,NULL,'SERVICIO DE MANTENIMIENTO DE SELLADOS Y JUNTAS SÍSMICAS DE C.N. ASCÓ Y C.N. VANDELLÓS II','Presentada Oferta Técnica. Pendiente fecha entrega Oferta Económica.',NULL,'Faltan datos para determinar la autorización necesaria. Ponerse en contacto con el Departamento de Apoyo a Ofertas',NULL,NULL,2,2,14,24,1,2,NULL,27,4,0,0,'2018-2020','2018-02-07',NULL,10.00,239218.20,NULL,NULL,'IBE000183750','ANAV',1,NULL,NULL,NULL,NULL,'Sellados ANAV',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);

/*Table structure for table `paises` */

DROP TABLE IF EXISTS `paises`;

CREATE TABLE `paises` (
  `paisId` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Identificador interdo de país',
  `nombre` varchar(255) NOT NULL COMMENT 'Nombre del país',
  `codPais` varchar(255) DEFAULT NULL COMMENT 'Código de país según ISO 3661-1/2',
  PRIMARY KEY (`paisId`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COMMENT='Tabla de paises';

/*Data for the table `paises` */

insert  into `paises`(`paisId`,`nombre`,`codPais`) values 
(1,'ESPAÑA','ES'),
(2,'FRANCIA','FR'),
(3,'MÉXICO','MX'),
(4,'PANAMÁ','PA'),
(5,'UK','GB'),
(6,'USA','US'),
(7,'BRASIL','BR'),
(8,'OTROS','OT');

/*Table structure for table `proyectos` */

DROP TABLE IF EXISTS `proyectos`;

CREATE TABLE `proyectos` (
  `proyectoId` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Identificador de proyecto',
  `nombre` varchar(255) DEFAULT NULL COMMENT 'Nombre del proyecto',
  `referencia` varchar(255) DEFAULT NULL COMMENT 'Referencia de proyecto',
  `numeroProyecto` varchar(255) DEFAULT NULL COMMENT 'Número de proyecto en GDES',
  PRIMARY KEY (`proyectoId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='Proyectos a los que pertenecen las ofertas';

/*Data for the table `proyectos` */

insert  into `proyectos`(`proyectoId`,`nombre`,`referencia`,`numeroProyecto`) values 
(2,'Proyecto 1','RFP1','NR1'),
(3,'Proyecto 2',NULL,NULL);

/*Table structure for table `responsables` */

DROP TABLE IF EXISTS `responsables`;

CREATE TABLE `responsables` (
  `responsableId` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Identificador de responsable',
  `usuarioId` int(11) DEFAULT NULL COMMENT 'Usuario relacionado',
  `nombre` varchar(255) DEFAULT NULL COMMENT 'Nombre del responsable',
  PRIMARY KEY (`responsableId`),
  KEY `responsables_usuarios` (`usuarioId`),
  CONSTRAINT `responsables_usuarios` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios` (`usuarioId`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8 COMMENT='Responsables de la oferta para GDES';

/*Data for the table `responsables` */

insert  into `responsables`(`responsableId`,`usuarioId`,`nombre`) values 
(1,1,'Administrador RESP'),
(2,2,'Antonio Martinez'),
(3,3,'Marceliano Curiel'),
(4,4,'Antonio Andrés'),
(5,5,'Fernando de Pablo'),
(6,6,'Jose Tomás Ruiz'),
(7,7,'Joan Romeu'),
(8,8,'Ivan Maqueda'),
(9,9,'Fernando Lázaro'),
(10,10,'André Martínez'),
(11,11,'Patrice Guerra'),
(12,12,'Jorge Luis Uzcátegui'),
(13,13,'Fernando Fernandez'),
(14,14,'Vassil Gueorguiev Hristov Georgiev'),
(16,16,'Ramón Almoguera'),
(21,18,'Nelia Martínez'),
(23,21,'Francisco Ruiz Sanchez'),
(24,20,'Julián Gomez Medinabeitia'),
(25,24,'Federico Romero'),
(26,25,'Miguel Querol'),
(27,22,'Arturo Pascual'),
(28,23,'Catherine Paul'),
(29,26,'Inmaculada Pastor'),
(30,27,'Isidro Pérez'),
(31,28,'Inmaculada Pastor'),
(32,29,'Lucía Lacalle'),
(33,34,'Belén Lopez'),
(34,33,'Gary Stronach'),
(35,35,'Tomás Canorea'),
(36,36,'Dominique Mouillot'),
(37,11,'Julie Traino');

/*Table structure for table `servicios` */

DROP TABLE IF EXISTS `servicios`;

CREATE TABLE `servicios` (
  `servicioId` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `areaId` int(11) DEFAULT NULL,
  PRIMARY KEY (`servicioId`),
  KEY `ref_servicio_area` (`areaId`),
  CONSTRAINT `ref_servicio_area` FOREIGN KEY (`areaId`) REFERENCES `areas` (`areaId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Data for the table `servicios` */

insert  into `servicios`(`servicioId`,`nombre`,`areaId`) values 
(1,'PEPEPE',NULL),
(2,'PPO569899',7),
(3,'PPP77888',5);

/*Table structure for table `tipos_actividades` */

DROP TABLE IF EXISTS `tipos_actividades`;

CREATE TABLE `tipos_actividades` (
  `tipoActividadId` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Identificador único del tipo de actividad',
  `nombre` varchar(255) NOT NULL COMMENT 'Nombre del tipo de actividad',
  `grupoActividadId` int(11) DEFAULT NULL,
  PRIMARY KEY (`tipoActividadId`),
  KEY `tipoa_grupoac` (`grupoActividadId`),
  CONSTRAINT `tipoa_grupoac` FOREIGN KEY (`grupoActividadId`) REFERENCES `grupos_actividades` (`grupoActividadId`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8 COMMENT='Tipos de actividades';

/*Data for the table `tipos_actividades` */

insert  into `tipos_actividades`(`tipoActividadId`,`nombre`,`grupoActividadId`) values 
(1,'ACONDICIONAMIENTO RESIDUOS RADIACTIVOS',52),
(2,'INSPECCIÓN Y MONTAJE DE ANDAMIOS Y ESTRUCTURAS METÁLICAS',52),
(3,'PREPARACIÓN DE SUPERFICIES Y APLICACIÓN DE REVESTIMIENTOS',52),
(4,'APOYO A OPERACIÓN PR',52),
(5,'APOYO A OPERACIÓN QUÍMICA',52),
(6,'ASISTÉNCIA TÉCNICA Y FORMACIÓN PR',52),
(7,'DESCONTAMINACIÓN',52),
(8,'DESMANTELAMIENTO',52),
(9,'EMERGENCIAS RADIOLÓGICAS',52),
(10,'GESTIÓN DE ALMACENES Y TRANSPORTE',52),
(11,'GESTIÓN RESIDUOS (GENERAL) ',52),
(12,'INGENIERÍA DE DISEÑO/IDI/CONSULTORÍA TECNOLÓGICA',52),
(13,'LIMPIEZA INDUSTRIAL',52),
(14,'LIMPIEZA QUÍMICA',52),
(15,'LIMPIEZA Y MANT. EN TERMOSOLARES',52),
(16,'INSPECCIÓN, REPARACIÓN Y MANTENIMIENTO DE PALAS EÓLICAS',52),
(17,'INSTALACIÓN Y MANTENIMIENTO DE REDES ELÉCTRICAS',52),
(18,'MANTENIMIENTO PREVENTIVO/PREDITIVO',52),
(19,'METALIZACIÓN',52),
(21,'PROTECCIÓN RADIOLÓGICA',52),
(22,'PROYECTOS I+D+I',52),
(23,'REPARACIÓN DE HORMIGONES Y REFUERZOS ESTRUCTURALES',52),
(24,'SELLADO DE PENETRACIONES',52),
(25,'TRATAMIENTO DE LODOS Y EFLUENTES',52),
(29,'SUBESTACIONES ELÉCTRICAS',52),
(30,'LÍNEAS DE AT',52),
(31,'ALUMBRADO PÚBLICO',52),
(32,'MANTENIMIENTO BT/MT',52),
(34,'LUCHA CONTRA PLAGAS Y TRATAMIENTOS CONTRA LEGIONELOSIS',52),
(35,'APLICACIÓN/INSTALACIÓN DE PROTECCIONES PASIVAS CONTRA EL FUEGO',52),
(36,'AISLAMIENTO TÉRMICO',52),
(37,'ANÁLISIS DE SEÑALES/INSTRUMENTACIÓN',52),
(38,'DISEÑO Y CÁLCULO DE ANDAMIOS Y ESTRUCTURAS METÁLICAS',52),
(39,'DOSIMETRÍA',52),
(40,'DESARROLLO DE SOFTWARE',52);

/*Table structure for table `tipos_oferta` */

DROP TABLE IF EXISTS `tipos_oferta`;

CREATE TABLE `tipos_oferta` (
  `tipoOfertaId` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Identificador único del tipo de oferta',
  `nombre` varchar(255) NOT NULL COMMENT 'Nombre del tipo de oferta',
  PRIMARY KEY (`tipoOfertaId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `tipos_oferta` */

insert  into `tipos_oferta`(`tipoOfertaId`,`nombre`) values 
(0,'Oferta'),
(1,'OPORTUNIDAD DE NEGOCIO (BUSINESS OPPORTUNITY)'),
(2,'PRECALIFICACIÓN (PREQUALIFICATION)');

/*Table structure for table `tipos_oportunidad` */

DROP TABLE IF EXISTS `tipos_oportunidad`;

CREATE TABLE `tipos_oportunidad` (
  `tipoOportunidadId` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`tipoOportunidadId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `tipos_oportunidad` */

/*Table structure for table `tipos_proyecto` */

DROP TABLE IF EXISTS `tipos_proyecto`;

CREATE TABLE `tipos_proyecto` (
  `tipoProyectoId` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`tipoProyectoId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `tipos_proyecto` */

/*Table structure for table `tipos_soporte` */

DROP TABLE IF EXISTS `tipos_soporte`;

CREATE TABLE `tipos_soporte` (
  `tipoSoporteId` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Identificador interno del tipo de soporte',
  `nombre` varchar(255) NOT NULL COMMENT 'Nombre del tipo de soporte',
  PRIMARY KEY (`tipoSoporteId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='Tipos de soporte para la oferta';

/*Data for the table `tipos_soporte` */

insert  into `tipos_soporte`(`tipoSoporteId`,`nombre`) values 
(1,'FUERA DE RANKING (OUT OF RAKING)'),
(2,'RENOVACIÓN DE SERVICIO ACTUAL (RENEWAL OF A CURRENT SERVICE)'),
(3,'NUEVO SERVICIO/CLIENTE (NEW SERVICE/CUSTOMER )');

/*Table structure for table `ubicaciones` */

DROP TABLE IF EXISTS `ubicaciones`;

CREATE TABLE `ubicaciones` (
  `ubicacionId` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ubicacionId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `ubicaciones` */

/*Table structure for table `unidades_negocio` */

DROP TABLE IF EXISTS `unidades_negocio`;

CREATE TABLE `unidades_negocio` (
  `unidadNegocioId` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`unidadNegocioId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `unidades_negocio` */

insert  into `unidades_negocio`(`unidadNegocioId`,`nombre`) values 
(2,'Unidad Negocio 2');

/*Table structure for table `usuarios` */

DROP TABLE IF EXISTS `usuarios`;

CREATE TABLE `usuarios` (
  `usuarioId` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Identificador único del usuario',
  `grupoUsuarioId` int(11) DEFAULT NULL COMMENT 'Grupo al que pertenece',
  `nombre` varchar(255) DEFAULT NULL COMMENT 'Nombre del usuario',
  `codigoIdioma` varchar(255) DEFAULT NULL COMMENT 'Codigo de idioma según 639-1',
  `login` varchar(255) DEFAULT NULL COMMENT 'Login con el que se presenta el usuario',
  `password` varchar(255) DEFAULT NULL COMMENT 'Contraseña del usuario (por el moento en texto plano, luego será codificada)',
  `getKeyTime` datetime DEFAULT NULL COMMENT 'Fecha y hora en la que se obtuvo la última clave API',
  `expKeyTime` datetime DEFAULT NULL COMMENT 'Fecha y hora en la que expira la clave API',
  `apiKey` varchar(255) DEFAULT NULL COMMENT 'Clave API utilizada para identificar al usuario en las llamadas',
  `paisId` int(11) DEFAULT NULL COMMENT 'Pais por defecto para ofertas',
  `empresaId` int(11) DEFAULT NULL COMMENT 'Empresa por defecto para ofertas',
  `areaId` int(11) DEFAULT NULL COMMENT 'Área por defecto para ofertas',
  `centroId` int(11) DEFAULT NULL COMMENT 'Centro por defecto para ofertas',
  `esAdministrador` tinyint(1) DEFAULT '0' COMMENT 'Indica si el usuario tiene priviligeios de administrador en la aplicación',
  `verOfertasGrupo` tinyint(1) DEFAULT '0' COMMENT 'Indica si el usuario puede ver ofertas de otros responsables pretenecientes a su grupo',
  PRIMARY KEY (`usuarioId`),
  KEY `usuarios_grupos` (`grupoUsuarioId`),
  KEY `usuarios_paises` (`paisId`),
  KEY `usuarios_empresas` (`empresaId`),
  KEY `usuarios_areas` (`areaId`),
  KEY `usuarios_centros` (`centroId`),
  CONSTRAINT `usuarios_areas` FOREIGN KEY (`areaId`) REFERENCES `areas` (`areaId`),
  CONSTRAINT `usuarios_centros` FOREIGN KEY (`centroId`) REFERENCES `centros` (`centroId`),
  CONSTRAINT `usuarios_empresas` FOREIGN KEY (`empresaId`) REFERENCES `empresas` (`empresaId`),
  CONSTRAINT `usuarios_grupos` FOREIGN KEY (`grupoUsuarioId`) REFERENCES `grupos_usuarios` (`grupoUsuarioId`),
  CONSTRAINT `usuarios_paises` FOREIGN KEY (`paisId`) REFERENCES `paises` (`paisId`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8 COMMENT='Tabla de usuarios. Todos los usuarios pertenecen a un grupo';

/*Data for the table `usuarios` */

insert  into `usuarios`(`usuarioId`,`grupoUsuarioId`,`nombre`,`codigoIdioma`,`login`,`password`,`getKeyTime`,`expKeyTime`,`apiKey`,`paisId`,`empresaId`,`areaId`,`centroId`,`esAdministrador`,`verOfertasGrupo`) values 
(1,1,'Administrador','es','admin','admin','2018-03-02 10:34:25','2018-03-02 15:34:25','kceSP',4,7,7,0,1,0),
(2,5,'Antonio Martinez Pulgarín','es','a.martinez@gdes.com','1234','2018-01-30 11:52:40','2018-01-30 16:52:40','CjoZg',1,2,5,NULL,0,1),
(3,8,'Marceliano Curiel','es','m.curiel@gdes.com','1234','2017-06-27 08:31:07','2017-06-27 13:31:07','RcYFl',1,2,1,NULL,0,1),
(4,9,'Antonio Andrés','es','a.andres@gdes.com','1234','2017-08-07 13:45:10','2017-08-07 18:45:10','FwqfY',1,2,6,NULL,0,1),
(5,8,'Fernando de Pablo','es','f.pablo@gdes.com','1234',NULL,NULL,NULL,1,2,1,NULL,0,0),
(6,1,'Jose Tomás Ruiz','es','j.ruiz@gdes.com','1234','2017-08-04 08:52:19','2017-08-04 13:52:19','sveOr',NULL,NULL,NULL,NULL,1,0),
(7,5,'Joan Romeu','es','j.romeu@gdes.com','1234','2017-08-02 14:16:03','2017-08-02 19:16:03','BDPy2',1,2,11,18,0,0),
(8,11,'Ivan Maqueda','es','i.maqueda@gdes.com','1234',NULL,NULL,NULL,1,9,8,NULL,0,1),
(9,11,'Fernando Lázaro','es','f.lazaro@gdes.com','1234',NULL,NULL,NULL,1,9,8,NULL,0,1),
(10,23,'André Martínez','fr','an.martinez@gdes.com','1234','2017-05-24 15:18:54','2017-05-24 20:18:54','RJQvC',2,3,2,18,0,0),
(11,23,'Patrice Guerra','fr','p.guerra@gdes.com','1234','2018-02-12 16:02:01','2018-02-12 21:02:01','d6jer',2,1,5,18,0,0),
(12,9,'Jorge Luis Uzcátegui','es','j.uzcategui@gdes.com','1234',NULL,NULL,NULL,4,4,6,NULL,0,0),
(13,24,'Fernando Fernandez','es','f.fernandez@gdes.com','1234','2017-11-27 23:07:41','2017-11-28 04:07:41','7GoBz',3,6,4,NULL,0,0),
(14,14,'Vassil Gueorguiev Hristov Georgiev','es','v.hristov@gdes.com','1234','2017-06-27 19:27:38','2017-06-28 00:27:38','ZOTKV',4,7,7,NULL,0,1),
(16,15,'Ramón Almoguera','es','r.almoguera_ext@gdes.com','1234','2017-07-11 14:03:55','2017-07-11 19:03:55','d5VvI',5,5,NULL,NULL,0,1),
(18,1,'Nelia Martínez','es','n.martinez@gdes.com','1234','2018-02-22 16:46:20','2018-02-22 21:46:20','R7tCr',NULL,NULL,NULL,NULL,1,0),
(20,5,'Julián Gomez Medinabeitia','es','j.gomez@gdes.com','1234','2018-02-16 12:11:03','2018-02-16 17:11:03','37fjB',1,2,5,1,0,0),
(21,5,'Francisco Ruiz Sanchez','es','f.ruiz@gdes.com','1234','2018-02-05 18:52:14','2018-02-05 23:52:14','FBwDF',1,2,5,1,0,0),
(22,5,'Arturo Pascual','es','a.pascual@gdes.com','1234','2018-02-21 18:25:18','2018-02-21 23:25:18','9cVJD',1,2,NULL,NULL,0,0),
(23,13,'Catherine Paul','es','c.paul@gdes.com','1234',NULL,NULL,NULL,2,1,8,NULL,0,0),
(24,5,'Federico Romero','es','f.romero@gdes.com','1234','2018-01-30 11:42:39','2018-01-30 16:42:39','Ojiw4',1,2,5,4,0,0),
(25,5,'Miguel Querol','es','m.querol@gdes.com','1234',NULL,NULL,NULL,1,2,5,4,0,0),
(26,5,'Inmaculada Pastor','es','i.pastor@gdes.com','1234','2018-01-30 12:57:46','2018-01-30 17:57:46','PUvV9',1,2,5,3,0,0),
(27,16,'Isidro Pérez','es','i.perez@gdes.com','1234','2018-02-28 11:11:51','2018-02-28 16:11:51','RMJet',1,2,10,NULL,0,1),
(28,5,'Juan Manuel Sanchez','es','jm.sanchez@gdes.com','1234','2018-01-30 12:56:15','2018-01-30 17:56:15','UrIsc',1,2,14,3,0,0),
(29,23,'Lucía Lacalle','es','l.lacalle@gdes.com','1234','2018-02-27 14:08:23','2018-02-27 19:08:23','HsCgE',2,3,NULL,18,0,1),
(33,15,'Gary Stronach','EN','g.stronach@gdes.com','Jqcbz9uy','2017-09-28 12:11:59','2017-09-28 17:11:59','As0yd',5,5,5,17,0,0),
(34,19,'Belén López','es','b.lopez@titaniast.com','1234','2017-12-19 15:11:43','2017-12-19 20:11:43','NdPyX',1,11,2,NULL,0,1),
(35,5,'Tomás Canorea','es',NULL,NULL,NULL,NULL,NULL,1,2,5,2,0,0),
(36,23,'Dominique Mouillot','fr','d.mouillot@gdes.com','1234','2018-01-30 11:52:14','2018-01-30 16:52:14','zIBpp',2,3,NULL,18,0,1),
(37,23,'Julie Traino','fr','j.traino@gdes.com','1234','2018-02-12 16:01:46','2018-02-12 21:01:46','yRIgV',2,3,5,18,0,0),
(38,23,'Maryline Clouet','fr','m.clouet@gdes.com','1234','2018-02-12 16:03:04','2018-02-12 21:03:04','HjQr7',2,3,5,18,0,1);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
