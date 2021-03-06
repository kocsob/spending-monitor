var requireOption = require('../common').requireOption;

/**
 * This middleware adds one spending to the model
 */
module.exports = function (objectRepository) {

    var spendingModel = requireOption(objectRepository, 'spendingModel');

    return function (req, res, next) {
        // Check the required attributes
        if (typeof req.body.date === 'undefined' || !req.body.date) {
            return res.status(400).send('Date field is not filled out!');
        }

        if (typeof req.body.item === 'undefined' || !req.body.item) {
            return res.status(400).send('Item field is not filled out!');
        }

        if (typeof req.body.category === 'undefined' || !req.body.category) {
            return res.status(400).send('Category field is not filled out!');
        }

        if (typeof req.body.amount === 'undefined' || !req.body.amount) {
            return res.status(400).send('Amount field is not filled out!');
        }

        // Add the new spending to the DB
        spendingModel.create({
            date: req.body.date,
            item: req.body.item,
            category: req.body.category,
            amount: req.body.amount,
            owner: req.session.userId
        }).then(function (spending) {
            return res.json({ id: spending.id });
        }).catch(next);

    };

};
