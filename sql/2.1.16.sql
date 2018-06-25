ALTER TABLE `versiones`   
  ADD COLUMN `observaciones` TEXT NULL AFTER `numVersion`;
ALTER TABLE `versiones`   
  ADD COLUMN `fechaEntrega` DATE NULL AFTER `observaciones`;
