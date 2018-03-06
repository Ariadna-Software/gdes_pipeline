ALTER TABLE `ofertas`   
  ADD COLUMN `duracion` VARCHAR(255) NULL AFTER `fechaFinContrato`;

ALTER TABLE `ofertas`   
  ADD COLUMN `probabilidad` VARCHAR(255) NULL AFTER `duracion`;

ALTER TABLE `ofertas`   
  ADD COLUMN `notasPlanning` TEXT NULL AFTER `probabilidad`;

ALTER TABLE `ofertas`   
  ADD COLUMN `faseOfertaId` INT(11) NULL AFTER `notasPlanning`,
  ADD CONSTRAINT `oft_fase_oferta` FOREIGN KEY (`faseOfertaId`) REFERENCES `fases_oferta`(`faseOfertaId`);

ALTER TABLE `ofertas`   
  ADD COLUMN `tipoOportunidadId` INT(11) NULL AFTER `faseOfertaId`,
  ADD CONSTRAINT `oft_tipos_oportunidad` FOREIGN KEY (`tipoOportunidadId`) REFERENCES `tipos_oportunidad`(`tipoOportunidadId`);

CREATE TABLE `tipos_contrato`(  
  `tipoContratoId` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255),
  PRIMARY KEY (`tipoContratoId`)
);

ALTER TABLE `ofertas`   
  ADD COLUMN `tipoContratoId` INT(11) NULL AFTER `tipoOportunidadId`,
  ADD CONSTRAINT `oft_tipo_contrato` FOREIGN KEY (`tipoContratoId`) REFERENCES `tipos_contrato`(`tipoContratoId`);

CREATE TABLE `razon_perdida`(  
  `razonPerdidaId` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255),
  PRIMARY KEY (`razonPerdidaId`)
);

ALTER TABLE `ofertas`   
  ADD COLUMN `razonPerdidaId` INT NULL AFTER `tipoContratoId`,
  ADD CONSTRAINT `oft_razon_perdida` FOREIGN KEY (`razonPerdidaId`) REFERENCES `razon_perdida`(`razonPerdidaId`);

ALTER TABLE `ofertas`   
  ADD COLUMN `notasEstado` TEXT NULL AFTER `razonPerdidaId`;

ALTER TABLE `ofertas`   
  ADD COLUMN `codigoOferta` VARCHAR(255) NULL AFTER `notasEstado`;

ALTER TABLE `ofertas`   
  ADD COLUMN `subrogacionSN` BOOLEAN NULL AFTER `codigoOferta`;

ALTER TABLE `ofertas`   
  ADD COLUMN `subrogacionTXT` TEXT NULL AFTER `subrogacionSN`;

ALTER TABLE `ofertas`   
  ADD COLUMN `subrogacionNum` INT(11) NULL AFTER `subrogacionTXT`;

ALTER TABLE `ofertas`   
  ADD COLUMN `uteSN` BOOL NULL AFTER `subrogacionNum`;

ALTER TABLE `ofertas`   
  ADD COLUMN `uteTXT` TEXT NULL AFTER `uteSN`;

ALTER TABLE `ofertas`   
  ADD COLUMN `gdesPor` DECIMAL(4,2) NULL AFTER `uteTXT`;

ALTER TABLE `ofertas`   
  ADD COLUMN `subcontrataSN` BOOLEAN NULL AFTER `gdesPor`;

ALTER TABLE `ofertas`   
  ADD COLUMN `subcontrataTXT` TEXT NULL AFTER `subcontrataSN`;

ALTER TABLE `ofertas`   
  ADD COLUMN `importeUTE` DECIMAL(12,2) NULL AFTER `subcontrataTXT`,
  ADD COLUMN `importeUTEDivisa` DECIMAL(12,2) NULL AFTER `importeUTE`;

ALTER TABLE `ofertas`   
  ADD COLUMN `importeContribucionDivisa` DECIMAL(12,2) NULL AFTER `importeUTEDivisa`;

ALTER TABLE `ofertas`   
  ADD COLUMN `importeAnual` DECIMAL(12,2) NULL AFTER `importeContribucionDivisa`,
  ADD COLUMN `importeAnualDivisa` DECIMAL(12,2) NULL AFTER `importeAnual`;

ALTER TABLE `ofertas`   
  ADD COLUMN `importePrimerAno` DECIMAL(12,2) NULL AFTER `importeAnualDivisa`,
  ADD COLUMN `importePrimerAnoDivisa` DECIMAL(12,2) NULL AFTER `importePrimerAno`;

ALTER TABLE `ofertas`   
  ADD COLUMN `descripcionInversion` TEXT NULL AFTER `importePrimerAnoDivisa`;
  
ALTER TABLE `ofertas`   
  ADD COLUMN `condicionesPago` TEXT NULL AFTER `descripcionInversion`;

ALTER TABLE `ofertas`   
  ADD COLUMN `consideracionesEconomicas` TEXT NULL AFTER `condicionesPago`;

ALTER TABLE `ofertas`   
  ADD COLUMN `alcance` TEXT NULL AFTER `consideracionesEconomicas`;

ALTER TABLE `ofertas`   
  ADD COLUMN `requerimientos` TEXT NULL AFTER `alcance`;

ALTER TABLE `ofertas`   
  ADD COLUMN `puntosRelevantes` TEXT NULL AFTER `requerimientos`;


