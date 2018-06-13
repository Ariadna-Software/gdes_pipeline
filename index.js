//=======================================
// Proasistencia (index.js)
// API to communicate to PROASISTENCIA
//========================================
// Author: Rafael Garcia (rafa@myariadna.com)
// 2015 [License CC-BY-NC-4.0]


// required modules
var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var serveIndex = require('serve-index');
var moment = require('moment');

var pack = require('./package.json');
var config = require('./config.json');
var loginDb = require('./lib/login/login_db_mysql');
var configAzure = require('./configAzure.json');

// Azure AD related
var expressSession = require('express-session');
var passport = require('passport');
var OIDCStrategy = require('passport-azure-ad').OIDCStrategy;


// config // env
config.apiPort = process.env.PORT || config.apiPort;
config.apiHost = process.env.API_HOST || config.apiHost;

// Azure related functions
passport.serializeUser(function (user, done) {
    done(null, user.email);
});

passport.deserializeUser(function (id, done) {
    findByEmail(id, function (err, user) {
        done(err, user);
    });
});

// array to hold signed-in users
var users = [];

var findByEmail = function (email, fn) {
    for (var i = 0, len = users.length; i < len; i++) {
        var user = users[i];
        console.log('we are using user: ', user);
        if (user.email === email) {
            return fn(null, user);
        }
    }
    return fn(null, null);
};

// Passport strategy configuration
passport.use(new OIDCStrategy({
    callbackURL: configAzure.returnURL,
    realm: configAzure.realm,
    clientID: configAzure.clientID,
    allowHttpForRedirectUrl: configAzure.allowHttpForRedirectUrl,
    clientSecret: configAzure.clientSecret,
    oidcIssuer: configAzure.issuer,
    identityMetadata: configAzure.identityMetadata,
    skipUserProfile: configAzure.skipUserProfile,
    responseType: configAzure.responseType,
    responseMode: configAzure.responseMode
},
    function (iss, sub, profile, accessToken, refreshToken, done) {
        if (!profile.email) {
            return done(new Error("No email found"), null);
        }
        // asynchronous verification, for effect...
        process.nextTick(function () {
            findByEmail(profile.email, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    // "Auto-registration"
                    users.push(profile);
                    return done(null, profile);
                }
                return done(null, user);
            });
        });
    }
));

// starting express
var app = express();
// to parse body content
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json({ limit: '50mb' }));

