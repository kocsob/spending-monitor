/**
 * User model (mock)
 * @constructor
 */
var User = function () {
};

/**
 * An instance
 * @type {{id: number, name: string, email: string, pass: string}}
 */
var UserInstanceMock = [
    {
        id: 1,
        name: 'pistike',
        email: 'pistike@vagyok.en',
        pass: 'asdasd'
    },
    {
        id: 2,
        name: 'bela',
        email: 'bela@vagyok.en',
        pass: 'asdasd'
    },
    {
        id: 2,
        name: 'janos',
        email: 'janos@vagyok.en',
        pass: 'asdasd'
    }
];

/**
 * Find one element with the criteria
 * @param criteria
 * @param cb error first callback
 * @returns {*}
 */
User.prototype.findOne = function (criteria, cb) {

    //returns 1 mocked item
    return cb(null, UserInstanceMock[0]);
};

/**
 * Find all elements with the criteria
 * @param criteria
 * @param cb error first callback
 * @returns {*}
 */
User.prototype.find = function (criteria, cb) {

    //returns 3 mocked item
    return cb(null, UserInstanceMock);
};

/**
 * Save the item to the db
 * @param cb error first callback
 * @returns {*}
 */
User.prototype.save = function (cb) {
    return cb(null, this);
};

module.exports = User;
