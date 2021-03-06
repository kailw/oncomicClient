'use strict';

moduleAutor.controller('autorCreateController', ['$scope', '$http', 'toolService', '$routeParams', 'sessionService',
    function ($scope, $http, toolService, $routeParams, sessionService) {
        $scope.id = $routeParams.id;
        $scope.ob = "autor";


        $scope.guardar = function () {
            var json = {
                id: null,
                nombre: $scope.nombre
            }
            $http({
                method: 'GET',
                withCredentials: true,
                url: 'http://localhost:8081/oncomic/json?ob=' + $scope.ob + '&op=create',
                params: {json: JSON.stringify(json)}
            }).then(function (response) {
                $scope.status = response.status;
                $scope.mensaje = true;
                $scope.idCreado = response.data.message.id;
            }, function (response) {
                $scope.status = response.status;
            });
        };
        $scope.isActive = toolService.isActive;

    }]);