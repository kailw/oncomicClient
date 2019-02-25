'use strict';

moduleComic.controller('productoViewUsuarioController', ['$scope', '$http', '$location', 'toolService', '$routeParams', 'sessionService',
    function ($scope, $http, $location, toolService, $routeParams, sessionService) {
        $scope.id = $routeParams.id;

        $http({
            method: 'GET',
            url: '/json?ob=producto&op=get&id=' + $scope.id
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDatoProducto = response.data.message;
        }, function (response) {
            $scope.ajaxDatoProducto = response.data.message || 'Request failed';
            $scope.status = response.status;
        });

        $scope.isActive = toolService.isActive;

    }]);