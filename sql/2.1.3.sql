ALTER TABLE `usuarios`   
  ADD COLUMN `emailAzure` VARCHAR(255) NULL AFTER `unidadNegocioId`;

UPDATE usuarios 
SET emailAzure = CONCAT(SUBSTR(login, 1, INSTR(login,'@') - 1), '@grupodominguis.onmicrosoft.com');