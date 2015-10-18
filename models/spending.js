/**
 * Spending model (mock)
 * @constructor
 */
var Spending = function () {
};

/**
 * An instance
 * @type {{id: number, date: date, item: string, category: string, amount: number}}
 */
var SpendingInstanceMock = {
    id: 1,
    date: '2015.10.17',
    item: 'notebook',
    category: 'other',
    amount: 100
};

/**
 * Find one element with the criteria
 * @param criteria
 * @param cb error first callback
 * @returns {*}
 */
Spending.prototype.findOne = function (criteria, cb) {

    //returns 1 mocked item
    return cb(null, SpendingInstanceMock);
};

/**
 * Find all elements with the criteria
 * @param criteria
 * @param cb error first callback
 * @returns {*}
 */
Spending.prototype.find = function (criteria, cb) {

    //returns 3 mocked item
    return cb(null, [SpendingInstanceMock, SpendingInstanceMock, SpendingInstanceMock]);
};

/**
 * Save the item to the db
 * @param cb error first callback
 * @returns {*}
 */
Spending.prototype.save = function (cb) {
    return cb(null, this);
};

module.exports.Spending = Spending;
