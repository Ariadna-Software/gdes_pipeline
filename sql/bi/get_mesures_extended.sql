SELECT 
ofertaId AS offerID, numeroOferta AS offerNumber, codigoOferta AS offerCode, fechaCreacion AS offerCreationDate, fechaOferta AS offerDate,
fechaUltimoEstado AS offerLastUpdateDate, descripcion AS offerDescription,
ofertas.paisId AS countryId, p.codPais AS countryName,
nombreCorto AS offerShortName, cliente AS offerClient, ofertas.ubicacion AS offerLocation, periodo AS offerPeriod, numeroLicitacion AS offerTenderNumber,
paisUbicacion AS offerCountryLocation, fechaEntrega AS offerDeliveryDate, fechaAdjudicacion AS offerAwardDate, fechaInicioContrato AS offerContractStartDate,
fechaFinContrato AS offerContractEndDate, duracion AS offerDuration, notasPlanning AS offerPlaningNotes, 
ofertas.usuarioId AS userId, u.nombre AS userName,
ofertas.areaId AS areaId, a.nombre AS areaName,
ofertas.unidadNegocioId AS businessUnitId, un.nombre AS businessUnitName,
ofertas.responsableId AS reponsableId, u2.nombre AS responsableName,
ofertas.servicioId AS serviceId, s1.nombre AS service1Name,
ofertas.servicioId2 AS serviceId2, s2.nombre AS serviceName2,
ofertas.servicioId3 AS serviceId3, s3.nombre AS serviceName3,
ofertas.faseOfertaId AS dealStageId, fo.nombre AS dealStageName,
ofertas.tipoOportunidadId AS offerTypeId, top.nombre AS offerTypeName,
ofertas.tipoContratoId AS contractTypeId, tc.nombre AS contractTypeName,
probabilidad AS estimatedProbability,
ofertaSingular AS singularDeal,
subrogacionSN AS tupe,
subrogacionNum AS tupeQuantity,
uteSN AS joinVenture,
gdesPor AS joinVenturePrecentage,
subcontrataSN AS recruitment,
ofertas.estadoId AS statusId, st.nombre AS statusName,
ofertas.razonPerdidaId AS reasonLostId, rp.nombre AS reasonLostName,
numeroPedido AS orderNumber,
importePresupuesto AS gdesRevenue,
importeUTE AS partnerRevenue,
importeTotal AS totalRevenue,
margenContribucion AS contributionMargin,
importeContribucion  AS margin,
importeAnual AS yearlyRevenue,
importePrimerAno AS currentYearRevenue,
importeInversion AS investmentValue,
ofertas.divisaId AS currencyId, d.nombre AS currencyName,
multiplicador AS factor
FROM ofertas
LEFT JOIN paises AS p ON p.paisId = ofertas.paisId -- Countries
LEFT JOIN usuarios AS u ON u.usuarioId = ofertas.usuarioId -- Users
LEFT JOIN areas AS a ON a.areaId = ofertas.areaId -- Areas
LEFT JOIN unidades_negocio AS un ON un.unidadNegocioId = ofertas.unidadNegocioId -- Business Units
LEFT JOIN usuarios AS u2 ON u2.usuarioId = ofertas.responsableId -- Offer responsible
LEFT JOIN servicios AS s1 ON s1.servicioId = ofertas.servicioId -- First related service
LEFT JOIN servicios AS s2 ON s2.servicioId = ofertas.servicioId2 -- Second related service
LEFT JOIN servicios AS s3 ON s3.servicioId = ofertas.servicioId3 -- Third related service
LEFT JOIN fases_oferta AS fo ON fo.faseOfertaId = ofertas.faseOfertaId -- Deal stages
LEFT JOIN tipos_oportunidad AS top ON top.tipoOportunidadId = ofertas.tipoOportunidadId -- Offers type
LEFT JOIN tipos_contrato AS tc ON tc.tipoContratoId = ofertas.tipoContratoId -- Contract type
LEFT JOIN estados AS st ON st.estadoId = ofertas.estadoId -- Status
LEFT JOIN razon_perdida AS rp ON rp.razonPerdidaId = ofertas.razonPerdidaId -- Reason to lost
LEFT JOIN divisas AS d ON d.divisaId = ofertas.divisaId -- Currencies


