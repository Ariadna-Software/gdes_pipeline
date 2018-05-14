/*
 areas.js
 Funciones propias de la página Areas.html
*/

var usuario = apiComunGeneral.obtenerUsuario();
var allowedFileExtensions = ['xls', 'xlsx'];
var invoicesUp = [];
var filename = "";

var apiImportacion = {
    ini: function () {
        apiComunGeneral.initPage(usuario);
        apiComunAjax.establecerClave(usuario.apiKey);

        $('#importacion').attr('class', 'active');
        $('#import-form').submit(function () { return false; });
        $('#import2-form').submit(function () { return false; });
        $('#btnOk').click(apiImportacion.verificarFichero);
        $('#btnOk2').click(apiImportacion.cargarOfertas);

        $('#upload-input').on('change', function () {
            var files = $(this).get(0).files;
            // control file extension whether refWoId has a value
            if (files.length > 0) {
                // create a FormData object which will be sent as the data payload in the
                // AJAX request
                var formData = new FormData();
                // loop through all the selected files and add them to the formData object
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    var ext = file.name.split('.').pop().toLowerCase();
                    if (allowedFileExtensions.indexOf(ext) == -1) {
                        filename = "";
                        apiComunNotificaciones.mensajeAdvertencia(i18n.t('importacion.soloExcel'));
                        return;
                    }
                    // add the files to formData object for the data payload
                    formData.append('uploads[]', file, "@" + file.name);
                }
                $.ajax({
                    url: '/upload',
                    type: 'POST',
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function (data) {
                        filename = data;
                    },
                    xhr: function () {
                        // create an XMLHttpRequest
                        var xhr = new XMLHttpRequest();
                        // listen to the 'progress' event
                        xhr.upload.addEventListener('progress', function (evt) {
                            if (evt.lengthComputable) {
                                // calculate the percentage of upload completed
                                var percentComplete = evt.loaded / evt.total;
                                percentComplete = parseInt(percentComplete * 100);
                                // update the Bootstrap progress bar with the new percentage
                                $('.progress-bar').text(percentComplete + '%');
                                $('.progress-bar').width(percentComplete + '%');
                                // once the upload reaches 100%, set the progress bar text to done
                                if (percentComplete === 100) {
                                    $('.progress-bar').html('Fichero subido');
                                }
                            }
                        }, false);
                        return xhr;
                    }
                });
            }
        });
    },
    verificarFichero: function () {
        if (filename == "") {
            apiComunNotificaciones.mensajeAdvertencia(i18n.t('importacion.elijaFichero'));
            return;
        }
        apiComunAjax.llamadaGeneral("GET", myconfig.apiUrl + "/importacion/" + filename, null, function (err, data) {
            if (err) return;
            // mostrar en la ventana de mensajes 
            var mensaje = "";
            data.forEach(function(v){
                mensaje += v.mensaje + "<br>";
            });
            $('#wresultado').html(mensaje);
        });
    },
    cargarOfertas: function () {

    }
}


