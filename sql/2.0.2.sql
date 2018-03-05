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
