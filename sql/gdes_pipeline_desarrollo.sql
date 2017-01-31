/*
SQLyog Community v12.3.3 (64 bit)
MySQL - 5.7.14-log : Database - gdes_pipeline
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`gdes_pipeline` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `gdes_pipeline`;

/*Table structure for table `areas` */

DROP TABLE IF EXISTS `areas`;

CREATE TABLE `areas` (
  `areaId` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Identificador único de área',
  `nombre` varchar(255) NOT NULL COMMENT 'Nombre del área',
  PRIMARY KEY (`areaId`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COMMENT='Áreas a las que pertenecerá la oferta';

/*Data for the table `areas` */

insert  into `areas`(`areaId`,`nombre`) values (1,'DMT - Nuclear Desmantelamiento');
insert  into `areas`(`areaId`,`nombre`) values (2,'IDI - I+D+i');
insert  into `areas`(`areaId`,`nombre`) values (3,'GEN - General');
insert  into `areas`(`areaId`,`nombre`) values (4,'IND - Industrial');
insert  into `areas`(`areaId`,`nombre`) values (5,'NUC - Nuclear Generación');
insert  into `areas`(`areaId`,`nombre`) values (6,'LOG - Logística');
insert  into `areas`(`areaId`,`nombre`) values (7,'RED - Redes Eléctricas');
insert  into `areas`(`areaId`,`nombre`) values (8,'REV - Aplicación de Revestimientos');
insert  into `areas`(`areaId`,`nombre`) values (9,'SVT - Eólica');
insert  into `areas`(`areaId`,`nombre`) values (10,'PR - Protección Radiológica');

/*Table structure for table `centros` */

DROP TABLE IF EXISTS `centros`;

CREATE TABLE `centros` (
  `centroId` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Identificador del centro',
  `nombre` varchar(255) NOT NULL COMMENT 'Nombre del centro',
  PRIMARY KEY (`centroId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='Centros establecidos';

/*Data for the table `centros` */

insert  into `centros`(`centroId`,`nombre`) values (0,'No Existe Centro');
insert  into `centros`(`centroId`,`nombre`) values (1,'CN ALMARAZ');
insert  into `centros`(`centroId`,`nombre`) values (2,'CN TRILLO');
insert  into `centros`(`centroId`,`nombre`) values (3,'CN COFRENTES');
insert  into `centros`(`centroId`,`nombre`) values (4,'CN VANDELLÓS II');

/*Table structure for table `empresas` */

DROP TABLE IF EXISTS `empresas`;

CREATE TABLE `empresas` (
  `empresaId` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Identificador único de la empresa',
  `nombre` varchar(255) NOT NULL COMMENT 'Nombre de la empresa',
  PRIMARY KEY (`empresaId`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COMMENT='Empresas del grupo';

/*Data for the table `empresas` */

insert  into `empresas`(`empresaId`,`nombre`) values (1,'GDEA - GDES erba SAS');
insert  into `empresas`(`empresaId`,`nombre`) values (2,'GDES - GD ENERGY SERVICES SAU');
insert  into `empresas`(`empresaId`,`nombre`) values (3,'GDFR - GD ENERGY SERVICES SARL ');
insert  into `empresas`(`empresaId`,`nombre`) values (4,'GDLC - LAINSA CORPORATE');
insert  into `empresas`(`empresaId`,`nombre`) values (5,'GDUK - GD ENERGY SERVICES LTD ');
insert  into `empresas`(`empresaId`,`nombre`) values (6,'GDMX - GD ENERGY SERVICES NUCLEAR SA DE CV ');
insert  into `empresas`(`empresaId`,`nombre`) values (7,'GDPA - GDES JC LINEMAN SRL');
insert  into `empresas`(`empresaId`,`nombre`) values (8,'IYM - INGENIERIA Y MARKETING');
insert  into `empresas`(`empresaId`,`nombre`) values (9,'REV - REVESTIMIENTOS ANTICORROSIVOS INDUSTRIALES S.L.');
insert  into `empresas`(`empresaId`,`nombre`) values (10,'GDWD - GDES WIND');
insert  into `empresas`(`empresaId`,`nombre`) values (11,'TIT - Ofertas de TITANIA');
insert  into `empresas`(`empresaId`,`nombre`) values (12,'T4S - Ofertas de T4S');
insert  into `empresas`(`empresaId`,`nombre`) values (13,'INN - Ofertas de INNOMERICS');

/*Table structure for table `estados` */

DROP TABLE IF EXISTS `estados`;

CREATE TABLE `estados` (
  `estadoId` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Identificador interno del estado',
  `nombre` varchar(255) NOT NULL COMMENT 'Nombre del estado',
  PRIMARY KEY (`estadoId`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COMMENT='Estados en los que se puede encontrar una oferta';

/*Data for the table `estados` */

insert  into `estados`(`estadoId`,`nombre`) values (1,'EN PROCESO');
insert  into `estados`(`estadoId`,`nombre`) values (2,'PRESENTADA');
insert  into `estados`(`estadoId`,`nombre`) values (3,'NO PRESENTADA');
insert  into `estados`(`estadoId`,`nombre`) values (4,'ADJUDICADA');
insert  into `estados`(`estadoId`,`nombre`) values (5,'PERDIDA');
insert  into `estados`(`estadoId`,`nombre`) values (6,'COMPROMISO');
insert  into `estados`(`estadoId`,`nombre`) values (7,'OTROS');
insert  into `estados`(`estadoId`,`nombre`) values (8,'INVITADOS');
insert  into `estados`(`estadoId`,`nombre`) values (9,'NO INVITADOS');

/*Table structure for table `grupos_actividades` */

DROP TABLE IF EXISTS `grupos_actividades`;

CREATE TABLE `grupos_actividades` (
  `grupoActividadId` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Identificador único del grupo de actividad',
  `nombre` varchar(255) NOT NULL COMMENT 'Nombre del grupo de actividad',
  PRIMARY KEY (`grupoActividadId`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8 COMMENT='Agrupaciones de tipos de actividad';

/*Data for the table `grupos_actividades` */

insert  into `grupos_actividades`(`grupoActividadId`,`nombre`) values (23,'ACONDICIONAMIENTO RESIDUOS RADIACTIVOS');
insert  into `grupos_actividades`(`grupoActividadId`,`nombre`) values (24,'ANDAMIOS');
insert  into `grupos_actividades`(`grupoActividadId`,`nombre`) values (25,'APLICACIÓN DE REVESTIMIENTOS');
insert  into `grupos_actividades`(`grupoActividadId`,`nombre`) values (26,'APOYO A OPERACIÓN PR');
insert  into `grupos_actividades`(`grupoActividadId`,`nombre`) values (27,'APOYO A OPERACIÓN QUÍMICA');
insert  into `grupos_actividades`(`grupoActividadId`,`nombre`) values (28,'ASISTÉNCIA TÉCNICA Y FORMACIÓN PR');
insert  into `grupos_actividades`(`grupoActividadId`,`nombre`) values (29,'DESCONTAMINACIÓN');
insert  into `grupos_actividades`(`grupoActividadId`,`nombre`) values (30,'DESMANTELAMIENTO');
insert  into `grupos_actividades`(`grupoActividadId`,`nombre`) values (31,'EMERGENCIAS RADIOLÓGICAS');
insert  into `grupos_actividades`(`grupoActividadId`,`nombre`) values (32,'GESTIÓN DE ALMACENES Y TRANSPORTE');
insert  into `grupos_actividades`(`grupoActividadId`,`nombre`) values (33,'GESTIÓN RESIDUOS (GENERAL) RP/RNP');
insert  into `grupos_actividades`(`grupoActividadId`,`nombre`) values (34,'INGENIERÍA');
insert  into `grupos_actividades`(`grupoActividadId`,`nombre`) values (35,'LIMPIEZA INDUSTRIAL');
insert  into `grupos_actividades`(`grupoActividadId`,`nombre`) values (36,'LIMPIEZA QUÍMICA');
insert  into `grupos_actividades`(`grupoActividadId`,`nombre`) values (37,'LIMPIEZA Y MANT. EN TERMOSOLARES');
insert  into `grupos_actividades`(`grupoActividadId`,`nombre`) values (38,'MANTENIMIENTO DE PALAS EÓLICAS');
insert  into `grupos_actividades`(`grupoActividadId`,`nombre`) values (39,'MANTENIMIENTO DE REDES ELÉCTRICAS');
insert  into `grupos_actividades`(`grupoActividadId`,`nombre`) values (40,'MANTENIMIENTO PREVENTIVO/PREDITIVO');
insert  into `grupos_actividades`(`grupoActividadId`,`nombre`) values (41,'METALIZACIÓN');
insert  into `grupos_actividades`(`grupoActividadId`,`nombre`) values (42,'PREPARACIÓN DE SUPERFICIES');
insert  into `grupos_actividades`(`grupoActividadId`,`nombre`) values (43,'PROTECCIÓN RADIOLÓGICA');
insert  into `grupos_actividades`(`grupoActividadId`,`nombre`) values (44,'PROYECTOS I+D+I');
insert  into `grupos_actividades`(`grupoActividadId`,`nombre`) values (45,'REPARACIÓN DE HORMIGONES Y REFUERZOS ');
insert  into `grupos_actividades`(`grupoActividadId`,`nombre`) values (46,'SELLADO, PROTECCIONES PASIVAS Y AISLAMIENTO TÉRMICO');
insert  into `grupos_actividades`(`grupoActividadId`,`nombre`) values (47,'TRATAMIENTO DE LODOS Y EFLUENTES');
insert  into `grupos_actividades`(`grupoActividadId`,`nombre`) values (48,'CONSTRUCCIÓN DE SUBESTACIONES');
insert  into `grupos_actividades`(`grupoActividadId`,`nombre`) values (49,'ÓRDENES Y SERVICIOS');
insert  into `grupos_actividades`(`grupoActividadId`,`nombre`) values (50,'OTROS');
insert  into `grupos_actividades`(`grupoActividadId`,`nombre`) values (51,'NUEVOS SUMINISTROS');

/*Table structure for table `grupos_usuarios` */

DROP TABLE IF EXISTS `grupos_usuarios`;

CREATE TABLE `grupos_usuarios` (
  `grupoUsuarioId` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Identificador único del grupo de usuario',
  `nombre` varchar(255) NOT NULL COMMENT 'Nombre del grupo',
  PRIMARY KEY (`grupoUsuarioId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='Esta es la tabla que contiene los grupos de usuarios';

/*Data for the table `grupos_usuarios` */

insert  into `grupos_usuarios`(`grupoUsuarioId`,`nombre`) values (1,'Administradores');

/*Table structure for table `ofertas` */

DROP TABLE IF EXISTS `ofertas`;

CREATE TABLE `ofertas` (
  `ofertaId` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Identificador único del tipo de oferta',
  `numeroOferta` varchar(255) DEFAULT NULL COMMENT 'Número de la oferta',
  `fechaOferta` date DEFAULT NULL COMMENT 'Fecha original de la oferta',
  `fechaLimiteProyecto` date DEFAULT NULL COMMENT 'Fecha estimada para el proyecto ofertado',
  `fechaAceptacion` date DEFAULT NULL COMMENT 'Fecha en que la oferta pasó al estado de aceptada',
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
  CONSTRAINT `oft_area` FOREIGN KEY (`areaId`) REFERENCES `areas` (`areaId`),
  CONSTRAINT `oft_centros` FOREIGN KEY (`centroId`) REFERENCES `centros` (`centroId`),
  CONSTRAINT `oft_empresa` FOREIGN KEY (`empresaId`) REFERENCES `empresas` (`empresaId`),
  CONSTRAINT `oft_estado` FOREIGN KEY (`estadoId`) REFERENCES `estados` (`estadoId`),
  CONSTRAINT `oft_pais` FOREIGN KEY (`paisId`) REFERENCES `paises` (`paisId`),
  CONSTRAINT `oft_proyecto` FOREIGN KEY (`proyectoId`) REFERENCES `proyectos` (`proyectoId`),
  CONSTRAINT `oft_responsable` FOREIGN KEY (`responsableId`) REFERENCES `responsables` (`responsableId`),
  CONSTRAINT `oft_tipo_actividad` FOREIGN KEY (`tipoActividadId`) REFERENCES `tipos_actividades` (`tipoActividadId`),
  CONSTRAINT `oft_tipo_oferta` FOREIGN KEY (`tipoOfertaId`) REFERENCES `tipos_oferta` (`tipoOfertaId`),
  CONSTRAINT `oft_tipo_soporte` FOREIGN KEY (`tipoSoporteId`) REFERENCES `tipos_soporte` (`tipoSoporteId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Tabla general de ofertas';

/*Data for the table `ofertas` */

/*Table structure for table `paises` */

DROP TABLE IF EXISTS `paises`;

CREATE TABLE `paises` (
  `paisId` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Identificador interdo de país',
  `nombre` varchar(255) NOT NULL COMMENT 'Nombre del país',
  `codPais` varchar(255) DEFAULT NULL COMMENT 'Código de país según ISO 3661-1/2',
  PRIMARY KEY (`paisId`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COMMENT='Tabla de paises';

/*Data for the table `paises` */

insert  into `paises`(`paisId`,`nombre`,`codPais`) values (1,'ESPAÑA','ES');
insert  into `paises`(`paisId`,`nombre`,`codPais`) values (2,'FRANCIA','FR');
insert  into `paises`(`paisId`,`nombre`,`codPais`) values (3,'MÉXICO','MX');
insert  into `paises`(`paisId`,`nombre`,`codPais`) values (4,'PANAMÁ','PA');
insert  into `paises`(`paisId`,`nombre`,`codPais`) values (5,'UK','UK');
insert  into `paises`(`paisId`,`nombre`,`codPais`) values (6,'USA','US');
insert  into `paises`(`paisId`,`nombre`,`codPais`) values (7,'BRASIL','BR');
insert  into `paises`(`paisId`,`nombre`,`codPais`) values (8,'OTROS','OT');

/*Table structure for table `proyectos` */

DROP TABLE IF EXISTS `proyectos`;

CREATE TABLE `proyectos` (
  `proyectoId` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Identificador de proyecto',
  `nombre` varchar(255) DEFAULT NULL COMMENT 'Nombre del proyecto',
  `referencia` varchar(255) DEFAULT NULL COMMENT 'Referencia de proyecto',
  `numeroProyecto` int(11) DEFAULT NULL COMMENT 'Número de proyecto en GDES',
  PRIMARY KEY (`proyectoId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Proyectos a los que pertenecen las ofertas';

/*Data for the table `proyectos` */

/*Table structure for table `responsables` */

DROP TABLE IF EXISTS `responsables`;

CREATE TABLE `responsables` (
  `responsableId` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Identificador de responsable',
  `usuarioId` int(11) DEFAULT NULL COMMENT 'Usuario relacionado',
  `nombre` varchar(255) DEFAULT NULL COMMENT 'Nombre del responsable',
  PRIMARY KEY (`responsableId`),
  KEY `responsables_usuarios` (`usuarioId`),
  CONSTRAINT `responsables_usuarios` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios` (`usuarioId`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8 COMMENT='Responsables de la oferta para GDES';

/*Data for the table `responsables` */

insert  into `responsables`(`responsableId`,`usuarioId`,`nombre`) values (1,1,'Administrador');
insert  into `responsables`(`responsableId`,`usuarioId`,`nombre`) values (2,2,'Antonio Martinez');
insert  into `responsables`(`responsableId`,`usuarioId`,`nombre`) values (3,3,'Marceliano Curiel');
insert  into `responsables`(`responsableId`,`usuarioId`,`nombre`) values (4,4,'Antonio Andrés');
insert  into `responsables`(`responsableId`,`usuarioId`,`nombre`) values (5,5,'Fernando de Pablo');
insert  into `responsables`(`responsableId`,`usuarioId`,`nombre`) values (6,6,'Jose Tomás Ruiz');
insert  into `responsables`(`responsableId`,`usuarioId`,`nombre`) values (7,7,'Joan Romeu');
insert  into `responsables`(`responsableId`,`usuarioId`,`nombre`) values (8,8,'Ivan Maqueda');
insert  into `responsables`(`responsableId`,`usuarioId`,`nombre`) values (9,9,'Fernando Lázaro');
insert  into `responsables`(`responsableId`,`usuarioId`,`nombre`) values (10,10,'André Martínez');
insert  into `responsables`(`responsableId`,`usuarioId`,`nombre`) values (11,11,'Patrice Guerra');
insert  into `responsables`(`responsableId`,`usuarioId`,`nombre`) values (12,12,'Jorge Luis Uzcátegui');
insert  into `responsables`(`responsableId`,`usuarioId`,`nombre`) values (13,13,'Fernando Fernandez');
insert  into `responsables`(`responsableId`,`usuarioId`,`nombre`) values (14,14,'Vassil Gueorguiev Hristov Georgiev');
insert  into `responsables`(`responsableId`,`usuarioId`,`nombre`) values (15,15,'Ramses Anguizola');
insert  into `responsables`(`responsableId`,`usuarioId`,`nombre`) values (16,16,'Ramón Almoguera');
insert  into `responsables`(`responsableId`,`usuarioId`,`nombre`) values (21,18,'Nelia Martínez');

/*Table structure for table `tipos_actividades` */

DROP TABLE IF EXISTS `tipos_actividades`;

CREATE TABLE `tipos_actividades` (
  `tipoActividadId` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Identificador único del tipo de actividad',
  `nombre` varchar(255) NOT NULL COMMENT 'Nombre del tipo de actividad',
  `grupoActividadId` int(11) DEFAULT NULL,
  PRIMARY KEY (`tipoActividadId`),
  KEY `tipoa_grupoac` (`grupoActividadId`),
  CONSTRAINT `tipoa_grupoac` FOREIGN KEY (`grupoActividadId`) REFERENCES `grupos_actividades` (`grupoActividadId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Tipos de actividades';

/*Data for the table `tipos_actividades` */

/*Table structure for table `tipos_oferta` */

DROP TABLE IF EXISTS `tipos_oferta`;

CREATE TABLE `tipos_oferta` (
  `tipoOfertaId` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Identificador único del tipo de oferta',
  `nombre` varchar(255) NOT NULL COMMENT 'Nombre del tipo de oferta',
  PRIMARY KEY (`tipoOfertaId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `tipos_oferta` */

/*Table structure for table `tipos_soporte` */

DROP TABLE IF EXISTS `tipos_soporte`;

CREATE TABLE `tipos_soporte` (
  `tipoSoporteId` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Identificador interno del tipo de soporte',
  `nombre` varchar(255) NOT NULL COMMENT 'Nombre del tipo de soporte',
  PRIMARY KEY (`tipoSoporteId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='Tipos de soporte para la oferta';

/*Data for the table `tipos_soporte` */

insert  into `tipos_soporte`(`tipoSoporteId`,`nombre`) values (1,'Documental');
insert  into `tipos_soporte`(`tipoSoporteId`,`nombre`) values (2,'Of. Técnica');
insert  into `tipos_soporte`(`tipoSoporteId`,`nombre`) values (3,'Completo');
insert  into `tipos_soporte`(`tipoSoporteId`,`nombre`) values (4,'Of. Económica');
insert  into `tipos_soporte`(`tipoSoporteId`,`nombre`) values (5,'Of. Eco y Docs');

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
  PRIMARY KEY (`usuarioId`),
  KEY `usuarios_grupos` (`grupoUsuarioId`),
  CONSTRAINT `usuarios_grupos` FOREIGN KEY (`grupoUsuarioId`) REFERENCES `grupos_usuarios` (`grupoUsuarioId`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 COMMENT='Tabla de usuarios. Todos los usuarios pertenecen a un grupo';

/*Data for the table `usuarios` */

insert  into `usuarios`(`usuarioId`,`grupoUsuarioId`,`nombre`,`codigoIdioma`,`login`,`password`,`getKeyTime`,`expKeyTime`,`apiKey`) values (1,1,'Administrador','es','admin','admin','2017-01-31 11:46:20','2017-01-31 16:46:20','i0T6z');
insert  into `usuarios`(`usuarioId`,`grupoUsuarioId`,`nombre`,`codigoIdioma`,`login`,`password`,`getKeyTime`,`expKeyTime`,`apiKey`) values (2,1,'Antonio Martinez','es','a.martinez@gdes.com','1234',NULL,NULL,NULL);
insert  into `usuarios`(`usuarioId`,`grupoUsuarioId`,`nombre`,`codigoIdioma`,`login`,`password`,`getKeyTime`,`expKeyTime`,`apiKey`) values (3,1,'Marceliano Curiel','es','m.curiel@gdes.com','1234',NULL,NULL,NULL);
insert  into `usuarios`(`usuarioId`,`grupoUsuarioId`,`nombre`,`codigoIdioma`,`login`,`password`,`getKeyTime`,`expKeyTime`,`apiKey`) values (4,1,'Antonio Andrés','es','a.andres@gdes.com','1234',NULL,NULL,NULL);
insert  into `usuarios`(`usuarioId`,`grupoUsuarioId`,`nombre`,`codigoIdioma`,`login`,`password`,`getKeyTime`,`expKeyTime`,`apiKey`) values (5,1,'Fernando de Pablo','es','f.pablo@gdes.com','1234',NULL,NULL,NULL);
insert  into `usuarios`(`usuarioId`,`grupoUsuarioId`,`nombre`,`codigoIdioma`,`login`,`password`,`getKeyTime`,`expKeyTime`,`apiKey`) values (6,1,'Jose Tomás Ruiz','es','j.ruiz@gdes.com','1234',NULL,NULL,NULL);
insert  into `usuarios`(`usuarioId`,`grupoUsuarioId`,`nombre`,`codigoIdioma`,`login`,`password`,`getKeyTime`,`expKeyTime`,`apiKey`) values (7,1,'Joan Romeu','es','j.romeu@gdes.com','1234',NULL,NULL,NULL);
insert  into `usuarios`(`usuarioId`,`grupoUsuarioId`,`nombre`,`codigoIdioma`,`login`,`password`,`getKeyTime`,`expKeyTime`,`apiKey`) values (8,1,'Ivan Maqueda','es','i.maqueda@gdes.com','1234',NULL,NULL,NULL);
insert  into `usuarios`(`usuarioId`,`grupoUsuarioId`,`nombre`,`codigoIdioma`,`login`,`password`,`getKeyTime`,`expKeyTime`,`apiKey`) values (9,1,'Fernando Lázaro','es','f.lazaro@gdes.com','1234',NULL,NULL,NULL);
insert  into `usuarios`(`usuarioId`,`grupoUsuarioId`,`nombre`,`codigoIdioma`,`login`,`password`,`getKeyTime`,`expKeyTime`,`apiKey`) values (10,1,'André Martínez','es','an.martinez@gdes.com','1234',NULL,NULL,NULL);
insert  into `usuarios`(`usuarioId`,`grupoUsuarioId`,`nombre`,`codigoIdioma`,`login`,`password`,`getKeyTime`,`expKeyTime`,`apiKey`) values (11,1,'Patrice Guerra','es','p.guerra@gdes.com','1234',NULL,NULL,NULL);
insert  into `usuarios`(`usuarioId`,`grupoUsuarioId`,`nombre`,`codigoIdioma`,`login`,`password`,`getKeyTime`,`expKeyTime`,`apiKey`) values (12,1,'Jorge Luis Uzcátegui','es','j.uzcategui@gdes.com','1234',NULL,NULL,NULL);
insert  into `usuarios`(`usuarioId`,`grupoUsuarioId`,`nombre`,`codigoIdioma`,`login`,`password`,`getKeyTime`,`expKeyTime`,`apiKey`) values (13,1,'Fernando Fernandez','es','f.fernandez@gdes.com','1234',NULL,NULL,NULL);
insert  into `usuarios`(`usuarioId`,`grupoUsuarioId`,`nombre`,`codigoIdioma`,`login`,`password`,`getKeyTime`,`expKeyTime`,`apiKey`) values (14,1,'Vassil Gueorguiev Hristov Georgiev','es','v.hristov@gdes.com','1234',NULL,NULL,NULL);
insert  into `usuarios`(`usuarioId`,`grupoUsuarioId`,`nombre`,`codigoIdioma`,`login`,`password`,`getKeyTime`,`expKeyTime`,`apiKey`) values (15,1,'Ramses Anguizola','es','r.anguizola@gdes.com','1234',NULL,NULL,NULL);
insert  into `usuarios`(`usuarioId`,`grupoUsuarioId`,`nombre`,`codigoIdioma`,`login`,`password`,`getKeyTime`,`expKeyTime`,`apiKey`) values (16,1,'Ramón Almoguera','es','r.almoguera_ext@gdes.com','1234',NULL,NULL,NULL);
insert  into `usuarios`(`usuarioId`,`grupoUsuarioId`,`nombre`,`codigoIdioma`,`login`,`password`,`getKeyTime`,`expKeyTime`,`apiKey`) values (18,1,'Nelia Martínez','es','n.martinez@gdes.com','1234',NULL,NULL,NULL);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;