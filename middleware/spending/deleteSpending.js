var requireOption = require('../common').requireOption;

/**
 * This middleware deletes one spending from the model
 */
module.exports = function (objectRepository) {

    var spendingModel = requireOption(objectRepository, 'spendingModel');

    return function (req, res, next) {
        // Check the _id if not exists send Bad Request
        if (typeof req.body.id === 'undefined') {
            return res.status(400).end();
        }

        // Delete spending from the DB
        spendingModel.destroy({
            where: {
                id : req.body.id,
                owner: req.session.userId
            }
        }).then(function (affectedRows) {
            if (affectedRows[0] === 0) {
                return res.status(400).send('0 rows modified');
            }

            return res.status(200).end();
        }).catch(next);

    };

};
