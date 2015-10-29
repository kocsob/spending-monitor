var requireOption = require('../common').requireOption;

/**
 * This middleware gets the spendings to the time interval from the model
 */
module.exports = function (objectRepository) {

    var spendingModel = requireOption(objectRepository, 'spendingModel');

    return function (req, res, next) {
        //lets find the spendigns
        spendingModel.find({ from : req.param('from'), to: req.param('to')}, function (err, result){
            if (err){
                return next(err);
            }

            res.json(result);
        });
    };


};
