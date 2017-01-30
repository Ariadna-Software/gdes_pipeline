﻿/*-------------------------------------------------------------------------- 
facturaDetalle.js
Funciones js par la página FacturaDetalle.html
---------------------------------------------------------------------------*/
var responsiveHelper_dt_basic = undefined;
var responsiveHelper_datatable_fixed_column = undefined;
var responsiveHelper_datatable_col_reorder = undefined;
var responsiveHelper_datatable_tabletools = undefined;

var empId = 0;
var lineaEnEdicion = false;

var dataFacturasLineas;
var dataBases;

var breakpointDefinition = {
    tablet: 1024,
    phone: 480
};

datePickerSpanish(); // see comun.js

function initForm() {
    comprobarLogin();
    // de smart admin
    pageSetUp();
    // 
    getVersionFooter();

    vm = new admData();
    ko.applyBindings(vm);

    // asignación de eventos al clic
    $("#btnAceptar").click(aceptar());
    $("#btnSalir").click(salir());
    $("#frmFactura").submit(function () {
        return false;
    });

    $("#frmLinea").submit(function () {
        return false;
    });

    $("#linea-form").submit(function () {
        return false;
    });

    // select2 things
    $("#cmbEmpresas").select2(select2Spanish());
    loadEmpresas();
    $("#cmbEmpresas").select2().on('change', function (e) {
        //alert(JSON.stringify(e.added));
        cambioEmpresa(e.added);
    });

    // Ahora cliente en autocomplete
    initAutoCliente();

    // select2 things
    $("#cmbFormasPago").select2(select2Spanish());
    loadFormasPago();

    // select2 things
    $("#cmbArticulos").select2(select2Spanish());
    loadArticulos();
    $("#cmbArticulos").select2().on('change', function (e) {
        //alert(JSON.stringify(e.added));
        cambioArticulo(e.added);
    });

    // select2 things
    $("#cmbTiposIva").select2(select2Spanish());
    loadTiposIva();
    $("#cmbTiposIva").select2().on('change', function (e) {
        //alert(JSON.stringify(e.added));
        cambioTiposIva(e.added);
    });


    $("#txtCantidad").blur(cambioPrecioCantidad());
    $("#txtPrecio").blur(cambioPrecioCantidad());

    initTablaFacturasLineas();
    initTablaBases();

    empId = gup('FacturaId');
    if (empId != 0) {
        var data = {
            facturaId: empId
        }
        // hay que buscar ese elemento en concreto
        $.ajax({
            type: "GET",
            url: myconfig.apiUrl + "/api/facturas/" + empId,
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function (data, status) {
                // hay que mostrarlo en la zona de datos
                loadData(data);
                loadLineasFactura(data.facturaId);
                loadBasesFactura(data.facturaId);
            },
                            error: function (err) {
                    mensErrorAjax(err);
                    // si hay algo más que hacer lo haremos aquí.
                }
        });
    } else {
        // se trata de un alta ponemos el id a cero para indicarlo.
        vm.facturaId(0);
    }
}

function admData() {
    var self = this;
    self.facturaId = ko.observable();
    self.ano = ko.observable();
    self.numero = ko.observable();
    self.serie = ko.observable();
    self.fecha = ko.observable();
    self.empresaId = ko.observable();
    self.clienteId = ko.observable();
    self.contratoClienteMantenimientoId = ko.observable();
    //
    self.emisorNif = ko.observable();
    self.emisorNombre = ko.observable();
    self.emisorDireccion = ko.observable();
    self.emisorCodPostal = ko.observable();
    self.emisorPoblacion = ko.observable();
    self.emisorProvincia = ko.observable();
    //
    self.receptorNif = ko.observable();
    self.receptorNombre = ko.observable();
    self.receptorDireccion = ko.observable();
    self.receptorCodPostal = ko.observable();
    self.receptorPoblacion = ko.observable();
    self.receptorProvincia = ko.observable();
    //
    self.total = ko.observable();
    self.totalConIva = ko.observable();
    //
    self.empresaId = ko.observable();
    self.sempresaId = ko.observable();
    //
    self.posiblesEmpresas = ko.observableArray([]);
    self.elegidosEmpresas = ko.observableArray([]);
    //
    self.clienteId = ko.observable();
    self.sclienteId = ko.observable();
    //
    self.posiblesClientes = ko.observableArray([]);
    self.elegidosClientes = ko.observableArray([]);
    //
    self.formaPagoId = ko.observable();
    self.sformaPagoId = ko.observable();
    //
    self.posiblesFormasPago = ko.observableArray([]);
    self.elegidosFormasPago = ko.observableArray([]);
    //
    self.observaciones = ko.observable();

    // -- Valores para las líneas
    self.facturaLineaId = ko.observable();
    self.linea = ko.observable();
    self.articuloId = ko.observable();
    self.tipoIvaId = ko.observable();
    self.porcentaje = ko.observable();
    self.descripcion = ko.observable();
    self.cantidad = ko.observable();
    self.importe = ko.observable();
    self.totalLinea = ko.observable();
    //
    self.sarticuloId = ko.observable();
    //
    self.posiblesArticulos = ko.observableArray([]);
    self.elegidosArticulos = ko.observableArray([]);
    //
    self.stipoIvaId = ko.observable();
    //
    self.posiblesTiposIva = ko.observableArray([]);
    self.elegidosTiposIva = ko.observableArray([]);
    //

}

