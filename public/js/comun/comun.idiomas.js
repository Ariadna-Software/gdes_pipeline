/*  
 comun.idiomas.js
 Funciones comunes de manejo de idiomas
*/
var apiComunIdiomas = {
    iniIdiomas: function () {
        i18n.init({}, function (t) {
            $('.I18N').i18n();
        });
        var lng = i18n.lng();
        validator_languages(lng);
    }
}