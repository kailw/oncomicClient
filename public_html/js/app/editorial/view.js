'use strict';

moduleEditorial.controller('editorialViewController', ['$scope', '$http', '$location', 'toolService', '$routeParams', 'sessionService',
    function ($scope, $http, $location, toolService, $routeParams, sessionService) {
        $scope.id = $routeParams.id;
        $scope.ob = "editorial";

        $http({
            method: 'GET',
            url: 'http://localhost:8081/oncomic/json?ob=' + $scope.ob + '&op=get&id=' + $scope.id
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDataEditorial = response.data.message;
        }, function (response) {
            $scope.ajaxDataEditorial = response.data.message || 'Request failed';
            $scope.status = response.status;
        });
        $scope.isActive = toolService.isActive;

    }]);