function loadData(data) {
    vm.facturaId(data.facturaId);
    vm.ano(data.ano);
    vm.numero(data.numero);
    vm.serie(data.serie);
    vm.fecha(spanishDate(data.fecha));
    vm.empresaId(data.empresaId);
    vm.clienteId(data.clienteId);
    vm.contratoClienteMantenimientoId(data.contratoClienteMantenimientoId);
    //
    vm.emisorNif(data.emisorNif);
    vm.emisorNombre(data.emisorNombre);
    vm.emisorCodPostal(data.emisorCodPostal);
    vm.emisorPoblacion(data.emisorPoblacion);
    vm.emisorProvincia(data.emisorProvincia);
    vm.emisorDireccion(data.emisorDireccion);
    //
    vm.receptorNif(data.receptorNif);
    vm.receptorNombre(data.receptorNombre);
    vm.receptorCodPostal(data.receptorCodPostal);
    vm.receptorPoblacion(data.receptorPoblacion);
    vm.receptorProvincia(data.receptorProvincia);
    vm.receptorDireccion(data.receptorDireccion);

    //
    loadEmpresas(data.empresaId);
    cargaCliente(data.clienteId);
    loadFormasPago(data.formaPagoId);
    vm.observaciones(data.observaciones);
}


function datosOK() {
    $('#frmFactura').validate({
        rules: {
            cmbEmpresas: {
                required: true
            },
            cmbClientes: {
                required: true
            },
            txtFecha: {
                required: true
            },
            cmbFormasPago: {
                required: true
            }
        },
        // Messages for form validation
        messages: {
            cmbEmpresas: {
                required: "Debe elegir un emisor"
            },
            cmbClientes: {
                required: 'Debe elegir un receptor'
            },
            txtFecha: {
                required: 'Debe elegir una fecha'
            },
            cmbFormasPago: {
                required: "Debe elegir una forma de pago"
            }
        },
        // Do not change code below
        errorPlacement: function (error, element) {
            error.insertAfter(element.parent());
        }
    });
    var opciones = $("#frmFactura").validate().settings;
    return $('#frmFactura').valid();
}

