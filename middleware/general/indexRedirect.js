/**
 * This middleware has one purpose, when the user visits the / main page,
 * should be redirected to
 *    - /login when not signed in
 *    - /spendings when signed in
 */
module.exports = function (objectRepository) {

    return function (req, res, next) {
        if (typeof req.session.userId === 'undefined') {
            return res.redirect('/login');
        } else {
            return res.redirect('/spendings');
        }
    };

};
