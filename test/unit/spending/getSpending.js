var expect = require('chai').expect;
var getSpendingMW = require('../../../middleware/spending/getSpending');

describe('getSpending middleware', function () {
    it('should return the spending in JSON', function (done) {
        var spendings = "spendings";
        var spendingModelMock = function () {};
        spendingModelMock.prototype.find = function () { return this; };
        spendingModelMock.prototype.select = function () { return this; };
        spendingModelMock.prototype.exec = function (cb) {
            cb(undefined, spendings);
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
            spendingModel: new spendingModelMock()
        };

        getSpendingMW(objectRepository)(req, res, function (err) {
        });
    });

    it('should call the error handler if the database has error', function (done) {
        var spendingModelMock = function () {};
        spendingModelMock.prototype.find = function () { return this; };
        spendingModelMock.prototype.select = function () { return this; };
        spendingModelMock.prototype.exec = function (cb) {
            cb("error", undefined);
        };

        var req = {
            query: {},
            session: { userId: 1 }
        };
        var res = {};
        var objectRepository = {
            spendingModel: new spendingModelMock()
        };

        getSpendingMW(objectRepository)(req, res, function (err) {
            expect(err).to.not.equal(undefined);
            done();
        });
    });

});
