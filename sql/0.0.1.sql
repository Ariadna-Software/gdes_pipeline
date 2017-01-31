ALTER TABLE `gdes_pipeline`.`usuarios`   
  ADD COLUMN `login` VARCHAR(255) NULL COMMENT 'Login con el que se presenta el usuario' AFTER `codigoIdioma`,
  ADD COLUMN `password` VARCHAR(255) NULL COMMENT 'Contraseña del usuario (por el moento en texto plano, luego será codificada)' AFTER `login`;
ALTER TABLE `gdes_pipeline`.`usuarios`   
  ADD COLUMN `getKeyTime` DATETIME NULL COMMENT 'Fecha y hora en la que se obtuvo la última clave API' AFTER `password`,
  ADD COLUMN `expKeyTime` DATETIME NULL COMMENT 'Fecha y hora en la que expira la clave API' AFTER `getKeyTime`,
  ADD COLUMN `apiKey` VARCHAR(255) NULL COMMENT 'Clave API utilizada para identificar al usuario en las llamadas' AFTER `expKeyTime`;  
ALTER TABLE `gdes_pipeline`.`responsables`   
  CHANGE `userId` `usuarioId` INT(11) NULL COMMENT 'Usuario relacionado';
ALTER TABLE `gdes_pipeline`.`tipos_actividades`   
  DROP COLUMN `grupoActividadId`, 
  DROP INDEX `tipos_actividades_grupos`,
  DROP FOREIGN KEY `tipos_actividades_grupos`;
ALTER TABLE `gdes_pipeline`.`grupos_actividades`   
  CHANGE `grupoActividadId` `grupoActividadId` INT(11) NOT NULL AUTO_INCREMENT COMMENT 'Identificador único del grupo de actividad';
ALTER TABLE `gdes_pipeline`.`tipos_actividades`   
  ADD COLUMN `grupoActividadId` INT(11) NULL AFTER `nombre`,
  ADD CONSTRAINT `tipoa_grupoac` FOREIGN KEY (`grupoActividadId`) REFERENCES `gdes_pipeline`.`grupos_actividades`(`grupoActividadId`);
  
    
  