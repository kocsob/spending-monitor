//Middlewares
var indexRedirectMW = require('../middleware/general/indexRedirect');

//Models
var userModel = require('../models/user');
var spendingModel = require('../models/spending');

module.exports = function (app) {

    var objectRepository = {
        userModel: new userModel,
        spendingModel: new spendingModel
    };

    app.get('/',
        indexRedirectMW(objectRepository)
    );

};
