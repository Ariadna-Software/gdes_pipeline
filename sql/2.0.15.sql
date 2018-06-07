ALTER TABLE `seguidores` DROP FOREIGN KEY `ref_seguidor_oferta`;

ALTER TABLE `seguidores` ADD CONSTRAINT `ref_seguidor_oferta` FOREIGN KEY (`ofertaId`) REFERENCES `ofertas`(`ofertaId`) ON DELETE CASCADE;


ALTER TABLE `ofertas`   
  ADD COLUMN `documentosEspeciales` TEXT NULL AFTER `servicioId3`;
