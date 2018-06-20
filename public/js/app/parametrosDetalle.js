/*
 parametros.js
 Funciones propias de la página Parametros.html
*/

var usuario = apiComunGeneral.obtenerUsuario();
var data = null;
var parametroId = 0;
var vm;

var apiPaginaParametrosDetalle = {
    ini: function () {
        apiComunGeneral.initPage(usuario);
        apiComunAjax.establecerClave(usuario.apiKey);

        vm = new apiPaginaParametrosDetalle.datosPagina();
        ko.applyBindings(vm);

        $('#parametros').attr('class', 'active');
        $('#parametro-form').submit(function () { return false; });
        $('#btnAceptar').click(apiPaginaParametrosDetalle.aceptar);
        $('#btnSalir').click(apiPaginaParametrosDetalle.salir);

        parametroId = 0;
        vm.parametroId(0);
        apiPaginaParametrosDetalle.cargarParametro(parametroId);
    },
    cargarParametro: function(id){
        apiComunAjax.llamadaGeneral("GET", myconfig.apiUrl + "/api/parametros/" + id, null, function(err, data){
            if (err) return;
            apiPaginaParametrosDetalle.cargarDatosPagina(data);
        });
    },
    cargarDatosPagina: function(data){
        vm.parametroId(data.parametroId);
        vm.valorInicialAno(data.valorInicialAno);
        vm.anoEnCurso(data.anoEnCurso);
        vm.valorActualAno(data.valorActualAno);
    },
    datosPagina: function () {
        var self = this;
        self.parametroId = ko.observable();
        self.valorInicialAno = ko.observable();
        self.anoEnCurso = ko.observable();
        self.valorActualAno = ko.observable();
    },
    aceptar: function () {
        if (!apiPaginaParametrosDetalle.datosOk()) return;
        var data = {
            parametrosId: 0,
            valorInicialAno: vm.valorInicialAno(),
            anoEnCurso: vm.anoEnCurso(),
            valorActualAno:vm.valorActualAno()
        };
        var verb = "PUT";
        apiComunAjax.llamadaGeneral(verb, myconfig.apiUrl + "/api/parametros", data, function(err, data){
            if (err) return;
            apiPaginaParametrosDetalle.salir();
        });
    },
    datosOk: function(){
        $('#parametro-form').validate({
            rules: {
                txtValorInicialAno: { required: true },
                txtAnoEnCurso: { required: true },
                txtValorActualAno: { required: true }
            },
            errorPlacement: function (error, element) {
                error.insertAfter(element.parent());
            }
        });
        return $('#parametro-form').valid();
    },
    salir: function () {
        window.open(sprintf('Index.html'), '_self');
    }
}


