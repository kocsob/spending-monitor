var spendingsApp = angular.module('spendingsApp', []);

spendingsApp.controller('spendingsCtrl', function($scope, $http) {
    $http.get('spendings/get').success(function(data) {
        $scope.spendings = data;
    });
});
