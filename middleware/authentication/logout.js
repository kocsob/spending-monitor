/**
 * If the user log out then delete the session and redirects to /
 */
module.exports = function (objectrepository) {

    return function (req, res, next) {
        return next();
    };

};