function aceptar() {
    var mf = function () {
        if (!datosOK())
            return;
        // Antes de dar de alta hay que inicializar valores
        // si es modifcación los valores cambiarán solos
        // ojo!! numeroDbf(n) espera un string.
        if (!vm.total()) {
            vm.total('0');
            vm.totalConIva('0');
        }
        var data = {
            factura: {
                "facturaId": vm.facturaId(),
                "ano": vm.ano(),
                "numero": vm.numero(),
                "serie": vm.serie(),
                "fecha": spanishDbDate(vm.fecha()),
                "empresaId": vm.sempresaId(),
                "clienteId": vm.sclienteId(),
                "contratoClienteMantenimientoId": vm.contratoClienteMantenimientoId(),
                "emisorNif": vm.emisorNif(),
                "emisorNombre": vm.emisorNombre(),
                "emisorDireccion": vm.emisorDireccion(),
                "emisorCodPostal": vm.emisorCodPostal(),
                "emisorPoblacion": vm.emisorPoblacion(),
                "emisorProvincia": vm.emisorProvincia(),
                "receptorNif": vm.receptorNif(),
                "receptorNombre": vm.receptorNombre(),
                "receptorDireccion": vm.receptorDireccion(),
                "receptorCodPostal": vm.receptorCodPostal(),
                "receptorPoblacion": vm.receptorPoblacion(),
                "receptorProvincia": vm.receptorProvincia(),
                "total": numeroDbf(vm.total()),
                "totalConIva": numeroDbf(vm.totalConIva()),
                "formaPagoId": vm.sformaPagoId(),
                "observaciones": vm.observaciones()
            }
        };
        if (empId == 0) {


            $.ajax({
                type: "POST",
                url: myconfig.apiUrl + "/api/facturas",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(data),
                success: function (data, status) {
                    // hay que mostrarlo en la zona de datos
                    loadData(data);
                    // De momento no volvemos al mismo (es alta y hay que introducir líneas)
                    var url = "FacturaDetalle.html?FacturaId=" + vm.facturaId();
                    window.open(url, '_self');
                },
                                error: function (err) {
                    mensErrorAjax(err);
                    // si hay algo más que hacer lo haremos aquí.
                }
            });
        } else {
            $.ajax({
                type: "PUT",
                url: myconfig.apiUrl + "/api/facturas/" + empId,
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(data),
                success: function (data, status) {
                    // hay que mostrarlo en la zona de datos
                    loadData(data);
                    // Nos volvemos al general
                    var url = "FacturaGeneral.html?FacturaId=" + vm.facturaId();
                    window.open(url, '_self');
                },
                                error: function (err) {
                    mensErrorAjax(err);
                    // si hay algo más que hacer lo haremos aquí.
                }
            });
        }
    };
    return mf;
}

function salir() {
    var mf = function () {
        var url = "FacturasGeneral.html";
        window.open(url, '_self');
    }
    return mf;
}


function loadEmpresas(id) {
    $.ajax({
        type: "GET",
        url: "/api/empresas",
        dataType: "json",
        contentType: "application/json",
        success: function (data, status) {
            var empresas = [{ empresaId: 0, nombre: "" }].concat(data);
            vm.posiblesEmpresas(empresas);
            $("#cmbEmpresas").val([id]).trigger('change');
        },
                        error: function (err) {
                    mensErrorAjax(err);
                    // si hay algo más que hacer lo haremos aquí.
                }
    });
}

function loadFormasPago(id) {
    $.ajax({
        type: "GET",
        url: "/api/formas_pago",
        dataType: "json",
        contentType: "application/json",
        success: function (data, status) {
            var formasPago = [{ formaPagoId: 0, nombre: "" }].concat(data);
            vm.posiblesFormasPago(formasPago);
            $("#cmbFormasPago").val([id]).trigger('change');
        },
                        error: function (err) {
                    mensErrorAjax(err);
                    // si hay algo más que hacer lo haremos aquí.
                }
    });
}

function cambioCliente(data) {
    //
    if (!data) {
        return;
    }
    var clienteId = data.id;
    $.ajax({
        type: "GET",
        url: "/api/clientes/" + clienteId,
        dataType: "json",
        contentType: "application/json",
        success: function (data, status) {
            // cargamos los campos por defecto de receptor
            vm.receptorNif(data.nif);
            vm.receptorNombre(data.nombreComercial);
            vm.receptorDireccion(data.direccion);
            vm.receptorCodPostal(data.codPostal);
            vm.receptorPoblacion(data.poblacion);
            vm.receptorProvincia(data.provincia);
            $("#cmbFormasPago").val([data.formaPagoId]).trigger('change');
            //vm.sformaPagoId(data.formaPagoId);
        },
                        error: function (err) {
                    mensErrorAjax(err);
                    // si hay algo más que hacer lo haremos aquí.
                }
    });

}

