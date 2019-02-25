"use strict";

moduleUsuario.controller("usuarioLoginController", ["$scope", "$http", "$routeParams", "toolService", "$location", "sessionService",
    function ($scope, $http, $routeParams, toolService, $location, sessionService) {


        $scope.formulario = true;
        $scope.log = function () {
            $http({
                method: 'GET',
                header: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                url: 'http://localhost:8081/oncomic/json?ob=usuario&op=login&user=' + $scope.login + '&pass=' + forge_sha256($scope.pass)
            }).then(function (response) {
                if (response.data.status === 200) {
                    sessionService.setSessionActive();
                    sessionService.setUserName(response.data.message.nombre + " " + response.data.message.ape1);
                    sessionService.setId(response.data.message.id);
                    $scope.usuariologeado = sessionService.getUserName();
                    $scope.usuariologeadoID = sessionService.getId();
                    $scope.yesLogin = true;
                    $scope.errorLogin = false;
                    $scope.loginH = true;
                    $scope.formulario = false;
                    $location.url('/');
                } else {
                    $scope.errorLogin = true;
                }

                $scope.ajaxDatoLogin = response.data.message;
            }, function (response) {
                $scope.errorLogin = true;
                $scope.ajaxDatoLogin = response.message || 'Request Failed';
            });
        };

        $scope.resgister = function () {
            $http({
                method: 'GET',
                header: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                url: 'http://localhost:8081/oncomic/json?ob=usuario&op=login&user=' + $scope.login + '&pass=' + forge_sha256($scope.pass)
            }).then(function (response) {
                if (response.data.status === 200) {
                    sessionService.setSessionActive();
                    sessionService.setUserName(response.data.message.nombre + " " + response.data.message.ape1);
                    sessionService.setId(response.data.message.id);
                    $scope.usuariologeado = sessionService.getUserName();
                    $scope.usuariologeadoID = sessionService.getId();
                    $scope.yesLogin = true;
                    $scope.errorLogin = false;
                    $scope.loginH = true;
                    $scope.formulario = false;
                    $location.url('/');
                } else {
                    $scope.errorLogin = true;
                }

                $scope.ajaxDatoLogin = response.data.message;
            }, function (response) {
                $scope.errorLogin = true;
                $scope.ajaxDatoLogin = response.message || 'Request Failed';
            });
        };
        document.getElementById("login").focus();

        $scope.isActive = toolService.isActive;
    }
]);