var expect = require('chai').expect;
var getSpendingMW = require('../../../middleware/spending/getSpending');

describe('getSpending middleware', function () {
    it('should return the spending in JSON', function (done) {
        var spendings = "spendings";
        var spendingModelMock = {
            findAll: function (data) {
                return new Promise(function (resolve, reject) {
                    resolve(spendings);
                })
            }
        };

        var req = {
            query: {},
            session: { userId: 1 }
        };
        var res = {
            json: function (result) {
                expect(result).to.equal(spendings);
                done();
            }
        };
        var objectRepository = {
            spendingModel: spendingModelMock
        };

        getSpendingMW(objectRepository)(req, res, function (err) {
        });
    });

    it('should call the error handler if the database has error', function (done) {
        var spendingModelMock = {
            findAll: function (data) {
                return new Promise(function (resolve, reject) {
                    reject("error");
                })
            }
        };

        var req = {
            query: {},
            session: { userId: 1 }
        };
        var res = {};
        var objectRepository = {
            spendingModel: spendingModelMock
        };

        getSpendingMW(objectRepository)(req, res, function (err) {
            expect(err).to.not.equal(undefined);
            done();
        });
    });

});
