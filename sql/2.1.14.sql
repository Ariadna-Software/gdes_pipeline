ALTER TABLE `parametros`   
  ADD COLUMN `docAppSpain` TEXT NULL AFTER `parametrosId`,
  ADD COLUMN `docAppUk` TEXT NULL AFTER `docAppSpain`,
  ADD COLUMN `docAppFrance` TEXT NULL AFTER `docAppUk`;