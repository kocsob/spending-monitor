var expect = require('chai').expect;
var deleteSpendingMW = require('../../../middleware/spending/deleteSpending');

describe('deleteSpending middleware', function () {
    it('should return status code 200', function (done) {
        var spendingModelMock = {
            remove: function (data, cb) {
                cb(undefined, 1)
            }
        };

        var req = {
            body: { _id: 1},
            session: { userId: 1 }
        };
        var res = {
            status: function (result) {
                expect(result).to.equal(200);
                return {
                    end: function () {
                        done();
                    }
                }
            }
        };
        var objectRepository = {
            spendingModel: spendingModelMock
        };

        deleteSpendingMW(objectRepository)(req, res, function (err) {
        });
    });

    it('should return status code 400 if no rows affected', function (done) {
        var spendingModelMock = {
            remove: function (data, cb) {
                cb(undefined, 0)
            }
        };

        var req = {
            body: {_id: 1},
            session: {userId: 1}
        };
        var res = {
            status: function (result) {
                expect(result).to.equal(400);
                return {
                    send: function () {
                        done();
                    }
                }
            }
        };
        var objectRepository = {
            spendingModel: spendingModelMock
        };

        deleteSpendingMW(objectRepository)(req, res, function (err) {
        });
    });

    it('should call the error handler if the database has error', function (done) {
        var spendingModelMock = {
            remove: function (data, cb) {
                cb("error", 0)
            }
        };

        var req = {
            body: {_id: 1},
            session: {userId: 1}
        };
        var res = {};
        var objectRepository = {
            spendingModel: spendingModelMock
        };

        deleteSpendingMW(objectRepository)(req, res, function (err) {
            expect(err).to.not.equal(undefined);
            done();
        })
    });

    it('should return status code 400 if _id does not specified in the reqest body', function (done) {
        var req = {
            body: {_id: undefined}
        };
        var res = {
            status: function (result) {
                expect(result).to.equal(400);
                return {
                    end: function () {
                        done();
                    }
                }
            }
        };
        var objectRepository = {
            spendingModel: function () {}
        };

        deleteSpendingMW(objectRepository)(req, res, function (err) {
        });
    });

});
