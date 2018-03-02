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


ALTER TABLE `servicios`   
  ADD COLUMN `areaId` INT(11) NULL AFTER `nombre`,
  ADD CONSTRAINT `ref_servicio_area` FOREIGN KEY (`areaId`) REFERENCES `areas`(`areaId`);

  
ALTER TABLE `ofertas`   
  ADD COLUMN `servicioId` INT(11) NULL AFTER `unidadNegocioId`,
  ADD CONSTRAINT `oft_servicio` FOREIGN KEY (`servicioId`) REFERENCES `servicios`(`servicioId`);

ALTER TABLE `ofertas`   
  ADD COLUMN `fechaCreacion` DATE NULL AFTER `servicioId`;

ALTER TABLE `ofertas`   
  ADD COLUMN `fechaAdjudicacion` DATE NULL AFTER `fechaCreacion`,
  ADD COLUMN `fechaInicioContrato` DATE NULL AFTER `fechaAdjudicacion`,
  ADD COLUMN `fechaFinContrato` DATE NULL AFTER `fechaInicioContrato`;
