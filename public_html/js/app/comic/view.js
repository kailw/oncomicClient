'use strict';

moduleComic.controller('comicViewController', ['$scope', '$http', '$location', 'toolService', '$routeParams', 'sessionService',
    function ($scope, $http, $location, toolService, $routeParams, sessionService) {
        $scope.id = $routeParams.id;
        $scope.ob1 = "comicgenero";
        $scope.ob2 = "autorespecialidad";
        $scope.ob3 = "comiceditorial";
        $scope.ob4 = "comicidioma";


        $http({
            method: 'GET',
            url: 'http://localhost:8081/oncomic/json?ob=' + $scope.ob1 + '&op=getpagex&campo=id_comic&id=' + $scope.id + '&rpp=1000' + '&page=1'
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDatoComicGenero = response.data.message;
            $scope.ajaxDatoComic = response.data.message[0].obj_comic;
            $scope.ajaxDatoComicFecha = response.data.message[0].obj_comic.fechapublicacion.toLocaleDateString();
        }, function (response) {
            $scope.ajaxDatoComicGenero = response.data.message || 'Request failed';
            $scope.status = response.status;
        });

        $http({
            method: 'GET',
            url: 'http://localhost:8081/oncomic/json?ob=' + $scope.ob2 + '&op=getpagex&campo=id_comic&id=' + $scope.id + '&rpp=1000' + '&page=1'
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDatoAutorEspecialidad = response.data.message;
        }, function (response) {
            $scope.ajaxDatoAutorEspecialidad = response.data.message || 'Request failed';
            $scope.status = response.status;
        });

        $http({
            method: 'GET',
            url: 'http://localhost:8081/oncomic/json?ob=' + $scope.ob3 + '&op=getpagex&campo=id_comic&id=' + $scope.id + '&rpp=1000' + '&page=1'
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDatoComicEditorial = response.data.message;
        }, function (response) {
            $scope.ajaxDatoComicEditorial = response.data.message || 'Request failed';
            $scope.status = response.status;
        });

        $http({
            method: 'GET',
            url: 'http://localhost:8081/oncomic/json?ob=' + $scope.ob4 + '&op=getpagex&campo=id_comic&id=' + $scope.id + '&rpp=1000' + '&page=1'
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDatoComicIdioma = response.data.message;
        }, function (response) {
            $scope.ajaxDatoComicIdioma = response.data.message || 'Request failed';
            $scope.status = response.status;
        });

        $scope.isActive = toolService.isActive;

    }]);
