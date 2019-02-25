"use strict";

moduleUsuario.controller("usuarioRegisterController", ["$scope", "$http", "$routeParams", "toolService", "$location", "sessionService",
    function ($scope, $http, $routeParams, toolService, $location, sessionService) {

        $scope.ob = "usuario";
        $scope.formulario = true;
        $scope.yesLogin = false;
        $scope.errorLogin = false;


        $scope.register = function () {
            var json = {
                id: null,
                dni: $scope.dni,
                nombre: $scope.nombre,
                ape1: $scope.apellido,
                ape2: $scope.apellido2,
                login: $scope.login,
                pass: forge_sha256($scope.pass),
                email: $scope.email,
                id_tipousuario: null,
            };
            $http({
                method: 'GET',
                withCredentials: true,
                url: 'http://localhost:8081/oncomic/json?ob=' + $scope.ob + '&op=create',
                params: {json: JSON.stringify(json)}
            }).then(function (response) {
                $scope.status = response.status;
                $scope.yesLogin = true;
                $scope.formulario = false;
            }, function (response) {
                $scope.ajaxDatoUsuario = response.data.message || 'Request failed';
                $scope.errorLogin = true;
                $scope.status = response.status;
            });
        };


        $scope.isActive = toolService.isActive;
    }
]);