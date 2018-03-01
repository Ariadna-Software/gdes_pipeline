ALTER TABLE `ofertas`   
  ADD COLUMN `ubicacion` VARCHAR(255) NULL AFTER `nombreCorto`;

ALTER TABLE `ofertas`   
  ADD COLUMN `paisUbicacion` VARCHAR(255) NULL AFTER `ubicacion`;

CREATE TABLE `unidades_negocio`(  
  `unidadNegocioId` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255),
  PRIMARY KEY (`unidadNegocioId`)
);

ALTER TABLE `ofertas`   
  ADD COLUMN `unidadNegocioId` INT(11) NULL AFTER `paisUbicacion`,
  ADD CONSTRAINT `oft_unidad_negocio` FOREIGN KEY (`unidadNegocioId`) REFERENCES `unidades_negocio`(`unidadNegocioId`);