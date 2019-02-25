'use strict';

moduleColeccion.controller('coleccionViewController', ['$scope', '$http', '$location', 'toolService', '$routeParams', 'sessionService',
    function ($scope, $http, $location, toolService, $routeParams, sessionService) {
        $scope.id = $routeParams.id;
        $scope.ob = "coleccion";
        $scope.ob2 = "comic";

        $http({
            method: 'GET',
            url: 'http://localhost:8081/oncomic/json?ob=' + $scope.ob + '&op=get&id=' + $scope.id
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDataColeccion = response.data.message;
        }, function (response) {
            $scope.ajaxDataColeccion = response.data.message || 'Request failed';
            $scope.status = response.status;
        });

        $http({
            method: 'GET',
            url: 'http://localhost:8081/oncomic/json?ob=' + $scope.ob2 + '&op=getpagex&campo=id_coleccion&id=' + $scope.id + '&rpp=1000' + '&page=1'
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDatoComic = response.data.message;
        }, function (response) {            
            $scope.status = response.status;
        });
        $scope.isActive = toolService.isActive;

    }]);