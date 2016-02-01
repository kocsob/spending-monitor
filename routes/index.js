//Middlewares
var indexRedirectMW = require('../middleware/general/indexRedirect');
var models = require('../models');

module.exports = function (app) {

    var objectRepository = {
        userModel: models.User,
        spendingModel: models.Spending
    };

    app.get('/',
        indexRedirectMW(objectRepository)
    );

};
