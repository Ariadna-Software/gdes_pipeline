ALTER TABLE `ofertas`   
  ADD COLUMN `tipoOferta` INT(11) DEFAULT 0 NULL AFTER `anexos`;
  
 UPDATE ofertas SET tipoOferta = 0;