var requireOption = require('../common').requireOption;

/**
 * This middleware gets the spendings to the date interval from the model
 */
module.exports = function (objectRepository) {

    var spendingModel = requireOption(objectRepository, 'spendingModel');

    return function (req, res, next) {
        // Get the date range from the query
        var from = req.query.from || 0;
        var to = req.query.to || Date.now();

        // Find the spendings in the date interval
        spendingModel.findAll({
            where: {
                owner: req.session.userId,
                date: {
                    $gte: from,
                    $lt: to
                }
            }
        }).then(function (spending){
            return res.json(spending);
        }).catch(next);

    };

};
