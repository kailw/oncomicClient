'use strict';

moduleCommon.controller('homeController', ['$scope', '$location', 'toolService', 'sessionService', '$http', 'countcarritoService',
    function ($scope, $location, toolService, sessionService, $http, countcarritoService) {

        $scope.ruta = $location.path();
        $scope.ob1 = "comic";
        $scope.ob2 = "linea";
        countcarritoService.updateCarrito();

        $http({
            method: 'GET',
            url: 'http://localhost:8081/oncomic/json?ob=' + $scope.ob1 + '&op=getpagex&campo=destacado&id=1&rpp=10&page=1'
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDataComic = response.data.message;
        }, function (response) {
            $scope.ajaxDataComic = response.data.message || 'Request failed';
            $scope.status = response.status;
        });


        $http({
            method: 'GET',
            url: 'http://localhost:8081/oncomic/json?ob=' + $scope.ob2 + '&op=getpagex&campo=id_comic&rpp=10&page=1'
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDataComic = response.data.message;
        }, function (response) {
            $scope.ajaxDataComic = response.data.message || 'Request failed';
            $scope.status = response.status;
        });


        $scope.isActive = toolService.isActive;

    }]);