var requireOption = require('../common').requireOption;

/**
 * This middleware loads the user from model and checks the new username,
 * if that is not ok set an error message
 */
module.exports = function (objectRepository) {

    var userModel = requireOption(objectRepository, 'userModel');

    return function (req, res, next) {
        var username = req.body.username;
        res.error = res.error || {};

        // Check username field
        if (typeof username === 'undefined' || !username) {
            res.error.username = "Username is missing.";
            return next();
        }

        // Find user by username in the DB
        userModel.find({
            where: { username: username }
        }).then(function (user) {
            // Check username existence
            if (user) {
                res.error.username = "Username is already used.";
                return next();
            }
            return next();
        }).catch(next);
    };

};
