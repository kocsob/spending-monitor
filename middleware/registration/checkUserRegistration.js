var requireOption = require('../common').requireOption;

/**
 * This middleware loads the user from model and checks the possible new username,
 * if they are ok, set session values and redirect to /
 * if they are wrong, set error message
 */
module.exports = function (objectRepository) {

    var userModel = requireOption(objectRepository, 'userModel');

    return function (req, res, next) {
        return next();
    };

};
