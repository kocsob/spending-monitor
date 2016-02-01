var expect = require('chai').expect;
var deleteSpendingMW = require('../../../middleware/spending/deleteSpending');

describe('deleteSpending middleware', function () {
    it('should return status code 200', function (done) {
        var spendingModelMock = {
            destroy: function (data) {
                return new Promise(function (resolve, reject) {
                    resolve([ 1 ]);
                })
            }
        };

        var req = {
            body: { id: 1},
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
            destroy: function (data) {
                return new Promise(function (resolve, reject) {
                    resolve([ 0 ]);
                })
            }
        };

        var req = {
            body: {id: 1},
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
            destroy: function (data) {
                return new Promise(function (resolve, reject) {
                    reject("error");
                })
            }
        };

        var req = {
            body: {id: 1},
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

    it('should return status code 400 if id does not specified in the reqest body', function (done) {
        var req = {
            body: {id: undefined}
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
