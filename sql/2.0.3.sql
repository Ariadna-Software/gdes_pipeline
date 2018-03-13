ALTER TABLE `ofertas`   
  ADD COLUMN `importeTotal` DECIMAL(12,2) NULL AFTER `sinergias`,
  ADD COLUMN `importeTotalDivisa` DECIMAL(12,2) NULL AFTER `importeTotal`;

UPDATE ofertas SET probabilidad = 0;

ALTER TABLE `ofertas` CHANGE `probabilidad` `probabilidad` DECIMAL(4,2) NULL; 