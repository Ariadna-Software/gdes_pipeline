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

UPDATE `estados` SET `nombreEN` = 'OPEN' , `nombreFR` = 'OUVERTE' WHERE `estadoId` = '1'; 
UPDATE `estados` SET `nombreEN` = 'WON' , `nombreFR` = 'GAGNÉ' WHERE `estadoId` = '2'; 
UPDATE `estados` SET `nombreEN` = 'NOT PURSUED' , `nombreFR` = 'NON PREÉSENTÉ' WHERE `estadoId` = '3'; 
UPDATE `estados` SET `nombreEN` = 'LOST' , `nombreFR` = 'PERDUE' WHERE `estadoId` = '5';

ALTER TABLE `usuarios`   
  ADD COLUMN `responsableId` INT(11) NULL AFTER `verOfertasGrupo`,
  ADD CONSTRAINT `usuarios_responsables` FOREIGN KEY (`responsableId`) REFERENCES ``usuarios`(`usuarioId`);

ALTER TABLE `ofertas`  
  DROP FOREIGN KEY `oft_responsable`;


UPDATE ofertas AS o,
(SELECT r.responsableId, r.nombre, u.usuarioId, u.nombre AS n2 FROM
responsables AS r
LEFT JOIN usuarios AS u ON u.nombre = r.nombre) AS x1
SET o.responsableId = x1.usuarioId
WHERE o.responsableId = x1.responsableId;

ALTER TABLE `ofertas`  
  ADD CONSTRAINT `oft_responsable` FOREIGN KEY (`responsableId`) REFERENCES `usuarios`(`usuarioId`);

ALTER TABLE `ofertas`   
  ADD COLUMN `usuarioId` INT(11) NULL AFTER `importeTotalDivisa`,
  ADD CONSTRAINT `oft_usuario` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios`(`usuarioId`);

ALTER TABLE `usuarios`   
  DROP COLUMN `centroId`, 
  DROP INDEX `usuarios_centros`,
  DROP FOREIGN KEY `usuarios_centros`;

ALTER TABLE `usuarios`   
  ADD COLUMN `ubicacion` VARCHAR(255) NULL AFTER `responsableId`,
  ADD COLUMN `unidadNegocioId` INT(11) NULL AFTER `ubicacion`,
  ADD CONSTRAINT `usuarios_unidades_negocio` FOREIGN KEY (`unidadNegocioId`) REFERENCES `unidades_negocio`(`unidadNegocioId`);

ALTER TABLE `empresas`   
  ADD COLUMN `paisId` INT(11) NULL AFTER `nombre`,
  ADD CONSTRAINT `empresa_pias` FOREIGN KEY (`paisId`) REFERENCES `paises`(`paisId`);

ALTER TABLE `areas`   
  ADD COLUMN `unidadNegocioId` INT(11) NULL AFTER `nombreFR`,
  ADD CONSTRAINT `area_unidadnegocio` FOREIGN KEY (`unidadNegocioId`) REFERENCES `unidades_negocio`(`unidadNegocioId`);

ALTER TABLE `ofertas`   
  ADD COLUMN `actividadesRealizadas` TEXT NULL AFTER `usuarioId`,
  ADD COLUMN `actividadesPlanificadas` TEXT NULL AFTER `actividadesRealizadas`,
  ADD COLUMN `situacionProyecto` TEXT NULL AFTER `actividadesPlanificadas`,
  ADD COLUMN `importeReclamacion1` DECIMAL(12,2) NULL AFTER `situacionProyecto`,
  ADD COLUMN `importeReclamacion2` DECIMAL(12,2) NULL AFTER `importeReclamacion1`,
  ADD COLUMN `importeReclamacion3` DECIMAL(12,2) NULL AFTER `importeReclamacion2`,
  ADD COLUMN `importeReclamacion4` DECIMAL(12,2) NULL AFTER `importeReclamacion3`,
  ADD COLUMN `razonReclamacion1` TEXT NULL AFTER `importeReclamacion4`,
  ADD COLUMN `razonReclamacion2` TEXT NULL AFTER `razonReclamacion1`,
  ADD COLUMN `razonReclamacion3` TEXT NULL AFTER `razonReclamacion2`,
  ADD COLUMN `razonReclamacion4` TEXT NULL AFTER `razonReclamacion3`;
