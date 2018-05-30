ALTER TABLE `gdes_pipeline_test`.`seguidores` DROP FOREIGN KEY `ref_seguidor_oferta`;

ALTER TABLE `gdes_pipeline_test`.`seguidores` ADD CONSTRAINT `ref_seguidor_oferta` FOREIGN KEY (`ofertaId`) REFERENCES `gdes_pipeline_test`.`ofertas`(`ofertaId`) ON DELETE CASCADE;
