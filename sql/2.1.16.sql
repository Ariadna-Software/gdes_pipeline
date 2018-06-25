ALTER TABLE `versiones`   
  ADD COLUMN `observaciones` TEXT NULL AFTER `numVersion`;
ALTER TABLE `versiones`   
  ADD COLUMN `fechaEntrega` DATE NULL AFTER `observaciones`;

DELETE FROM versiones;
INSERT INTO versiones (`ofertaId`,`fechaCambio`,`usuarioId`,`importePresupuesto`,`importePresupuestoDivisa`,`importeUTE`,`importeUTEDivisa`,`importeTotal`,`importeTotalDivisa`,`margenContribucion`,`importeContribucion`,`importeContribucionDivisa`,`importeAnual`,`importeAnualDivisa`,`importePrimerAno`,`importePrimerAnoDivisa`,`importeInversion`,`importeInversionDivisa`,`divisaId`,`multiplicador`,`fechaDivisa`,`numVersion`,`observaciones`,`fechaEntrega`)
SELECT 
`ofertaId`, fechaCreacion, `usuarioId`,`importePresupuesto`,`importePresupuestoDivisa`,`importeUTE`,`importeUTEDivisa`,`importeTotal`,`importeTotalDivisa`,`margenContribucion`,`importeContribucion`,`importeContribucionDivisa`,`importeAnual`,`importeAnualDivisa`,`importePrimerAno`,`importePrimerAnoDivisa`,`importeInversion`,`importeInversionDivisa`,`divisaId`,`multiplicador`,`fechaDivisa`, 0,'AUTO',`fechaEntrega`
FROM ofertas;
