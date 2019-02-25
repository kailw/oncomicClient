'use strict';

moduleGenero.controller('generoCreateController', ['$scope', '$http', 'toolService', '$routeParams', 'sessionService',
    function ($scope, $http, toolService, $routeParams, sessionService) {
        $scope.id = $routeParams.id;
        $scope.ob = "genero";


        $scope.guardar = function () {
            var json = {
                id: null,
                desc: $scope.desc.toUpperCase()
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