var requireOption = require('../common').requireOption;

/**
 * This middleware deletes one spending from the model
 */
module.exports = function (objectRepository) {

    var spendingModel = requireOption(objectRepository, 'spendingModel');

    return function (req, res, next) {
        // Check the _id if not exists send Bad Request
        if (typeof req.body._id === 'undefined') {
            return res.status(400).end();
        }

        // Delete spending from the DB
        spendingModel.remove({
            _id: req.body._id
        }, function (err) {
            if (err) {
                next(err);
            }
            return res.status(200).end();
        });
    };

};
