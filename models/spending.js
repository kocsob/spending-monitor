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
var SpendingInstanceMock = [
    {id: 1, date: '2015.10.01', item: 'Dinner',     category: 'Food',         amount: 10},
    {id: 2, date: '2015.10.02', item: 'Car',        category: 'Other',        amount: 1234},
    {id: 3, date: '2015.10.03', item: 'Lunch',      category: 'Food',         amount: 10},
    {id: 4, date: '2015.10.04', item: 'Books',      category: 'Entertainment', amount: 567},
    {id: 5, date: '2015.10.05', item: 'Medicine',   category: 'Medical',      amount: 89},
    {id: 6, date: '2015.10.06', item: 'Dinner',     category: 'Food',         amount: 10},
    {id: 6, date: '2015.10.06', item: 'Grocieries', category: 'Food',         amount: 567}
];

/**
 * Find one element with the criteria
 * @param criteria
 * @param cb error first callback
 * @returns {*}
 */
Spending.prototype.findOne = function (criteria, cb) {

    //returns 1 mocked item
    return cb(null, SpendingInstanceMock[0]);
};

/**
 * Find all elements with the criteria
 * @param criteria
 * @param cb error first callback
 * @returns {*}
 */
Spending.prototype.find = function (criteria, cb) {

    //returns 3 mocked item
    return cb(null, SpendingInstanceMock);
};

/**
 * Save the item to the db
 * @param cb error first callback
 * @returns {*}
 */
Spending.prototype.save = function (cb) {
    return cb(null, this);
};

module.exports = Spending;
