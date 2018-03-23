CREATE TABLE `versiones`(  
  `versionId` INT(11) NOT NULL AUTO_INCREMENT,
  `ofertaId` INT(11),
  `fechaCambio` DATE,
  `usuarioId` INT(11),
  `importePresupuesto` DECIMAL(12,2),
  `importePresupuestoDivisa` DECIMAL(12,2),
  `importeUTE` DECIMAL(12,2),
  `importeUTEDivisa` DECIMAL(12,2),
  `importeTotal` DECIMAL(12,2),
  `importeTotalDivisa` DECIMAL(12,2),
  `margenContribucion` DECIMAL(5,2),
  `importeContribucion` DECIMAL(12,2),
  `importeContribucionDivisa` DECIMAL(12,2),
  `importeAnual` DECIMAL(12,2),
  `importeAnualDivisa` DECIMAL(12,2),
  `importePrimerAno` DECIMAL(12,2),
  `importePrimerAnoDivisa` DECIMAL(12,2),
  `importeInversion` DECIMAL(12,2),
  `importeInversionDivisa` DECIMAL(12,2),
  `divisaId` INT,
  `multiplicador` DECIMAL(10,2),
  `fechaDivisa` DATE,
  PRIMARY KEY (`versionId`),
  CONSTRAINT `ref_version_oferta` FOREIGN KEY (`ofertaId`) REFERENCES `gdespa_test`.`faccarga2`(`invoiceId`)
);

ALTER TABLE `versiones`  
  ADD CONSTRAINT `ref_version_oferta` FOREIGN KEY (`ofertaId`) REFERENCES `ofertas`(`ofertaId`),
  ADD CONSTRAINT `ref_version_usuario` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios`(`usuarioId`),
  ADD CONSTRAINT `ref_version_divisa` FOREIGN KEY (`divisaId`) REFERENCES `divisas`(`divisaId`);

ALTER TABLE `versiones`   
  ADD COLUMN `numVerison` INT(11) NULL AFTER `fechaDivisa`;
ALTER TABLE `versiones`   
  CHANGE `numVerison` `numVersion` INT(11) NULL;

UPDATE ofertas SET `version` = 0;
