var Sequelize = require('sequelize');
var requireOption = require('../common').requireOption;

/**
 * This middleware creates the statements to the time interval from the model
 */
module.exports = function (objectRepository) {

    var spendingModel = requireOption(objectRepository, 'spendingModel');

    return function (req, res, next) {
        // Get the date range from the query
        var from = req.query.from || 0;
        var to = req.query.to || Date.now();

        // Create the aggregation in the date interval
        spendingModel.findAll({
            attributes: [
                [Sequelize.fn('SUM', Sequelize.col('amount')),'sum'],
                'category'
            ],
            group: ['category'],
            where: {
                owner: req.session.userId,
                date: {
                    $gte: from,
                    $lt: to
                }
            },
            order: 'category ASC'
        }).then(function (statement){
            return res.json(statement);
        }).catch(next);

    };

};
