'use strict';

moduleTipousuario.controller('tipousuarioViewController', ['$scope', '$http', '$location', 'toolService', '$routeParams', 'sessionService',
    function ($scope, $http, $location, toolService, $routeParams, sessionService) {
        $scope.id = $routeParams.id;


        $scope.ob = "tipousuario";
        $http({
            method: 'GET',
            url: 'http://localhost:8081/oncomic/json?ob=' + $scope.ob + '&op=get&id=' + $scope.id
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDataTipousuario = response.data.message;
        }, function (response) {
            $scope.ajaxDataTipousuario = response.data.message || 'Request failed';
            $scope.status = response.status;
        });

        $scope.ob2 = "usuario";
        $http({
            method: 'GET',
            url: 'http://localhost:8081/oncomic/json?ob=' + $scope.ob2 + '&op=getpagex&campo=id_tipousuario&id=' + $scope.id + '&rpp=1000' + '&page=1'
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDataUsuarios = response.data.message;
        }, function (response) {
            $scope.ajaxDataUsuarios = response.data.message || 'Request failed';
            $scope.status = response.status;
        });


        $scope.isActive = toolService.isActive;

    }]);
