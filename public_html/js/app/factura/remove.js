'use strict';

moduleFactura.controller('facturaRemoveController', ['$scope', '$http', '$location', 'toolService', '$routeParams', 'sessionService',
    function ($scope, $http, $location, toolService, $routeParams, sessionService) {
        $scope.ob = "factura";
        $scope.id = $routeParams.id;

        $http({
            method: 'GET',
            url: 'http://localhost:8081/oncomic/json?ob=' + $scope.ob + '&op=get&id=' + $scope.id
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDatoFactura = response.data.message;
        }, function (response) {
            $scope.ajaxDatoFactura = response.data.message || 'Request failed';
            $scope.status = response.status;
        });
        $scope.tabla = true;
        $scope.mensaje3 = true;

        $scope.eliminar = function (accion) {
            if (accion === "eliminar") {
                $http({
                    method: 'GET',
                    url: 'http://localhost:8081/oncomic/json?ob=' + $scope.ob + '&op=remove&id=' + $scope.id
                }).then(function (response) {
                    $scope.mensaje = true;
                    $scope.mensaje2 = false;
                    $scope.mensaje3 = false;
                    $scope.tabla = false;
                    $scope.status = response.status;
                    $scope.ajaxDatoFactura = response.data.message;
                }, function (response) {
                    $scope.ajaxDatoFactura = response.data.message || 'Request failed';
                    $scope.status = response.status;
                });
            } else {
                $scope.mensaje2 = true;
                $scope.mensaje3 = false;
                $scope.mensaje = false;
                $scope.tabla = true;
            }

        };

        $scope.isActive = toolService.isActive;
    }]);