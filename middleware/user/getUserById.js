var requireOption = require('../common').requireOption;

/**
 * This middleware loads the user from model and checks the possible new username,
 * if they are ok, set session values and redirect to /
 * if they are wrong, set error message
 */
module.exports = function (objectRepository) {

    var userModel = requireOption(objectRepository, 'userModel');

    return function (req, res, next) {
        //come from session
        /*if (typeof req.param('userid') === 'undefined')
        {
            return next();
        }*/

        //lets find the user
        userModel.findOne({ id : req.param('userid')}, function (err, result){
            if (err){
                return next(err);
            }

            res.tpl.user = result;
            return next();
        });
    };

};