function cambioEmpresa(data) {
    //
    if (!data) {
        return;
    }
    var empresaId = data.id;
    $.ajax({
        type: "GET",
        url: "/api/empresas/" + empresaId,
        dataType: "json",
        contentType: "application/json",
        success: function (data, status) {
            // cargamos los campos por defecto de receptor
            vm.emisorNif(data.nif);
            vm.emisorNombre(data.nombre);
            vm.emisorDireccion(data.direccion);
            vm.emisorCodPostal(data.codPostal);
            vm.emisorPoblacion(data.poblacion);
            vm.emisorProvincia(data.provincia);
        },
                        error: function (err) {
                    mensErrorAjax(err);
                    // si hay algo más que hacer lo haremos aquí.
                }
    });

}



/*------------------------------------------------------------------
    Funciones relacionadas con las líneas de facturas
--------------------------------------------------------------------*/

function nuevaLinea() {
    limpiaDataLinea(); // es un alta
    lineaEnEdicion = false;
    $.ajax({
        type: "GET",
        url: "/api/facturas/nextlinea/" + vm.facturaId(),
        dataType: "json",
        contentType: "application/json",
        success: function (data, status) {
            vm.linea(data);
            vm.total(0);
            vm.totalConIva(0);
        },
                        error: function (err) {
                    mensErrorAjax(err);
                    // si hay algo más que hacer lo haremos aquí.
                }
    });
}

function aceptarLinea() {
    if (!datosOKLineas()) {
        return;
    }
    var data = {
        facturaLinea: {
            facturaLineaId: vm.facturaLineaId(),
            linea: vm.linea(),
            facturaId: vm.facturaId(),
            articuloId: vm.sarticuloId(),
            tipoIvaId: vm.tipoIvaId(),
            porcentaje: vm.porcentaje(),
            descripcion: vm.descripcion(),
            cantidad: vm.cantidad(),
            importe: vm.importe(),
            totalLinea: vm.totalLinea()
        }
    }
    if (!lineaEnEdicion) {
        $.ajax({
            type: "POST",
            url: myconfig.apiUrl + "/api/facturas/lineas",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function (data, status) {
                $('#modalLinea').modal('hide');
                loadLineasFactura(vm.facturaId());
                loadBasesFactura(vm.facturaId());
            },
                            error: function (err) {
                    mensErrorAjax(err);
                    // si hay algo más que hacer lo haremos aquí.
                }
        });
    } else {
        $.ajax({
            type: "PUT",
            url: myconfig.apiUrl + "/api/facturas/lineas/" + vm.facturaLineaId(),
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function (data, status) {
                $('#modalLinea').modal('hide');
                loadLineasFactura(vm.facturaId());
                loadBasesFactura(vm.facturaId());
            },
                            error: function (err) {
                    mensErrorAjax(err);
                    // si hay algo más que hacer lo haremos aquí.
                }
        });
    }
}

function datosOKLineas() {
    $('#linea-form').validate({
        rules: {
            txtLinea: {
                required: true
            },
            cmbArticulos: {
                required: true
            },
            cmbTiposIva: {
                required: true
            },
            txtDescripcion: {
                required: true
            },
            txtPrecio: {
                required: true
            },
            txtCantidad: {
                required: true
            },
            txtTotalLinea: {
                required: true
            }
        },
        // Messages for form validation
        messages: {
            cmbArticulos: {
                required: "Debe elegir un articulo"
            },
            cmbTiposIva: {
                required: 'Debe elegir un tipo de IVA'
            },
            txtLinea: {
                required: 'Necesita un número de linea'
            },
            txtDescripcion: {
                required: 'Necesita una descripcion'
            },
            txtCantidad: {
                required: 'Necesita una cantidad'
            },
            txtPrecio: {
                required: 'Necesita un precio'
            }
        },
        // Do not change code below
        errorPlacement: function (error, element) {
            error.insertAfter(element.parent());
        }
    });
    var opciones = $("#linea-form").validate().settings;
    return $('#linea-form').valid();
}

