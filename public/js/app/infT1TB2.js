/*
 infPR.js
 Funciones propias de la página infPr.html
*/

var usuario = apiComunGeneral.obtenerUsuario();
var data = null;
var areaId = 0;
var vm;

var viewer;
var options;
var fase;
var pais;
var dFecha;
var hFecha;
var estado;

var apiInfT1TB2 = {
    ini: function () {
        apiComunGeneral.initPage(usuario);
        apiComunAjax.establecerClave(usuario.apiKey);
        // Create the report viewer with default options
        viewer = new Stimulsoft.Viewer.StiViewer(null, "StiViewer", false);
        options = new Stimulsoft.Viewer.StiViewerOptions();
        Stimulsoft.Base.Localization.StiLocalization.setLocalizationFile("../localization/es.xml", true);
        Stimulsoft.Base.StiLicense.key = "6vJhGtLLLz2GNviWmUTrhSqnOItdDwjBylQzQcAOiHltN9ZO4D78QwpEoh6+UpBm5mrGyhSAIsuWoljPQdUv6R6vgv" +
            "iStsx8W3jirJvfPH27oRYrC2WIPEmaoAZTNtqb+nDxUpJlSmG62eA46oRJDV8kJ2cJSEx19GMJXYgZvv7yQT9aJHYa" +
            "SrTVD7wdhpNVS1nQC3OtisVd7MQNQeM40GJxcZpyZDPfvld8mK6VX0RTPJsQZ7UcCEH4Y3LaKzA5DmUS+mwSnjXz/J" +
            "Fv1uO2JNkfcioieXfYfTaBIgZlKecarCS5vBgMrXly3m5kw+YwpJ2v+cMXuDk3UrZgrdxNnOhg8ZHPg9ijHxqUomZZ" +
            "BzKpVQU0d06ne60j/liMH5KirAI2JCVfBcBvIcyliJos8LAWr9q/1sPR9y7LmA1eyS1/dXaxmEaqi5ubhLqlf+OS0x" +
            "FX6tlBBgegqHlIj6Fytwvq5YlGAZ0Cra05JhnKh/ohYlADQz6Jbg5sOKyn5EbejvPS3tWr0LRBH2FO6+mJaSEAwzGm" +
            "oWT057ScSvGgQmfx8wCqSF+PgK/zTzjy75Oh";
        options.appearance.scrollbarsMode = true;
        options.appearance.fullScreenMode = true;
        options.toolbar.showSendEmailButton = true;
        // parámetros 
        fase = apiComunGeneral.gup("fase");
        pais = apiComunGeneral.gup("pais");
        dFecha = apiComunGeneral.gup("dFecha");
        hFecha = apiComunGeneral.gup("hFecha");
        estado = apiComunGeneral.gup("estado");
        // llamar al informe 
        apiInfT1TB2.obtainJSON();
    },
    obtainJSON: function () {
        var url = "/pwbi/T1TB2?fase=" + fase + "&pais=" + pais + "&dFecha=" + dFecha + "&hFecha=" + hFecha + "&estado=" + estado;
        apiComunAjax.llamadaGeneral("GET", myconfig.apiUrl + url, data, function (err, data) {
            if (err) return;
            apiInfT1TB2.obtainReport(data);
        });
    },
    obtainReport: function (data) {
        StiOptions.WebServer.url = "/streport";
        var file = "reports/T1TB2.mrt";
        // Create a new report instance
        var report = new Stimulsoft.Report.StiReport();
        report.loadFile(file);

        // var connectionString = "Server=" + myconfig.report.host + ";";
        // connectionString += "Port=" + myconfig.report.port + ";"
        // connectionString += "Database=" + myconfig.report.database + ";"
        // connectionString += "UserId=" + myconfig.report.user + ";"
        // connectionString += "Pwd=" + myconfig.report.password + ";";
        // report.dictionary.databases.list[0].connectionString = connectionString;

        // var sql = report.dataSources.items[0].sqlCommand;
        // var sql2 = apiInfT1TB2.processParameters(sql);
        // report.dataSources.items[0].sqlCommand = sql2;

        var dataSet = new Stimulsoft.System.Data.DataSet("T1TB2");
        dataSet.readJson(JSON.stringify(data));
        // Remove all connections from the report template
        report.dictionary.databases.clear();
        // Parámetros
        report.dictionary.variables.items[0].val = dFecha;
        report.dictionary.variables.items[1].val = hFecha;
        //
        report.regData(dataSet.dataSetName, "", dataSet);
        report.dictionary.synchronize();
        // Assign report to the viewer, the report will be built automatically after rendering the viewer
        viewer.report = report;
        viewer.renderHtml("report_viewer");
    }
}