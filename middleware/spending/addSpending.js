var requireOption = require('../common').requireOption;

/**
 * This middleware adds one spending to the model
 */
module.exports = function (objectRepository) {

    var spendingModel = requireOption(objectRepository, 'spendingModel');

    return function (req, res, next) {
        // Check the required attributes
        if (typeof req.body.date === 'undefined' || typeof req.body.item === 'undefined' ||
            typeof req.body.category === 'undefined' || typeof req.body.amount === 'undefined') {
            return res.status(400).end();
        }

        // Add the new spending to the DB
        var spending = new spendingModel({
            date: req.body.date,
            item: req.body.item,
            category: req.body.category,
            amount: req.body.amount,
            _owner: req.session.userId
        });
        spending.save(function(err) {
            if (err) {
                next(err);
            }
            return res.status(200).end();
        });
    };

};
