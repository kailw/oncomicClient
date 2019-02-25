'use strict';

moduleGenero.controller('generoViewController', ['$scope', '$http', '$location', 'toolService', '$routeParams', 'sessionService',
    function ($scope, $http, $location, toolService, $routeParams, sessionService) {
        $scope.id = $routeParams.id;
        $scope.ob = "genero";
        $scope.botonGuardar = false;

        $http({
            method: 'GET',
            url: 'http://localhost:8081/oncomic/json?ob=' + $scope.ob + '&op=get&id=' + $scope.id
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDataGenero = response.data.message;
            $("#generodescripcion").css("display", "none !important");
        }, function (response) {
            $scope.ajaxDataGenero = response.data.message || 'Request failed';
            $scope.status = response.status;
        });


        $scope.aparecerBoton = function () {
            $scope.botonGuardar = true;
        };



//        $http({
//            method: 'GET',
//            url: '/json?ob=comicgenero&op=getpagex&id=' + $scope.id + '&campo='+ $scope.campo +'&rpp=1000&page=1'
//        }).then(function (response) {
//            $scope.status = response.status;
//            $scope.ajaxDataGenero = response.data.message;
//        }, function (response) {
//            $scope.ajaxDataGenero = response.data.message || 'Request failed';
//            $scope.status = response.status;
//        });


        $scope.isActive = toolService.isActive;

    }]);