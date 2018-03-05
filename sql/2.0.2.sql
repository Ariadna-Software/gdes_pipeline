ALTER TABLE `ofertas`   
  ADD COLUMN `duracion` VARCHAR(255) NULL AFTER `fechaFinContrato`;

ALTER TABLE `ofertas`   
  ADD COLUMN `probabilidad` VARCHAR(255) NULL AFTER `duracion`;

ALTER TABLE `ofertas`   
  ADD COLUMN `notasPlanning` TEXT NULL AFTER `probabilidad`;