function initTablaFacturasLineas() {
    tablaCarro = $('#dt_lineas').dataTable({
        autoWidth: true,
        preDrawCallback: function () {
            // Initialize the responsive datatables helper once.
            if (!responsiveHelper_dt_basic) {
                responsiveHelper_dt_basic = new ResponsiveDatatablesHelper($('#dt_lineas'), breakpointDefinition);
            }
        },
        rowCallback: function (nRow) {
            responsiveHelper_dt_basic.createExpandIcon(nRow);
        },
        drawCallback: function (oSettings) {
            responsiveHelper_dt_basic.respond();
        },
        language: {
            processing: "Procesando...",
            info: "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            infoEmpty: "Mostrando registros del 0 al 0 de un total de 0 registros",
            infoFiltered: "(filtrado de un total de _MAX_ registros)",
            infoPostFix: "",
            loadingRecords: "Cargando...",
            zeroRecords: "No se encontraron resultados",
            emptyTable: "Ningún dato disponible en esta tabla",
            paginate: {
                first: "Primero",
                previous: "Anterior",
                next: "Siguiente",
                last: "Último"
            },
            aria: {
                sortAscending: ": Activar para ordenar la columna de manera ascendente",
                sortDescending: ": Activar para ordenar la columna de manera descendente"
            }
        },
        data: dataFacturasLineas,
        columns: [{
            data: "linea"
        }, {
                data: "descripcion"
            }, {
                data: "importe",
                className: "text-right",
                render: function (data, type, row) {
                    return numeral(data).format('0,0.00');
                }
            }, {
                data: "cantidad",
                className: "text-right",
                render: function (data, type, row) {
                    return numeral(data).format('0,0.00');
                }
            }, {
                data: "totalLinea",
                className: "text-right",
                render: function (data, type, row) {
                    return numeral(data).format('0,0.00');
                }
            }, {
                data: "facturaLineaId",
                render: function (data, type, row) {
                    var bt1 = "<button class='btn btn-circle btn-danger btn-lg' onclick='deleteFacturaLinea(" + data + ");' title='Eliminar registro'> <i class='fa fa-trash-o fa-fw'></i> </button>";
                    var bt2 = "<button class='btn btn-circle btn-success btn-lg' data-toggle='modal' data-target='#modalLinea' onclick='editFacturaLinea(" + data + ");' title='Editar registro'> <i class='fa fa-edit fa-fw'></i> </button>";
                    var html = "<div class='pull-right'>" + bt1 + " " + bt2 + "</div>";
                    return html;
                }
            }]
    });
}

function loadDataLinea(data) {
    vm.facturaLineaId(data.facturaLineaId);
    vm.linea(data.linea);
    vm.articuloId(data.articuloId);
    vm.tipoIvaId(data.tipoIvaId);
    vm.porcentaje(data.porcentaje);
    vm.descripcion(data.descripcion);
    vm.cantidad(data.cantidad);
    vm.importe(data.importe);
    vm.totalLinea(data.totalLinea);
    //
    loadArticulos(data.articuloId);
    loadTiposIva(data.tipoIvaId);
}

function limpiaDataLinea(data) {
    vm.facturaLineaId(0);
    vm.linea(null);
    vm.articuloId(null);
    vm.tipoIvaId(null);
    vm.porcentaje(null);
    vm.descripcion(null);
    vm.cantidad(null);
    vm.importe(null);
    vm.totalLinea(null);
    //
    loadArticulos();
    loadTiposIva();
}

function loadTablaFacturaLineas(data) {
    var dt = $('#dt_lineas').dataTable();
    if (data !== null && data.length === 0) {
        data = null;
    }
    dt.fnClearTable();
    dt.fnAddData(data);
    dt.fnDraw();
}


function loadLineasFactura(id) {
    $.ajax({
        type: "GET",
        url: "/api/facturas/lineas/" + id,
        dataType: "json",
        contentType: "application/json",
        success: function (data, status) {
            loadTablaFacturaLineas(data);
        },
                        error: function (err) {
                    mensErrorAjax(err);
                    // si hay algo más que hacer lo haremos aquí.
                }
    });
}

function loadArticulos(id) {
    $.ajax({
        type: "GET",
        url: "/api/articulos",
        dataType: "json",
        contentType: "application/json",
        success: function (data, status) {
            var articulos = [{ articuloId: 0, nombre: "" }].concat(data);
            vm.posiblesArticulos(articulos);
            if (id) {
                $("#cmbArticulos").val([id]).trigger('change');
            } else {
                $("#cmbArticulos").val([0]).trigger('change');
            }
        },
                        error: function (err) {
                    mensErrorAjax(err);
                    // si hay algo más que hacer lo haremos aquí.
                }
    });
}

