angular.module('statementsApp', ['ui.bootstrap'])

    .controller('statementsCtrl', ['$scope', '$http', function($scope, $http) {
        $scope.status = {
            monthPickerOpened: false
        };

        $scope.statementMonth = new Date();
        $scope.monthChanged = getStatement;

        getStatement();

        function totalAmount(spendings) {
            var total_amount = 0;
            spendings.forEach(function (spending) {
                total_amount += spending.sum;
            });
            return total_amount;
        }

        function getStatement() {
            var date = $scope.statementMonth;
            var from = new Date(date.getFullYear(), date.getMonth());
            var to = new Date(date.getFullYear(), date.getMonth() + 1);

            $http.get('/statements/get', {
                params: {
                    from: from,
                    to: to
                }
            }).success(function(result) {
                $scope.statements = result;
                $scope.total_amount = totalAmount(result);
            });
        }

        $scope.openMonthPicker = function($event) {
            $scope.status.monthPickerOpened = true;
        };

}]);
