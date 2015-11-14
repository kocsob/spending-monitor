var requireOption = require('../common').requireOption;

/**
 * This middleware gets the username by userId, which stored in session
 */
module.exports = function (objectRepository) {

    var userModel = requireOption(objectRepository, 'userModel');

    return function (req, res, next) {
        userModel.findOne({ _id : req.session.userId }, function (err, result){
            if (err){
                return next(err);
            }

            res.tpl.user = result;
            return next();
        });
    };

};
