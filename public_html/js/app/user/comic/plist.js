'use strict';

moduleComic.controller('comicPlistUsuarioController', ['$scope', '$http', '$location', 'toolService', '$routeParams', 'sessionService', '$route', '$mdDialog', 'countcarritoService',
    function ($scope, $http, $location, toolService, $routeParams, sessionService, $route, $mdDialog, countcarritoService) {

        $scope.totalPages = 1;
        $scope.select = ["4", "8", "12", "24", "50", "500"];
        $scope.ob = "comic";
        $scope.ob2 = "genero";

        countcarritoService.updateCarrito();
        if (!$routeParams.order) {
            $scope.orderURLServidor = "";
            $scope.orderURLCliente = "";
        } else {
            $scope.orderURLServidor = "&order=" + $routeParams.order;
            $scope.orderURLCliente = $routeParams.order;
        }

        if (!$routeParams.rpp) {
            $scope.rpp = "8";
        } else {
            $scope.rpp = $routeParams.rpp;
        }

        if (!$routeParams.page) {
            $scope.page = 1;
        } else {
            if ($routeParams.page >= 1) {
                $scope.page = $routeParams.page;
            } else {
                $scope.page = 1;
            }
        }


        $scope.resetOrder = function () {
            $location.url("user/" + $scope.ob + "/plist/8/1");
            $scope.activar = "false";
        };


        $scope.add = function (id, ev) {
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
                            $scope.showAlert('Has elegido el maximo de existencias del comic:' + response.data.message[i].obj_Comic.desc, " Cantidad:" + $scope.ajaxDataCantidad, ev);

                        } else {
                            $scope.showAlert("Has añadido el comic: " + $scope.ajaxDataTitulo + " a tu carrito", "Cantidad:" + $scope.ajaxDataCantidad,ev);
                        }
                    }
                }
                countcarritoService.updateCarrito();

            }, function (response) {
                $scope.status = response.status;
                $scope.error = $scope.status + " " + response.message || 'Request failed';
            });
        };

        $scope.ordena = function (order, align) {
            if ($scope.orderURLServidor === "") {
                $scope.orderURLServidor = "&order=" + order + "," + align;
                $scope.orderURLCliente = order + "," + align;
            } else {
                $scope.orderURLServidor += "-" + order + "," + align;
                $scope.orderURLCliente += "-" + order + "," + align;
            }
            ;
            $location.url("user/" + $scope.ob + "/plist/" + $scope.rpp + "/" + $scope.page + "/" + $scope.orderURLCliente);
        };

        //getcount
        $http({
            method: 'GET',
            url: 'http://localhost:8081/oncomic/json?ob=' + $scope.ob + '&op=getcount'
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDataProductosNumber = response.data.message;
            $scope.totalPages = Math.ceil($scope.ajaxDataProductosNumber / $scope.rpp);
            if ($scope.page > $scope.totalPages) {
                $scope.page = $scope.totalPages;
                $scope.update();
            }
            pagination2();
        }, function (response) {
            $scope.ajaxDataProductosNumber = response.data.message || 'Request failed';
            $scope.status = response.status;
        });

        $http({
            method: 'GET',
            url: 'http://localhost:8081/oncomic/json?ob=' + $scope.ob + '&op=getpage&rpp=' + $scope.rpp + '&page=' + $scope.page + $scope.orderURLServidor
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDataProductos = response.data.message;
        }, function (response) {
            $scope.status = response.status;
            $scope.ajaxDataProductos = response.data.message || 'Request failed';
        });


        $http({
            method: 'GET',
            url: 'http://localhost:8081/oncomic/json?ob=' + $scope.ob2 + '&op=getpage&rpp=' + $scope.rpp + '&page=' + $scope.page + $scope.orderURLServidor
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDatoComicGenero = response.data.message;
        }, function (response) {
            $scope.status = response.status;
            $scope.ajaxDatoComicGenero = response.data.message || 'Request failed';
        });



        $scope.update = function () {
            $location.url("user/" + $scope.ob + "/plist/" + $scope.rpp + "/" + $scope.page + "/" + $scope.orderURLCliente);
        };

        //paginacion neighbourhood
        function pagination2() {
            $scope.list2 = [];
            $scope.neighborhood = 1;
            for (var i = 1; i <= $scope.totalPages; i++) {
                if (i === $scope.page) {
                    $scope.list2.push(i);
                } else if (i <= $scope.page && i >= ($scope.page - $scope.neighborhood)) {
                    $scope.list2.push(i);
                } else if (i >= $scope.page && i <= ($scope.page - -$scope.neighborhood)) {
                    $scope.list2.push(i);
                } else if (i === ($scope.page - $scope.neighborhood) - 1) {
                    if ($scope.page >= 4) {
                        $scope.list2.push("...");
                    }
                } else if (i === ($scope.page - -$scope.neighborhood) + 1) {
                    if ($scope.page <= $scope.totalPages - 3) {
                        $scope.list2.push("...");
                    }
                }
            }
        }
        ;

        $scope.isActive = toolService.isActive;

        $scope.showAlert = function (titulo, description, ev) {
            $mdDialog.show(
                    $mdDialog.alert()
                    .clickOutsideToClose(true)
                    .title(titulo)
                    .textContent(description)
                    .ariaLabel('Alert Dialog Demo')
                    .ok('OK!')
                    .targetEvent(ev)
                    );
        };
    }



]);