'use strict';

moduleColeccion.controller('coleccionEditController', ['$scope', '$http', '$location', 'toolService', '$routeParams', 'sessionService',
    function ($scope, $http, $location, toolService, $routeParams, sessionService) {
        $scope.id = $routeParams.id;
        $scope.ob = "coleccion";

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


        $scope.guardar = function () {
            var json = {
                id: $scope.ajaxDataColeccion.id,
                desc: $scope.ajaxDataColeccion.desc
            };

            var config = {
                method: 'GET',
                withCredentials: true,
                url: 'http://localhost:8081/oncomic/json?ob=' + $scope.ob + '&op=update',
                params: {json: JSON.stringify(json)}
            };

            $http(config)
                    .success(function (status) {
                        $scope.status = status;
                        $scope.mensaje = true;
                    }).error(function (response) {
                $scope.ajaxDataColeccion = response.data.message || 'Request failed';
                $scope.status = response.status;
            });
        };
        $scope.isActive = toolService.isActive;

    }]);