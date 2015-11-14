//Middlewares
var renderMW = require('../middleware/general/render');
var authMW = require('../middleware/authentication/logout');
var inverseAuthMW = require('../middleware/authentication/inverseAuth');
var checkUserLoginMW = require('../middleware/user/checkUserLogin');
var logoutMW = require('../middleware/authentication/logout');

//Models
var userModel = require('../models/user');
var spendingModel = require('../models/spending');

module.exports = function (app) {

    var objectRepository = {
        userModel: userModel,
        spendingModel: new spendingModel
    };

    app.get('/login',
        inverseAuthMW(objectRepository),
        renderMW(objectRepository, 'login')
    );
    app.post('/login',
        inverseAuthMW(objectRepository),
        checkUserLoginMW(objectRepository)
    );
    app.post('/logout',
        authMW(objectRepository),
        logoutMW(objectRepository)
    );
};
