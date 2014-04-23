var scutechApp = angular.module('scutechApp', [
    'ngRoute',
    'controllers'
]);

scutechApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/products', {
                templateUrl: 'partials/list.html',
                controller: 'ListCtrl'
            }).
            when('/products/:productId', {
                templateUrl: 'partials/detail.html',
                controller: 'DetailCtrl'
            }).
            otherwise({
                redirectTo: '/products'
            });
    }]);