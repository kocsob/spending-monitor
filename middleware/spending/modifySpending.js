var requireOption = require('../common').requireOption;

/**
 * This middleware modifies one spending to the model
 */
module.exports = function (objectRepository) {

    var spendingModel = requireOption(objectRepository, 'spendingModel');

    return function (req, res, next) {
        return next();
    };

};
