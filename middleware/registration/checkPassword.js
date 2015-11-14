/**
 * This middleware checks the password,
 * if that is not ok set an error message
 */
module.exports = function (objectRepository) {

    return function (req, res, next) {
        res.error = res.error || {};
        var password = req.body.password;
        var retypepass = req.body.retypepass;

        // Check password field
        if (typeof password === 'undefined' || !password) {
            res.error.password = "Password is missing.";
        }

        // Check re-type password field
        if (typeof retypepass === 'undefined' || !retypepass) {
            res.error.retypepass = "Re-type password is missing.";
        }

        // Check password and re-type password matching
        if (typeof password !== 'undefined' && password && typeof retypepass !== 'undefined' && retypepass) {
            if (password !== retypepass) {
                res.error.retypepass = "Passwords don't match.";
                return next();
            }
        }

        return next();
    };

};
