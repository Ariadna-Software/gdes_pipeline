ALTER TABLE `gdes_pipeline`.`usuarios`   
  ADD COLUMN `login` VARCHAR(255) NULL COMMENT 'Login con el que se presenta el usuario' AFTER `codigoIdioma`,
  ADD COLUMN `password` VARCHAR(255) NULL COMMENT 'Contraseña del usuario (por el moento en texto plano, luego será codificada)' AFTER `login`;
ALTER TABLE `gdes_pipeline`.`usuarios`   
  ADD COLUMN `getKeyTime` DATETIME NULL COMMENT 'Fecha y hora en la que se obtuvo la última clave API' AFTER `password`,
  ADD COLUMN `expKeyTime` DATETIME NULL COMMENT 'Fecha y hora en la que expira la clave API' AFTER `getKeyTime`,
  ADD COLUMN `apiKey` VARCHAR(255) NULL COMMENT 'Clave API utilizada para identificar al usuario en las llamadas' AFTER `expKeyTime`;  
  