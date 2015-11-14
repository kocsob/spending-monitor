/**
 * This middleware checks the password,
 * if that is not ok set an error message
 */
module.exports = function (objectRepository) {

    return function (req, res, next) {
        res.error = res.error || {};
        var email = req.body.email;
        var emailRegex = /\S+@\S+\.\S+/;

        // Check email field
        if (typeof email === 'undefined' || !email) {
            res.error.email = "Email is missing.";
            return next();
        }

        // check email format
        if (!emailRegex.test(email)) {
            res.error.email = "The email address is not valid";
            return next();
        }

        return next();
    };

};
