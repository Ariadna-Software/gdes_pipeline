UPDATE ofertas
SET importeTotal = importePresupuesto, importeTotalDivisa = importePresupuestoDivisa;

DELETE FROM estados WHERE estadoId IN (8,9);
UPDATE estados SET nombre = 'ABIERTA' WHERE estadoId = 1;
UPDATE ofertas SET estadoId = 1 WHERE estadoId = 2;
UPDATE estados SET nombre = 'GANADA' WHERE estadoId = 2;
UPDATE ofertas SET estadoId = 2 WHERE estadoId = 4;
DELETE FROM estados WHERE estadoId = 4;
UPDATE ofertas SET estadoId = 3 WHERE estadoId = 7;
DELETE FROM estados WHERE estadoId = 7;
UPDATE ofertas SET estadoId = 5 WHERE estadoId = 6;
DELETE FROM estados WHERE estadoId = 6;

UPDATE `estados` SET `orden` = '4' WHERE `estadoId` = '3'; 
UPDATE `estados` SET `orden` = '3' WHERE `estadoId` = '5'; 