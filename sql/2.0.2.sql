ALTER TABLE `ofertas`   
  ADD COLUMN `duracion` VARCHAR(255) NULL AFTER `fechaFinContrato`;

ALTER TABLE `ofertas`   
  ADD COLUMN `probabilidad` VARCHAR(255) NULL AFTER `duracion`;

ALTER TABLE `ofertas`   
  ADD COLUMN `notasPlanning` TEXT NULL AFTER `probabilidad`;

ALTER TABLE `ofertas`   
  ADD COLUMN `faseOfertaId` INT(11) NULL AFTER `notasPlanning`,
  ADD CONSTRAINT `oft_fase_oferta` FOREIGN KEY (`faseOfertaId`) REFERENCES `fases_oferta`(`faseOfertaId`);
