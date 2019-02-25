'use strict';

moduleAutor.controller('autorViewController', ['$scope', '$http', '$location', 'toolService', '$routeParams', 'sessionService',
    function ($scope, $http, $location, toolService, $routeParams, sessionService) {
        $scope.id = $routeParams.id;
        $scope.ob = "autorespecialidad";

        $http({
            method: 'GET',
            url: 'http://localhost:8081/oncomic/json?ob=' + $scope.ob + '&op=getpagex&campo=id_autor&id=' + $scope.id + '&rpp=1000' + '&page=1'
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDatoAutorNombre = response.data.message[0].obj_autor;
            $scope.ajaxDatoAutorEspecialidad = response.data.message;
        }, function (response) {
            $scope.ajaxDatoAutorEspecialidad = response.data.message || 'Request failed';
            $scope.status = response.status;
        });

        $scope.isActive = toolService.isActive;

    }]);