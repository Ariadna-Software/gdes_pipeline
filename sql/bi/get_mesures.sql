# Bi
SELECT * FROM ofertas;
# SQL to get the mesaures from pipeline_db
SELECT 
ofertaId AS offerID,
numeroOferta AS offerNumber,
fechaCreacion AS offerCreationDate,
fechaOferta AS offerDate,
fechaUltimoEstado AS offerLastUpdateDate
FROM ofertas;