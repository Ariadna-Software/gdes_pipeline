CREATE TABLE `directores_area`(  
  `directorId` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255),
  PRIMARY KEY (`directorId`)
);

CREATE TABLE `tipos_proyecto`(  
  `tipoProyectoId` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255),
  PRIMARY KEY (`tipoProyectoId`)
);

