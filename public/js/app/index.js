/*
 index.js
 Funciones propias de la página index.html
*/

var usuario = JSON.parse(apiComunGeneral.getCookie('usuario'));

var apiPaginaIndex = {
    ini: function(){
        apiComunGeneral.initPage(usuario);
        $('#inicio').attr('class', 'active');
    }
}


