ALTER TABLE `unidades_negocio`   
  ADD COLUMN `nombreEN` VARCHAR(255) NULL AFTER `nombre`,
  ADD COLUMN `nombreFR` VARCHAR(255) NULL AFTER `nombreEN`;

ALTER TABLE `areas`   
  ADD COLUMN `nombreEN` VARCHAR(255) NULL AFTER `nombre`,
  ADD COLUMN `nombreFR` VARCHAR(255) NULL AFTER `nombreEN`;

ALTER TABLE `estados`   
  ADD COLUMN `nombreEN` VARCHAR(255) NULL AFTER `nombre`,
  ADD COLUMN `nombreFR` VARCHAR(255) NULL AFTER `nombreEN`;  

ALTER TABLE `razon_perdida`   
  ADD COLUMN `nombreEN` VARCHAR(255) NULL AFTER `nombre`,
  ADD COLUMN `nombreFR` VARCHAR(255) NULL AFTER `nombreEN`;

ALTER TABLE `servicios`   
  ADD COLUMN `nombreEN` VARCHAR(255) NULL AFTER `nombre`,
  ADD COLUMN `nombreFR` VARCHAR(255) NULL AFTER `nombreEN`;

ALTER TABLE `fases_oferta`   
  ADD COLUMN `nombreEN` VARCHAR(255) NULL AFTER `nombre`,
  ADD COLUMN `nombreFR` VARCHAR(255) NULL AFTER `nombreEN`;

ALTER TABLE `tipos_oportunidad`   
  ADD COLUMN `nombreEN` VARCHAR(255) NULL AFTER `nombre`,
  ADD COLUMN `nombreFR` VARCHAR(255) NULL AFTER `nombreEN`;

ALTER TABLE `tipos_contrato`   
  ADD COLUMN `nombreEN` VARCHAR(255) NULL AFTER `nombre`,
  ADD COLUMN `nombreFR` VARCHAR(255) NULL AFTER `nombreEN`;

UPDATE unidades_negocio SET nombreEN = nombre, nombreFR = nombre;
UPDATE areas SET nombreEN = nombre, nombreFR = nombre;
UPDATE estados SET nombreEN = nombre, nombreFR = nombre;
UPDATE razon_perdida SET nombreEN = nombre, nombreFR = nombre;
UPDATE servicios SET nombreEN = nombre, nombreFR = nombre;
UPDATE fases_oferta SET nombreEN = nombre, nombreFR = nombre;
UPDATE tipos_oportunidad SET nombreEN = nombre, nombreFR = nombre;
UPDATE tipos_contrato SET nombreEN = nombre, nombreFR = nombre;

UPDATE `gdes_pipeline_test`.`estados` SET `nombreEN` = 'OPEN' , `nombreFR` = 'OUVERTE' WHERE `estadoId` = '1'; 
UPDATE `gdes_pipeline_test`.`estados` SET `nombreEN` = 'WON' , `nombreFR` = 'GAGNÉ' WHERE `estadoId` = '2'; 
UPDATE `gdes_pipeline_test`.`estados` SET `nombreEN` = 'NOT PURSUED' , `nombreFR` = 'NON PREÉSENTÉ' WHERE `estadoId` = '3'; 
UPDATE `gdes_pipeline_test`.`estados` SET `nombreEN` = 'LOST' , `nombreFR` = 'PERDUE' WHERE `estadoId` = '5';
