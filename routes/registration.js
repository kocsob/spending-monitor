//Middlewares
var inverseAuthMW = require('../middleware/authentication/inverseAuth');
var checkUserRegistrationMW = require('../middleware/user/checkUserRegistration');
var renderMW = require('../middleware/general/render');

//Models
var userModel = require('../models/user');
var spendingModel = require('../models/spending');

module.exports = function (app) {

    var objectRepository = {
        userModel: new userModel,
        spendingModel: new spendingModel
    };

    app.post('/registration',
        inverseAuthMW(objectRepository),
        checkUserRegistrationMW(objectRepository),
        renderMW(objectRepository, 'login')
    );

};
