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