var requireOption = require('../common').requireOption;

/**
 * This middleware modifies one spending in the model
 */
module.exports = function (objectRepository) {

    var spendingModel = requireOption(objectRepository, 'spendingModel');

    return function (req, res, next) {
        var data = {};

        // Check the _id if not exists send Bad Request
        if (typeof req.body.id === 'undefined' || !req.body.id) {
            return res.status(400).send('id field is not specified!');
        }

        // Collect the update information
        if (typeof req.body.date !== 'undefiend' && req.body.date) {
            data.date = req.body.date;
        }
        if (typeof req.body.item !== 'undefiend' && req.body.item) {
            data.item = req.body.item;
        }
        if (typeof req.body.category !== 'undefiend' && req.body.category) {
            data.category = req.body.category;
        }
        if (typeof req.body.amount !== 'undefiend' && req.body.amount) {
            data.amount = req.body.amount
        }

        // If no update information present send Bad Request
        if (Object.keys(data).length == 0) {
            return res.status(400).send('Update field is not specified!');
        }

        // Update information in the DB
        spendingModel.update(data, {
            where: {
                id : req.body.id,
                owner: req.session.userId
            }
        }).then(function (affectedRows) {
            if (affectedRows[0] === 0) {
                return res.status(400).send('0 rows modified');
            }

            res.status(200).end();
        }).catch(next);

    };

};
