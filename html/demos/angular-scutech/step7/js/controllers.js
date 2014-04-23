var controllers = angular.module('controllers', []);

controllers.controller('ListCtrl', ['$scope', '$http',
    function ($scope, $http) {
        $http.get('data/products.json').success(function(data) {
            $scope.products = data;
        });
        $scope.order = 'age';
    }
]);

controllers.controller('DetailCtrl', ['$scope', '$routeParams',
    function ($scope, $routeParams) {
        $scope.productId = $routeParams.productId;
    }
]);