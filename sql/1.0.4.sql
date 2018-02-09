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


CREATE TABLE `servicios`(  
  `servicioId` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255),
  PRIMARY KEY (`servicioId`)
);

CREATE TABLE `gdes_pipeline`.`fases_oferta`(  
  `faseOfertaId` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255),
  PRIMARY KEY (`faseOfertaId`)
);



