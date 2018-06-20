CREATE TABLE `parametros`(  
  `valorInicialAno` INT(11),
  `anoEnCurso` INT(11),
  `valorActualAno` INT(11)
);
INSERT INTO `parametros` (`valorInicialAno`, `anoEnCurso`, `valorActualAno`) VALUES ('0', '0', '0'); 
ALTER TABLE `parametros` ADD COLUMN `parametrosId` INT(11) NOT NULL AFTER `valorActualAno`, ADD PRIMARY KEY (`parametrosId`); 

ALTER TABLE `areas`   
  ADD COLUMN `cod` VARCHAR(255) NULL AFTER `orden`;

ALTER TABLE `empresas`   
  ADD COLUMN `cod` VARCHAR(255) NULL AFTER `paisId`;
