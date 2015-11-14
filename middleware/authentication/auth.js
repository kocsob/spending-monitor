/**
 * If the user is not logged in, redirects to /
 */
module.exports = function (objectRepository) {

    return function (req, res, next) {
        if (typeof req.session.userId === 'undefined') {
            return res.redirect('/');
        }
        return next();
    };

};
