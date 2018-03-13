ALTER TABLE `ofertas`   
  ADD COLUMN `importeTotal` DECIMAL(12,2) NULL AFTER `sinergias`,
  ADD COLUMN `importeTotalDivisa` DECIMAL(12,2) NULL AFTER `importeTotal`;