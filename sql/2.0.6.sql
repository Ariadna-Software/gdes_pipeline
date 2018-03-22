# --------- 
DELETE FROM ofertas WHERE NOT faseOfertaId IS NULL;
DELETE FROM fases_oferta;
INSERT INTO fases_oferta (faseOfertaId, nombre)
SELECT tipoOfertaId, nombre FROM tipos_oferta;
UPDATE fases_oferta SET faseOfertaId = 0 WHERE nombre = 'Oferta';
UPDATE ofertas SET faseOfertaId = tipoOfertaId;
#-------------------------
DELETE FROM ofertas WHERE NOT tipoOportunidadId IS NULL;
DELETE FROM tipos_oportunidad;
INSERT INTO tipos_oportunidad (tipoOportunidadId, nombre)
SELECT tipoSoporteId, nombre FROM tipos_soporte;
UPDATE ofertas SET tipoOportunidadId = tipoSoporteId;
# ------------------------------
CREATE TABLE `seguidores`(  
  `seguidorId` INT(11) NOT NULL AUTO_INCREMENT,
  `ofertaId` INT(11),
  `usuarioId` INT(11),
  PRIMARY KEY (`seguidorId`),
  CONSTRAINT `ref_seguidor_oferta` FOREIGN KEY (`ofertaId`) REFERENCES `ofertas`(`ofertaId`),
  CONSTRAINT `ref_seguidor_usuario` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios`(`usuarioId`)
);
ALTER TABLE `seguidores`   
  ADD  UNIQUE INDEX `idx_oferta_seguidor` (`ofertaId`, `usuarioId`);