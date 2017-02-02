ALTER TABLE `gdes_pipeline`.`ofertas`   
  ADD COLUMN `ofertaSingular` BOOL DEFAULT FALSE NULL COMMENT 'Caracteriza esta oferta como singular' AFTER `tipoOfertaId`;
ALTER TABLE `gdes_pipeline`.`usuarios`   
  ADD COLUMN `verOfertasGrupo` BOOL DEFAULT FALSE NULL COMMENT 'Indica si el usuario puede ver ofertas de otros responsables pretenecientes a su grupo' AFTER `esAdministrador`;
  