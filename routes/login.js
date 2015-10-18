//Middlewares
var renderMW = require('../middleware/general/render');
var inverseAuthMW = require('../middleware/general/inverseAuth');
var checkUserLoginMW = require('../middleware/login/checkUserLogin');

//Models
var userModel = require('../models/user');
var spendingModel = require('../models/spending');

module.exports = function (app) {

    var objectRepository = {
        userModel: userModel,
        spendingModel: spendingModel
    };

    app.get('/login',
        inverseAuthMW(objectRepository),
        renderMW(objectRepository, 'login')
    );
    app.post('/login',
        inverseAuthMW(objectRepository),
        checkUserLoginMW(objectRepository)
    );

};
