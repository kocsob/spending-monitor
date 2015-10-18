var express = require('express');
var app = express();

/**
 * Let's create the .tpl and .error on the res object
 */
app.use(function (req, res, next) {
    res.error = [];
    res.tpl = {};
    return next();
});

/**
 * Include all the routes
 */
require('./routes/index')(app);
require('./routes/login')(app);
require('./routes/registration')(app);
require('./routes/spendings')(app);
require('./routes/statements')(app);

//Use the static MW
app.use(express.static('templates'));
app.use('/public', express.static('public'));
app.use('/favicon.ico', express.static('public/images/favicon.ico'));

/**
 * Standard error handler
 */
app.use(function (err, req, res, next) {
    res.status(500).send('Houston, we have a problem!');

    //Flush out the stack to the console
    console.error(err.stack);
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
