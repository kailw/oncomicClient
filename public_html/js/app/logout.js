"use strict";

moduleUsuario.controller("usuarioLogoutController", ["$scope", "$http", "$routeParams", "toolService", 'sessionService', '$location','countcarritoService',
    function ($scope, $http, $routeParams, toolService, sessionService, $location,countcarritoService) {

        $http({
            method: 'GET',
            url: 'http://localhost:8081/oncomic/json?ob=usuario&op=logout'
        }).then(function (response) {
            $scope.ajaxDatoLogin = response.data.message;
            if (response.status === 200) {
                sessionService.setSessionInactive();
                sessionService.setUserName("");
                sessionService.setId();
                countcarritoService.updateCarrito();
                $scope.loginH = false;
            }
            $scope.loginH = false;
        }, function (response) {
            $scope.ajaxDatoLogin = response.data.message || 'Request Failed';
        });

        sessionService.setSessionInactive();



        $scope.isActive = toolService.isActive;
    }
]);