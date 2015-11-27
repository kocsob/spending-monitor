angular.module('spendingsApp', ['ui.bootstrap'])

    .config(['uibDatepickerConfig', function(uibDatepickerConfig) {
        uibDatepickerConfig.startingDay = 1;
    }])

    .controller('spendingsCtrl', ['$scope', '$http', function($scope, $http) {
        $scope.spendingCategories = [
            "Food",
            "Entertainment",
            "Medical",
            "Other"
        ];

        $scope.datapickerOpened = {
            addSpending: false,
            modifySpending: false,
            monthPicker: false
        };

        $scope.addSpendingData = {
            date: new Date(),
            category: $scope.spendingCategories[$scope.spendingCategories.length - 1]
        };

        $scope.modifySpendingData = {};

        $scope.spendingMonth = new Date();
        $scope.monthChanged = getSpending;

        getSpending();

        function getSpending() {
            var date = $scope.spendingMonth;
            var from = new Date(date.getFullYear(), date.getMonth());
            var to = new Date(date.getFullYear(), date.getMonth() + 1);

            $http.get('/spendings/get', {
                params: {
                    from: from,
                    to: to
                }
            }).success(function(result) {
                $scope.spendings = result;
                $scope.total_amount = totalAmount(result);
            });
        }

        $scope.addSpending = function () {
            var data = {
                amount: $scope.addSpendingData.amount,
                category: $scope.addSpendingData.category,
                date: $scope.addSpendingData.date,
                item: $scope.addSpendingData.item
            };

            $http.post('/spendings/add', data).success(function (result) {
                getSpending();
            });
        };

        $scope.modifySpending = function (spending) {
            $scope.modifySpendingData = spending;
        };

        $scope.saveModifying = function () {
            var data = {
                _id: $scope.modifySpendingData._id,
                amount: $scope.modifySpendingData.amount,
                category: $scope.modifySpendingData.category,
                date: $scope.modifySpendingData.date,
                item: $scope.modifySpendingData.item
            };

            $http.post('/spendings/modify', data).success(function (result) {
                getSpending();
                $scope.modifySpendingData = {};
            });
        };

        $scope.cancelModifying = function () {
            getSpending();
            $scope.modifySpendingData = {};
        };

        $scope.deleteSpending = function (spending) {
            $http.post('/spendings/delete', {_id: spending._id}).success(function () {
                $scope.spendings.splice($scope.spendings.indexOf(spending),1);
                $scope.total_amount = totalAmount($scope.spendings);
            });
        };

        $scope.openAddSpendingDatePicker = function($event) {
            $scope.datapickerOpened.addSpending = true;
        };

        $scope.openModifySpendingDatePicker = function($event) {
            $scope.datapickerOpened.modifySpending = true;
        };

        $scope.openMonthPicker = function($event) {
            $scope.datapickerOpened.monthPicker = true;
        };

        function totalAmount(spendings) {
            var total_amount = 0;
            spendings.forEach(function (spending) {
                total_amount += spending.amount;
            });
            return total_amount;
        }

}]);
