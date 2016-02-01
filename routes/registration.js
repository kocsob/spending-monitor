//Middlewares
var inverseAuthMW = require('../middleware/authentication/inverseAuth');
var checkUsernameMW = require('../middleware/registration/checkUsername');
var checkEmailMW = require('../middleware/registration/checkEmail');
var checkPasswordMW = require('../middleware/registration/checkPassword');
var saveUserMW = require('../middleware/registration/saveUser');
var renderMW = require('../middleware/general/render');
var models = require('../models');

module.exports = function (app) {

    var objectRepository = {
        userModel: models.User,
        spendingModel: models.Spending
    };

    app.post('/registration',
        inverseAuthMW(objectRepository),
        checkUsernameMW(objectRepository),
        checkEmailMW(objectRepository),
        checkPasswordMW(objectRepository),
        saveUserMW(objectRepository),
        renderMW(objectRepository, 'login')
    );

};
