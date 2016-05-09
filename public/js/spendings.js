angular.module('spendingsApp', ['ui.bootstrap'])

    .config(['uibDatepickerConfig', function(uibDatepickerConfig) {
        uibDatepickerConfig.startingDay = 1;
    }])

    .controller('spendingsCtrl', ['$scope', '$http', function($scope, $http) {
        $scope.alerts = [];
        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };

        $scope.spendingCategories = [
            "Food",
            "Living",
            "Entertainment",
            "Clothes",
            "Medical",
            "Beauty",
            "Gift",
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
            var params = {
                from: new Date(date.getFullYear(), date.getMonth()),
                to: new Date(date.getFullYear(), date.getMonth() + 1)
            };

            $http.get('/spendings/get', { params: params }).then(function successCallback (result) {
                $scope.spendings = result.data;
                $scope.total_amount = totalAmount(result.data);
            }, function errorCallback (result) {
                $scope.alerts.push({ type: 'danger', msg: result.data || result.statusText || 'Service unavailable!' });
            });
        }

        $scope.addSpending = function () {
            var data = {
                amount: $scope.addSpendingData.amount,
                category: $scope.addSpendingData.category,
                date: $scope.addSpendingData.date,
                item: $scope.addSpendingData.item
            };

            $http.post('/spendings/add', data).then(function successCallback (result) {
                getSpending();
            }, function errorCallback (result) {
                $scope.alerts.push({ type: 'danger', msg: result.data || result.statusText || 'Service unavailable!' });
            })
        };

        $scope.modifySpending = function (spending) {
            $scope.modifySpendingData = spending;
        };

        $scope.saveModifying = function () {
            var data = {
                id: $scope.modifySpendingData.id,
                amount: $scope.modifySpendingData.amount,
                category: $scope.modifySpendingData.category,
                date: $scope.modifySpendingData.date,
                item: $scope.modifySpendingData.item
            };

            $http.post('/spendings/modify', data).then(function successCallback (result) {
                getSpending();
                $scope.modifySpendingData = {};
            }, function errorCallback (result) {
                $scope.alerts.push({ type: 'danger', msg: result.data || result.statusText || 'Service unavailable!' });
            })
        };

        $scope.cancelModifying = function () {
            getSpending();
            $scope.modifySpendingData = {};
        };

        $scope.deleteSpending = function (spending) {
            var data = {id: spending.id};
            $http.post('/spendings/delete', data).then(function successCallback (result) {
                $scope.spendings.splice($scope.spendings.indexOf(spending),1);
                $scope.total_amount = totalAmount($scope.spendings);
            }, function errorCallback (result) {
                console.log(result);
                $scope.alerts.push({ type: 'danger', msg: result.data || result.statusText || 'Service unavailable!' });
            })
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
