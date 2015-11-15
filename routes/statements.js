//Middlewares
var authMW = require('../middleware/authentication/auth');
var renderMW = require('../middleware/general/render');
var getUserByIdMW = require('../middleware/user/getUserById');
var getStatementMW = require('../middleware/statements/getStatement');

//Models
var userModel = require('../models/user');
var spendingModel = require('../models/spending');

module.exports = function (app) {

    var objectRepository = {
        userModel: userModel,
        spendingModel: spendingModel
    };

    app.get('/statements',
        authMW(objectRepository),
        getUserByIdMW(objectRepository),
        renderMW(objectRepository, 'statements')
    );
    app.get('/statements/get',
        authMW(objectRepository),
        getStatementMW(objectRepository)
    );

};
