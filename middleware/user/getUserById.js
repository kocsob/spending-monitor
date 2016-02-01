var requireOption = require('../common').requireOption;

/**
 * This middleware gets the username by userId, which stored in session
 */
module.exports = function (objectRepository) {

    var userModel = requireOption(objectRepository, 'userModel');

    return function (req, res, next) {
        userModel.find({
            where: {id: req.session.userId}
        }).then(function (user){
            res.tpl.user = user;
            return next();
        }).catch(next);
    };

};
