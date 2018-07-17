SELECT usuarioId AS userId, nombre AS userName FROM usuarios; -- users
SELECT areaId, nombre AS areaName FROM areas; -- areas
SELECT unidadNegocioId AS businessUnitId, nombre AS businessUnitName FROM unidades_negocio; -- business_units
SELECT servicioId AS serviceId, nombre AS serviceName FROM servicios; -- services
SELECT faseOfertaId AS dealStageId, nombre AS dealStageName FROM fases_oferta; -- deal_stages
SELECT tipoOportunidadId AS offerTypeId, nombre AS offerTypeName FROM tipos_oportunidad; -- offer_types
SELECT tipoContratoId AS contractTypeId, nombreEN AS contractTypeName FROM tipos_contrato; -- contract_types
SELECT estadoId AS statusId, nombre AS statusName FROM estados; -- status
SELECT razonPerdidaId AS reasonLostId, nombre AS reasonLostName FROM razon_perdida; -- reason_lost
SELECT divisaId AS currencyId, nombre AS currencyName FROM divisas; -- currencies
SELECT paisId AS countryId, nombre AS countryName, codPais AS countryCode FROM paises; -- countries