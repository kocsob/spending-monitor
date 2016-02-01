//Middlewares
var authMW = require('../middleware/authentication/auth');
var renderMW = require('../middleware/general/render');
var getUserByIdMW = require('../middleware/user/getUserById');
var getStatementMW = require('../middleware/statements/getStatement');
var models = require('../models');

module.exports = function (app) {

    var objectRepository = {
        userModel: models.User,
        spendingModel: models.Spending
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
