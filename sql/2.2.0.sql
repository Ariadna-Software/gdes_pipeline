CREATE TABLE `servicios_areas`(  
  `servicioAreaId` INT(11) NOT NULL AUTO_INCREMENT,
  `servicioId` INT(11),
  `areaId` INT(11),
  PRIMARY KEY (`servicioAreaId`),
  CONSTRAINT `ser_area_ser` FOREIGN KEY (`servicioId`) REFERENCES `servicios`(`servicioId`),
  CONSTRAINT `ser_area_area` FOREIGN KEY (`areaId`) REFERENCES `areas`(`areaId`)
);

INSERT INTO servicios_areas (servicioId, areaId)
SELECT servicioId, areaId FROM servicios
WHERE NOT areaId IS NULL;