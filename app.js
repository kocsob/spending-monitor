var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');

var app = express();

app.set('view engine', 'ejs');

/**
 * Serve static before session
 */
app.use('/public', express.static('public'));
app.use('/favicon.ico', express.static('public/images/favicon.ico'));

/**
 * Session above all
 */
app.use(session({
    secret: 'ewNR8kv2U0UmpbsdsqkJkbAWcZby7U6QfxfM5vaRgstBNID1PFOP569NKdUBjC3z',
    cookie: {
        maxAge: null
    },
    resave: true,
    saveUninitialized: false
}));

/**
 * Parse parameters in POST
 */
// for parsing application/json
app.use(bodyParser.json());
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));

/**
 * Let's create the .tpl and .error on the res object
 */
app.use(function (req, res, next) {
    //res.error = [];
    res.tpl = {};
    return next();
});

/**
 * Include all the routes
 */
require('./routes/index')(app);
require('./routes/authentication')(app);
require('./routes/registration')(app);
require('./routes/spendings')(app);
require('./routes/statements')(app);

/**
 * Use the static MW
 */
app.use(express.static('static'));


/**
 * Standard error handler
 */
app.use(function (err, req, res, next) {
    res.status(500).send('Internal server error!');

    //Flush out the stack to the console
    console.error(err.stack);
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
