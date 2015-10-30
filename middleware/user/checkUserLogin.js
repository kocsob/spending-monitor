var requireOption = require('../common').requireOption;

/**
 * This middleware loads the user from model and checks the credentials,
 * if they are ok, set session values and redirect to /
 * if they are wrong, set error message
 */
module.exports = function (objectRepository) {

    var userModel = requireOption(objectRepository, 'userModel');

    return function (req, res, next) {
        var error = false;
        var username = req.body.username;
        var password = req.body.password;
        console.log(username, password);

        // Check username
        if (typeof username === 'undefined' || !username) {
            error = true;
        }

        // Check password
        if (typeof password === 'undefined' || !password) {
            error = true;
        }
        console.log(error);

        if (error == true) {
            res.tpl.error = {login: "Username or Password is incorrect!"};
            return res.render('login', res.tpl);
        }

        return res.redirect('/spendings');
    };

};
