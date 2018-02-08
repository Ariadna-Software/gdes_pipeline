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

CREATE TABLE `ubicaciones`(  
  `ubicacionId` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255),
  PRIMARY KEY (`ubicacionId`)
);

CREATE TABLE `tipos_oportunidad`(  
  `tipoOportunidadId` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255),
  PRIMARY KEY (`tipoOportunidadId`)
);


