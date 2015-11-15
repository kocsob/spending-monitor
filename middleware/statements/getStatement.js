var mongoose = require('mongoose');
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
        spendingModel.aggregate([
            {
                $match: {
                    _owner: mongoose.Types.ObjectId(req.session.userId),
                    date: {
                        $gt: new Date(from),
                        $lt: new Date(to)
                    }
                }
            }, {
                $group: {
                    _id: "$category",
                    sum: {$sum: "$amount"}
                }
            }
        ], function (err, result){
            if (err){
                return next(err);
            }

            // Replace the _id field with category
            result.forEach(function (element) {
                element.category = element._id;
                delete element._id;
            });

            return res.json(result);
        });
    };

};
