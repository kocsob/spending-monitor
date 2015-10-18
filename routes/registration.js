//Middlewares
var inverseAuthMW = require('../middleware/general/inverseAuth');
var checkUserRegistrationMW = require('../middleware/registration/checkUserRegistration');

//Models
var userModel = require('../models/user');
var spendingModel = require('../models/spending');

module.exports = function (app) {

    var objectRepository = {
        userModel: userModel,
        spendingModel: spendingModel
    };

    app.post('/registration',
        inverseAuthMW(objectRepository),
        checkUserRegistrationMW(objectRepository)
    );

};
