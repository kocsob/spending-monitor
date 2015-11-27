var requireOption = require('../common').requireOption;

/**
 * This middleware modifies one spending in the model
 */
module.exports = function (objectRepository) {

    var spendingModel = requireOption(objectRepository, 'spendingModel');

    return function (req, res, next) {
        var data = {};

        // Check the _id if not exists send Bad Request
        if (typeof req.body._id === 'undefined') {
            return res.status(400).end();
        }

        // Collect the update information
        if (typeof req.body.date !== 'undefiend') {
            data.date = req.body.date;
        }
        if (typeof req.body.item !== 'undefiend') {
            data.item = req.body.item;
        }
        if (typeof req.body.category !== 'undefiend') {
            data.category = req.body.category;
        }
        if (typeof req.body.amount !== 'undefiend') {
            data.amount = req.body.amount
        }

        // If no update information present send Bad Request
        if (Object.keys(data).length == 0) {
            return res.status(400).end();
        }

        // Update information in the DB
        spendingModel.update({
            _id: req.body._id
        }, {
            $set: data
        }, function(err, numAffected) {
            if (err) {
                next(err);
            }
            // numAffected is the number of updated documents

            res.status(200).end();
        });
    };

};