// Azure AD uses
app.use(expressSession({ secret: 'gdessecret', resave: true, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());


// using cors for cross class
app.use(cors());

// servidor html estático
app.use(express.static(__dirname + "/public"));
app.use('/ficheros', serveIndex(__dirname + '/public/ficheros', { 'icons': true, 'view': 'details' }));

// Passport authentication routes
// GET /auth/openid
//   Use passport.authenticate() as route middleware to authenticate the
//   request. The first step in OpenID authentication involves redirecting
//   the user to their OpenID provider. After authenticating, the OpenID
//   provider redirects the user back to this application at
//   /auth/openid/return.
app.get('/auth/openid',
    passport.authenticate('azuread-openidconnect', { failureRedirect: '/login' }),
    function (req, res) {
        console.log('Authentication was called in the Sample');
        res.redirect('/');
    });

// GET /auth/openid/return
//   Use passport.authenticate() as route middleware to authenticate the
//   request. If authentication fails, the user is redirected back to the
//   sign-in page. Otherwise, the primary route function is called,
//   which, in this example, redirects the user to the home page.
app.get('/auth/openid/return',
    passport.authenticate('azuread-openidconnect', { failureRedirect: '/login' }),
    function (req, res) {
        console.log('We received a return from AzureAD.');
        res.redirect('/');
    });

// POST /auth/openid/return
//   Use passport.authenticate() as route middleware to authenticate the
//   request. If authentication fails, the user is redirected back to the
//   sign-in page. Otherwise, the primary route function is called,
//   which, in this example, redirects the user to the home page.
app.post('/auth/openid/return',
    passport.authenticate('azuread-openidconnect', { failureRedirect: '/login' }),
    function (req, res) {
        var user = req.user;    
        var url = "/login.html";
        if (user) {
            url = "/login.html?email=" + user.email;
        }
        console.log('We received a return from AzureAD.');
        res.redirect(url);
    });

// mounting routes
var router = express.Router();

// -- common to all routes /API
router.use(function (req, res, next) {
    // check API KEY
    var clave = req.header('x-apiKey');
    if (!clave) return res.status(401).send('No se ha encontrado clave API');
    loginDb.verificarClave(clave, function (err, verificada) {
        if (err) return res.status(500).send(err.message);
        if (!verificada) return res.status(401).send('No autorizado');
        next();
    });
});


// -- general GET (to know if the server is up and runnig)
router.get('/', function (req, res) {
    res.json('GDES PIPELINE API / SERVER -- runnig');
});

// -- registering routes
app.use('/login', require('./lib/login/login_controller'));
app.use('/version', require('./lib/version/version_controller'));
app.use('/pwbi', require('./lib/pwbi/pwbi.controller'));
app.use('/api', router);
app.use('/api/estados', require('./lib/estados/estados.controller'));
app.use('/api/grupos-usuarios', require('./lib/grupos-usuarios/grupos-usuarios.controller'));
app.use('/api/usuarios', require('./lib/usuarios/usuarios.controller'));
app.use('/api/responsables', require('./lib/responsables/responsables.controller'));
app.use('/api/empresas', require('./lib/empresas/empresas.controller'));
app.use('/api/paises', require('./lib/paises/paises.controller'));
app.use('/api/areas', require('./lib/areas/areas.controller'));
app.use('/api/servicios', require('./lib/servicios/servicios.controller'));
app.use('/api/directores-areas', require('./lib/directores-areas/directores-areas.controller'));
app.use('/api/centros', require('./lib/centros/centros.controller'));
app.use('/api/grupos-actividades', require('./lib/grupos-actividades/grupos-actividades.controller'));
app.use('/api/tipos-actividades', require('./lib/tipos-actividades/tipos-actividades.controller'));
app.use('/api/tipos-soporte', require('./lib/tipos-soporte/tipos-soporte.controller'));
app.use('/api/ofertas', require('./lib/ofertas/ofertas.controller'));
app.use('/api/fases-oferta', require('./lib/fases-oferta/fases-oferta.controller'));
app.use('/api/tipos-oferta', require('./lib/tipos-oferta/tipos-oferta.controller'));
app.use('/api/tipos-oportunidad', require('./lib/tipos-oportunidad/tipos-oportunidad.controller'));
app.use('/api/proyectos', require('./lib/proyectos/proyectos.controller'));
app.use('/api/tipos-proyecto', require('./lib/tipos-proyecto/tipos-proyecto.controller'));
app.use('/api/divisas', require('./lib/divisas/divisas.controller'));
app.use('/api/centrosEstablecidos', require('./lib/centrosEstablecidos/centrosEstablecidos.controller'));
app.use('/api/correoElectronico', require('./lib/correoElectronico/correoElectronico.controller'));
app.use('/api/ubicaciones', require('./lib/ubicaciones/ubicaciones.controller'));
app.use('/api/unidades-negocio', require('./lib/unidades-negocio/unidades-negocio.controller'));
app.use('/api/tipos-contrato', require('./lib/tipos-contrato/tipos-contrato.controller'));
app.use('/api/razon-perdida', require('./lib/razon-perdida/razon-perdida.controller'));
app.use('/api/seguidores', require('./lib/seguidores/seguidores.controller'));
app.use('/api/versiones', require('./lib/versiones/versiones.controller'));
app.use('/streport', require('./report-controller/reportdb'));
app.use('/upload', require('./lib/uploads/upload'));
app.use('/importacion', require('./lib/importacion/importacion.controller'));

// -- start server
app.listen(config.apiPort);



// -- console message
console.log("-------------------------------------------");
console.log(" GDES PIPELINE ", moment(new Date()).format('DD/MM/YYYYY HH:mm:ss'));
console.log("-------------------------------------------");
console.log(' VERSION: ' + pack.version);
console.log(' PORT: ' + config.apiPort);
console.log("-------------------------------------------");
