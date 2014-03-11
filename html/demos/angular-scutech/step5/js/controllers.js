var scutechApp = angular.module('scutechApp', []);

scutechApp.controller('ListCtrl', ['$scope', '$http',
    function ($scope, $http) {
        $http.get('data/products.json').success(function(data) {
            $scope.products = data;
        });
        $scope.order = 'age';
    }
]);