db = require('../config/db');

/**
 * User model
 * @constructor
 */
var User = db.model('User', {
    username: String,
    email: String,
    password: String
});

module.exports = User;
