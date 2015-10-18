var requireOption = require('../common').requireOption;

/**
 * This middleware creates the statements to the time interval from the model
 */
module.exports = function (objectRepository) {

    var spendingModel = requireOption(objectRepository, 'spendingModel');

    return function (req, res, next) {
        return res.json({});
    };

};
