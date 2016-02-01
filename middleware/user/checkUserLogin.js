var bcrypt = require('bcryptjs');
var requireOption = require('../common').requireOption;

/**
 * This middleware loads the user from model and checks the credentials,
 * if they are ok, set session values and redirect to /
 * if they are wrong, set error message
 */
module.exports = function (objectRepository) {

    var userModel = requireOption(objectRepository, 'userModel');

    return function (req, res, next) {
        res.tpl.error = res.tpl.error || {};
        var username = req.body.username;
        var password = req.body.password;

        // Check username
        if (typeof username === 'undefined' || !username) {
            res.tpl.error.login = "Username or Password is incorrect!";
            return next();
        }

        // Check password
        if (typeof password === 'undefined' || !password) {
            res.tpl.error.login = "Username or Password is incorrect!";
            res.tpl.loginname = username;
            return next();
        }

        // Find user by username in the DB
        userModel.find({
            where: { username: username }
        }).then(function (user) {
            // Check username existence in the DB
            if (!user) {
                res.tpl.error.login = "Username or Password is incorrect!";
                res.tpl.loginname = username;
                return next();
            }

            // Check password
            if (!bcrypt.compareSync(password, user.password)) {
                res.tpl.error.login = "Username or Password is incorrect!";
                res.tpl.loginname = username;
                return next();
            }

            // Save the user ID to the session
            req.session.userId = user.id;

            return res.redirect('/spendings');
        }).catch(next);
    };

};
