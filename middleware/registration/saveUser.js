var requireOption = require('../common').requireOption;

/**
 * This middleware saves the user registration
 * if there is no errors
 */
module.exports = function (objectRepository) {

    var userModel = requireOption(objectRepository, 'userModel');

    return function (req, res, next) {
        res.error = res.error || {};
        var username = req.body.username;
        var email = req.body.email;
        var password = req.body.password;

        // Check error field
        if (Object.keys(res.error).length > 0) {
            res.tpl.error = res.error;
            res.tpl.username = username;
            res.tpl.email = email;
            return next();
        }

        // Save the new user
        var user = new userModel({
            username: username,
            email: email,
            password: password
        });
        user.save(function (err) {
            if (err) {
                console.log(err);
            }
        });

        // Registration succeeded and fill the login name
        res.tpl.success = true;
        res.tpl.loginname = username;

        return next();
    };

};
