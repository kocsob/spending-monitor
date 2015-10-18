//Middlewares
var authMW = require('../middleware/general/auth');
var renderMW = require('../middleware/general/render');
var getSpendingMW = require('../middleware/spending/getSpending');
var addSpendingMW = require('../middleware/spending/addSpending');
var modifySpendingMW = require('../middleware/spending/modifySpending');
var deleteSpendingMW = require('../middleware/spending/deleteSpending');

//Models
var userModel = require('../models/user');
var spendingModel = require('../models/spending');

module.exports = function (app) {

    var objectRepository = {
        userModel: userModel,
        spendingModel: spendingModel
    };

    app.get('/spendings',
        authMW(objectRepository),
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
