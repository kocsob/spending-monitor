angular.module('statementsApp', ['ui.bootstrap'])

    .controller('statementsCtrl', ['$scope', '$http', function($scope, $http) {
        $scope.alerts = [];
        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };

        $scope.datapickerOpened = {
            monthPicker: false
        };

        $scope.statementMonth = new Date();
        $scope.monthChanged = getStatement;

        $scope.openMonthPicker = function($event) {
            $scope.datapickerOpened.monthPicker = true;
        };

        getStatement();

        function getStatement() {
            var date = $scope.statementMonth;
            var params = {
                from: new Date(date.getFullYear(), date.getMonth()),
                to: new Date(date.getFullYear(), date.getMonth() + 1)
            };

            $http.get('/statements/get', { params: params }).then(function successCallback (result) {
                $scope.statements = result.data;
                $scope.total_amount = totalAmount(result.data);
            }, function errorCallback (result) {
                $scope.alerts.push({ type: 'danger', msg: result.data || result.statusText || 'Service unavailable!' });
            });
        }

        function totalAmount(spendings) {
            var total_amount = 0;
            spendings.forEach(function (spending) {
                total_amount += spending.sum;
            });
            return total_amount;
        }

}]);
