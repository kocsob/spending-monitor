db = require('../config/db');

/**
 * Spending model
 * @constructor
 */
var Spending = db.model('Spending', {
    date: Date,
    item: String,
    category: String,
    amount: Number,
    _owner: { type: db.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = Spending;