function loadTiposIva(id) {
    $.ajax({
        type: "GET",
        url: "/api/tipos_iva",
        dataType: "json",
        contentType: "application/json",
        success: function (data, status) {
            var tiposIva = [{ tipoIvaId: 0, nombre: "" }].concat(data);
            vm.posiblesTiposIva(tiposIva);
            if (id) {
                $("#cmbTiposIva").val([id]).trigger('change');
            } else {
                $("#cmbTiposIva").val([0]).trigger('change');
            }
        },
                        error: function (err) {
                    mensErrorAjax(err);
                    // si hay algo más que hacer lo haremos aquí.
                }
    });
}

function cambioArticulo(data) {
    //
    if (!data) {
        return;
    }
    var articuloId = data.id;
    $.ajax({
        type: "GET",
        url: "/api/articulos/" + articuloId,
        dataType: "json",
        contentType: "application/json",
        success: function (data, status) {
            // cargamos los campos por defecto de receptor
            vm.descripcion(data.nombre);
            vm.cantidad(1);
            vm.importe(data.precioUnitario);
            vm.totalLinea(vm.cantidad() * vm.importe());

            //valores para IVA por defecto a partir del  
            // articulo seleccionado.
            $("#cmbTiposIva").val([data.tipoIvaId]).trigger('change');
            var data2 = {
                id: data.tipoIvaId
            };
            cambioTiposIva(data2);
        },
                        error: function (err) {
                    mensErrorAjax(err);
                    // si hay algo más que hacer lo haremos aquí.
                }
    });

}

function cambioTiposIva(data) {
    if (!data) {
        return;
    }
    var tipoIvaId = data.id;
    $.ajax({
        type: "GET",
        url: "/api/tipos_iva/" + tipoIvaId,
        dataType: "json",
        contentType: "application/json",
        success: function (data, status) {
            // cargamos los campos por defecto de receptor
            vm.tipoIvaId(data.tipoIvaId);
            vm.porcentaje(data.porcentaje);
        },
                        error: function (err) {
                    mensErrorAjax(err);
                    // si hay algo más que hacer lo haremos aquí.
                }
    });

}

function cambioPrecioCantidad() {
    var mf = function () {
        vm.totalLinea(vm.cantidad() * vm.importe());
    }
    return mf;
}

function editFacturaLinea(id) {
    lineaEnEdicion = true;
    $.ajax({
        type: "GET",
        url: "/api/facturas/linea/" + id,
        dataType: "json",
        contentType: "application/json",
        success: function (data, status) {
            if (data.length > 0) {
                loadDataLinea(data[0]);
            }
        },
                        error: function (err) {
                    mensErrorAjax(err);
                    // si hay algo más que hacer lo haremos aquí.
                }
    });
}

function deleteFacturaLinea(id) {
    // mensaje de confirmación
    var mens = "¿Realmente desea borrar este registro?";
    $.SmartMessageBox({
        title: "<i class='fa fa-info'></i> Mensaje",
        content: mens,
        buttons: '[Aceptar][Cancelar]'
    }, function (ButtonPressed) {
        if (ButtonPressed === "Aceptar") {
            var data = {
                facturaLinea: {
                    facturaId: vm.facturaId()
                }
            };
            $.ajax({
                type: "DELETE",
                url: myconfig.apiUrl + "/api/facturas/lineas/" + id,
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(data),
                success: function (data, status) {
                    loadLineasFactura(vm.facturaId());
                    loadBasesFactura(vm.facturaId());
                },
                                error: function (err) {
                    mensErrorAjax(err);
                    // si hay algo más que hacer lo haremos aquí.
                }
            });
        }
        if (ButtonPressed === "Cancelar") {
            // no hacemos nada (no quiere borrar)
        }
    });
}

/*
    Funciones relacionadas con la gestión de bases
    y cuotas
*/

