'use strict';

moduleCommon.controller('homeController', ['$scope', '$location', 'toolService', '$http', 'addCartService',
    function ($scope, $location, toolService, $http, addCartService) {

        $scope.ruta = $location.path();
        $scope.ob1 = "comic";
        $scope.ob2 = "linea";
        


        $scope.estiloComic = {
            backgroundSize: "cover",
            backgroundPosition: "center center",
            borderRadius: "5px",
            border: "2px outset black",
            boxShadow: "4px 3px 2px #2F3031"
        }


        $http({
            method: 'GET',
            url: 'http://localhost:8081/oncomic/json?ob=' + $scope.ob1 + '&op=getpagex&campo=destacado&id=1&rpp=20&page=1'
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDataComicDestacados = response.data.message;
        }, function (response) {
            $scope.ajaxDataComic = response.data.message || 'Request failed';
            $scope.status = response.status;
        });

        $http({
            method: 'GET',
            url: 'http://localhost:8081/oncomic/json?ob=' + $scope.ob1 + '&op=getpage&rpp=10000&page=1'
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDataComics = response.data.message;
        }, function (response) {
            $scope.ajaxDataComic = response.data.message || 'Request failed';
            $scope.status = response.status;
        });

        $http({
            method: 'GET',
            url: 'http://localhost:8081/oncomic/json?ob=' + $scope.ob2 + '&op=getpagex&campo=id_comic&rpp=10&page=1'
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDataComicMasVendidos = response.data.message;
        }, function (response) {
            $scope.ajaxDataComic = response.data.message || 'Request failed';
            $scope.status = response.status;
        });



        $scope.add = function (id, ev) {
            addCartService.add(id, ev);
        };


        $scope.isActive = toolService.isActive;

    }]);
