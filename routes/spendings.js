//Middlewares
var renderMW = require('../middleware/general/render');
var authMW = require('../middleware/authentication/auth');
var getUserByIdMW = require('../middleware/user/getUserById');
var getSpendingMW = require('../middleware/spending/getSpending');
var addSpendingMW = require('../middleware/spending/addSpending');
var modifySpendingMW = require('../middleware/spending/modifySpending');
var deleteSpendingMW = require('../middleware/spending/deleteSpending');
var models = require('../models');

module.exports = function (app) {

    var objectRepository = {
        userModel: models.User,
        spendingModel: models.Spending
    };

    app.get('/spendings',
        authMW(objectRepository),
        getUserByIdMW(objectRepository),
        renderMW(objectRepository, 'spendings')
    );
    app.get('/spendings/get',
        authMW(objectRepository),
        getSpendingMW(objectRepository)
    );
    app.post('/spendings/add',
        authMW(objectRepository),
        addSpendingMW(objectRepository)
    );
    app.post('/spendings/modify',
        authMW(objectRepository),
        modifySpendingMW(objectRepository)
    );
    app.post('/spendings/delete',
        authMW(objectRepository),
        deleteSpendingMW(objectRepository)
    );

};
