//Middlewares
var renderMW = require('../middleware/general/render');
var authMW = require('../middleware/authentication/logout');
var inverseAuthMW = require('../middleware/authentication/inverseAuth');
var checkUserLoginMW = require('../middleware/user/checkUserLogin');
var logoutMW = require('../middleware/authentication/logout');
var models = require('../models');

module.exports = function (app) {

    var objectRepository = {
        userModel: models.User,
        spendingModel: models.Spending
    };

    app.get('/login',
        inverseAuthMW(objectRepository),
        renderMW(objectRepository, 'login')
    );
    app.post('/login',
        inverseAuthMW(objectRepository),
        checkUserLoginMW(objectRepository),
        renderMW(objectRepository, 'login')
    );
    app.post('/logout',
        authMW(objectRepository),
        logoutMW(objectRepository)
    );
};
