angular.module('spendingsApp', ['ui.bootstrap'])

    .config(['uibDatepickerConfig', function(uibDatepickerConfig) {
        uibDatepickerConfig.startingDay = 1;
    }])

    .controller('spendingsCtrl', ['$scope', '$http', function($scope, $http) {
        $scope.status = {
            datePickerOpened: false,
            monthPickerOpened: false
        };

        $scope.formdata = {
            date: new Date(),
            category: "Other"
        };

        $scope.spendingMonth = new Date();
        $scope.monthChanged = getSpending;

        getSpending();

        $scope.addSpending = function () {
            var data = {
                amount: $scope.formdata.amount,
                category: $scope.formdata.category,
                date: $scope.formdata.date,
                item: $scope.formdata.item
            };

            $http.post('/spendings/add', data).success(function (result) {
                data._id = result._id;
                $scope.spendings.push(data);
                $scope.total_amount = totalAmount($scope.spendings);
            });
        };

        $scope.deleteSpending = function (spending) {
            $http.post('/spendings/delete', {_id: spending._id}).success(function () {
                $scope.spendings.splice($scope.spendings.indexOf(spending),1);
                $scope.total_amount = totalAmount($scope.spendings);
            });
        };

        $scope.openDatePicker = function($event) {
            $scope.status.datePickerOpened = true;
        };

        $scope.openMonthPicker = function($event) {
            $scope.status.monthPickerOpened = true;
        };

        function totalAmount(spendings) {
            var total_amount = 0;
            spendings.forEach(function (spending) {
                total_amount += spending.amount;
            });
            return total_amount;
        }

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

}]);