function initTablaBases() {
    tablaCarro = $('#dt_bases').dataTable({
        autoWidth: true,
        preDrawCallback: function () {
            // Initialize the responsive datatables helper once.
            if (!responsiveHelper_dt_basic) {
                responsiveHelper_dt_basic = new ResponsiveDatatablesHelper($('#dt_bases'), breakpointDefinition);
            }
        },
        rowCallback: function (nRow) {
            responsiveHelper_dt_basic.createExpandIcon(nRow);
        },
        drawCallback: function (oSettings) {
            responsiveHelper_dt_basic.respond();
        },
        language: {
            processing: "Procesando...",
            info: "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            infoEmpty: "Mostrando registros del 0 al 0 de un total de 0 registros",
            infoFiltered: "(filtrado de un total de _MAX_ registros)",
            infoPostFix: "",
            loadingRecords: "Cargando...",
            zeroRecords: "No se encontraron resultados",
            emptyTable: "Ningún dato disponible en esta tabla",
            paginate: {
                first: "Primero",
                previous: "Anterior",
                next: "Siguiente",
                last: "Último"
            },
            aria: {
                sortAscending: ": Activar para ordenar la columna de manera ascendente",
                sortDescending: ": Activar para ordenar la columna de manera descendente"
            }
        },
        data: dataBases,
        columns: [{
            data: "tipo"
        }, {
                data: "porcentaje",
                className: "text-right",
                render: function (data, type, row) {
                    return numeral(data).format('0,0.00');
                }
            }, {
                data: "base",
                className: "text-right",
                render: function (data, type, row) {
                    return numeral(data).format('0,0.00');
                }
            }, {
                data: "cuota",
                className: "text-right",
                render: function (data, type, row) {
                    return numeral(data).format('0,0.00');
                }
            }]
    });
}


function loadTablaBases(data) {
    var dt = $('#dt_bases').dataTable();
    if (data !== null && data.length === 0) {
        data = null;
    }
    dt.fnClearTable();
    dt.fnAddData(data);
    dt.fnDraw();
}


function loadBasesFactura(id) {
    $.ajax({
        type: "GET",
        url: "/api/facturas/bases/" + id,
        dataType: "json",
        contentType: "application/json",
        success: function (data, status) {
            // actualizamos los totales
            var t1 = 0; // total sin iva
            var t2 = 0; // total con iva
            for (var i = 0; i < data.length; i++) {
                t1 += data[i].base;
                t2 += data[i].base + data[i].cuota;
            }
            vm.total(numeral(t1).format('0,0.00'));
            vm.totalConIva(numeral(t2).format('0,0.00'));
            loadTablaBases(data);
        },
                        error: function (err) {
                    mensErrorAjax(err);
                    // si hay algo más que hacer lo haremos aquí.
                }
    });
}

// ----------- Funciones relacionadas con el manejo de autocomplete

// cargaCliente
// carga en el campo txtCliente el valor seleccionado
var cargaCliente = function (id) {
    $.ajax({
        type: "GET",
        url: "/api/clientes/" + id,
        dataType: "json",
        contentType: "application/json",
        success: function (data, status) {
            // poner el nombre en el campo de texto
            $('#txtCliente').val(data.nombre);
            vm.sclienteId(data.clienteId);
            // asignamos el agente que corresponda
            if (data.comercialId) {
                loadAgentes(data.comercialId);
                data.id = data.comercialId;
                cambioAgente(data);
            }
        },
                        error: function (err) {
                    mensErrorAjax(err);
                    // si hay algo más que hacer lo haremos aquí.
                }
    });
};

// initAutoCliente
// inicializa el control del cliente como un autocomplete
var initAutoCliente = function () {
    // incialización propiamente dicha
    $("#txtCliente").autocomplete({
        source: function (request, response) {
            // call ajax
            $.ajax({
                type: "GET",
                url: "/api/clientes/?nombre=" + request.term,
                dataType: "json",
                contentType: "application/json",
                success: function (data, status) {
                    var r = []
                    data.forEach(function (d) {
                        var v = {
                            value: d.nombre,
                            id: d.clienteId
                        };
                        r.push(v);
                    });
                    response(r);
                },
                                error: function (err) {
                    mensErrorAjax(err);
                    // si hay algo más que hacer lo haremos aquí.
                }
            });

        },
        minLength: 2,
        select: function (event, ui) {
            vm.sclienteId(ui.item.id);
            // el cambio de cliente puede implicar cambio de agente
            cambioCliente(ui.item);
        }
    });
    // regla de validación para el control inicializado
    jQuery.validator.addMethod("clienteNecesario", function (value, element) {
        var r =  false;
        if (vm.sclienteId()) r = true;
        return r;
    }, "Debe seleccionar un cliente válido");
};