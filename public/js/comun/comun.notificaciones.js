var apiComunNotificaciones = {
    errorAjax: function (err) {
        var lg = i18n.lng();
        var ms = i18n.t('error.general');
        if (err.readyState == 0) {
            ms = i18n.t('error.ajax_general');
        }
        if (err.status == 401) {
            ms = i18n.t("error.authorization");
        }
        // Building html response
        var html = ms + "<hr/>"
        html += sprintf("<div><strong>readyState: </strong>%s</div>", err.readyState);
        if (err.responseText) {
            html += sprintf("<div><strong>responseText: </strong>%s</div>", err.responseText);
        }
        html += sprintf("<div><strong>status: </strong>%s</div>", err.status);
        html += sprintf("<div><strong>statusText: </strong>%s</div>", err.statusText);
        html += "<hr/>";
        html += sprintf("<div><small>%s</small></div>", i18n.t('error.close'));
        $.smallBox({
            title: "ERROR",
            content: html,
            color: "#C46A69",
            iconSmall: "fa fa-warning shake animated",
        });
    }
}