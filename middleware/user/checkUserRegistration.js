var requireOption = require('../common').requireOption;

/**
 * This middleware loads the user from model and checks the possible new username,
 * if they are ok, set session values and redirect to /
 * if they are wrong, set error message
 */
module.exports = function (objectRepository) {

    var userModel = requireOption(objectRepository, 'userModel');

    return function (req, res, next) {
        var error = {};
        var username = req.body.username;
        var email = req.body.email;
        var password = req.body.password;
        var retypepass = req.body.retypepass;
        var emailRegex = /\S+@\S+\.\S+/;

        // Check username
        if (typeof username === 'undefined' || !username) {
            error.username = "Username is missing.";
        }

        /*
        userModel.findOne({
            username: username
        }, function (err, result) {
            // Check user existence
        });
        */

        // Check email
        if (typeof email === 'undefined' || !email) {
            error.email = "Email is missing.";
        }

        if (typeof email !== 'undefined' && email) {
            if (!emailRegex.test(email)) {
                error.email = "The email address is not valid";
            }
        }

        // Check password
        if (typeof password === 'undefined' || !password) {
            error.password = "Password is missing.";
        }

        // Check re-type password
        if (typeof retypepass === 'undefined' || !retypepass) {
            error.retypepass = "Re-type password is missing.";
        }

        if (typeof password !== 'undefined' && password && typeof retypepass !== 'undefined' && retypepass) {
            if (password !== retypepass) {
                error.retypepass = "Passwords don't match."
            }
        }

        // Check success
        if (Object.keys(error).length == 0) {
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

            res.tpl.success = true;
            res.tpl.username = username;
        } else {
            res.tpl.error = error;
            res.tpl.username = username;
            res.tpl.email = email;
            res.tpl.password = password;
            res.tpl.retypepass = retypepass;
        }

        return next();
    };

};
