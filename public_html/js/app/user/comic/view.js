'use strict';

moduleComic.controller('comicViewUsuarioController', ['$scope', '$http', '$location', 'toolService', '$routeParams', 'sessionService', '$mdDialog', 'countcarritoService',
    function ($scope, $http, $location, toolService, $routeParams, sessionService, $mdDialog, countcarritoService) {
        $scope.id = $routeParams.id;
        $scope.ob1 = "comicgenero";
        $scope.ob2 = "autorespecialidad";
        $scope.ob3 = "comiceditorial";
        $scope.ob4 = "comicidioma";

        $scope.add = function (id) {
            $http({
                method: 'GET',
                url: 'http://localhost:8081/oncomic/json?ob=carrito&op=add&comic=' + id + '&cantidad=1'
            }).then(function (response) {
                $scope.ajaxDataCantidadTotal = 0;
                for (var i = 0; i < response.data.message.length; i++) {
                    $scope.ajaxDataCantidadTotal += response.data.message[i].cantidad;
                    if (id === response.data.message[i].obj_Comic.id) {
                        $scope.ajaxDataCantidad = response.data.message[i].cantidad;
                        $scope.ajaxDataTitulo = response.data.message[i].obj_Comic.titulo;
                        $scope.ajaxDataExistencias = response.data.message[i].obj_Comic.existencias;
                        if (response.data.message[i].obj_Comic.existencias === $scope.ajaxDataCantidad) {
                            $scope.showAlert('Has elegido el maximo de existencias del comic:' + response.data.message[i].obj_Comic.desc, " Cantidad:" + $scope.ajaxDataCantidad);

                        } else {
                            $scope.showAlert("Has añadido el comic: " + $scope.ajaxDataTitulo + " a tu carrito", "Cantidad:" + $scope.ajaxDataCantidad);
                        }
                    }
                }
                countcarritoService.updateCarrito();
            }, function (response) {
                $scope.status = response.status;
                $scope.error = $scope.status + " " + response.message || 'Request failed';
            });
        };
        $http({
            method: 'GET',
            url: 'http://localhost:8081/oncomic/json?ob=' + $scope.ob1 + '&op=getpagex&campo=id_comic&id=' + $scope.id + '&rpp=1000' + '&page=1'
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDatoComicGenero = response.data.message;
            $scope.ajaxDatoComic = response.data.message[0].obj_comic;
            $scope.ajaxDatoFecha = response.data.message[0].obj_comic.fechapublicacion;
            var d = new Date($scope.ajaxDatoFecha);
            $scope.fechaformato = d.toLocaleDateString();
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

        $scope.showAlert = function (titulo, description) {
            $mdDialog.show(
                    $mdDialog.alert()
                    .clickOutsideToClose(false)
                    .title(titulo)
                    .textContent(description)
                    .ariaLabel('Alert Dialog Demo')
                    .ok('OK!')
                    );
        };
        $scope.isActive = toolService.isActive;

    }
]);