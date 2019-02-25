'use strict';

moduleCarrito.controller('carritoPlistController', ['$scope', '$http', '$location', 'toolService', '$routeParams', "sessionService", "$route", "$window", "countcarritoService", "$mdDialog",
    function ($scope, $http, $location, toolService, $routeParams, sessionService, $route, $window, countcarritoService, $mdDialog) {

        $scope.totalPages = 1;
        $scope.select = ["5", "10", "25", "50", "500"];
        $scope.ob = "carrito";
        $scope.error = "";
        $scope.productoComprado = false;
        $scope.usuariologeadoID = sessionService.getId();
        $scope.nologeado = false;
        $scope.carritoVacioTabla = false;
        
        if (!$routeParams.order) {
            $scope.orderURLServidor = "";
            $scope.orderURLCliente = "";
        } else {
            $scope.orderURLServidor = "&order=" + $routeParams.order;
            $scope.orderURLCliente = $routeParams.order;
        }
        countcarritoService.updateCarrito();


        $scope.resetOrder = function () {
            $location.url($scope.ob + "/plist/" + $scope.rpp + "/1");
            $scope.activar = "false";
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
            $location.url($scope.ob + "/plist/" + $scope.rpp + "/" + $scope.page + "/" + $scope.orderURLCliente);
        };



        $http({
            method: 'GET',
            url: 'http://localhost:8081/oncomic/json?ob=' + $scope.ob + '&op=show'
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDataCarritoShow = response.data.message;
            $scope.precioProducto = 0;
            $scope.cantidadProducto = 0;
            if (($scope.ajaxDataCarritoShow === "Carrito vacio") || ($scope.ajaxDataCarritoShow === null)) {
                $scope.carritoVacio = true;
                $scope.carritoVacioTabla = false;
            } else {
                $scope.carritoVacio = false;
                $scope.carritoVacioTabla = true;
                for (var i = 0; i < response.data.message.length; i++) {
                    $scope.precioProducto += (response.data.message[i].obj_Comic.precio * response.data.message[i].cantidad);
                    $scope.cantidadProducto += response.data.message[i].cantidad;
                }
            }
        }, function (response) {
            $scope.status = response.status;
            $scope.error += $scope.status + " " + response.message || 'Request failed';
        });



//        $scope.carrito = function (operacion, id, cantidad) {
//
//            $http({
//                method: 'GET',
//                url: '/json?ob=' + $scope.ob + '&op=' + operacion + '&comic=' + id + '&cantidad=' + cantidad
//            }).then(function (response) {
//                $scope.ajaxDataCarritoShow = response.data.message;
//                $scope.precioProducto = 0;
//                $scope.cantidadProducto = 0;
//                if (response.data.message.length === 0) {
//                    $scope.carritoVacio = true;
//                    $scope.carritoVacioTabla = false;
//                    $scope.cantidadProducto = 0;
//                } else {
//                    if (operacion === "add") {
//                        for (var i = 0; i < response.data.message.length; i++) {
//                            $scope.precioProducto += (response.data.message[i].obj_Comic.precio * response.data.message[i].cantidad);
//                            $scope.cantidadProducto += response.data.message[i].cantidad;
//                        }
//                    }
//
//                    if (operacion === "reduce") {
//                        for (var j = 0; j < response.data.message.length; j++) {
//                            $scope.precioProducto += response.data.message[j].obj_Comic.precio;
//                            $scope.cantidadProducto += response.data.message[j].cantidad;
//                        }
//                    }
//                }
//                countcarritoService.updateCarrito();
//            }, function (response) {
//                $scope.status = response.status;
//                $scope.error = $scope.status + " " + response.message || 'Request failed';
//            });
//        };

        $scope.carrito = function (operacion, id, cantidad) {
            $http({
                method: 'GET',
                url: 'http://localhost:8081/oncomic/json?ob=' + $scope.ob + '&op=' + operacion + '&comic=' + id + '&cantidad=' + cantidad
            }).then(function (response) {
                $scope.ajaxDataCarritoShow = response.data.message;
                $scope.precioProducto = 0;
                $scope.cantidadProducto = 0;
                if (response.data.message.length === 0) {
                    $scope.carritoVacio = true;
                    $scope.carritoVacioTabla = false;
                    $scope.cantidadProducto = 0;
                } else {
                    if (operacion === "add") {

                        for (var i = 0; i < response.data.message.length; i++) {
                            $scope.precioProducto += (response.data.message[i].obj_Comic.precio * response.data.message[i].cantidad);
                            $scope.cantidadProducto += response.data.message[i].cantidad;
                            if (id === response.data.message[i].obj_Comic.id) {
                                if (response.data.message[i].obj_Comic.existencias === response.data.message[i].cantidad) {
                                    $scope.showAlert('Has elegido el máximo de existencias del comic:' + response.data.message[i].obj_Comic.titulo, " Cantidad:" + response.data.message[i].cantidad);
                                }
                            }
                        }

                    }

                    if (operacion === "reduce") {
                        for (var j = 0; j < response.data.message.length; j++) {
                            $scope.precioProducto += (response.data.message[j].obj_Comic.precio * response.data.message[j].cantidad);
                            $scope.cantidadProducto += response.data.message[j].cantidad;
                        }
                    }
                }
                countcarritoService.updateCarrito();
            }, function (response) {
                $scope.status = response.status;
                $scope.error = $scope.status + " " + response.message || 'Request failed';
            });
        };

        $scope.empty = function () {
            $http({
                method: 'GET',
                url: 'http://localhost:8081/oncomic/json?ob=' + $scope.ob + '&op=empty'
            }).then(function (response) {
                $scope.status = response.status;
                $scope.ajaxDataCarritoShow = response.data.message;
                if ($scope.ajaxDataCarritoShow === "Carrito vacio") {
                    $scope.carritoVacio = true;
                    $scope.carritoVacioTabla = false;
                }
                sessionService.setCountCarrito(0);
            }, function (response) {
                $scope.status = response.status;
                $scope.error += $scope.status + " " + response.message || 'Request failed';
            });
        };


        $scope.buy = function () {
            if (sessionService.isSessionActive()) {
                $http({
                    method: 'GET',
                    url: 'http://localhost:8081/oncomic/json?ob=' + $scope.ob + '&op=buy'
                }).then(function (response) {
                    $scope.status = response.status;
                    $scope.ajaxDataCarritoShow = response.data.message;
                    $scope.productoComprado = true;
                    $scope.carritoVacioTabla = false;
                    $scope.carritoVacio = false;
                    console.log($scope.ajaxDataCarritoShow);
                    countcarritoService.updateCarrito();
                }, function (response) {
                    $scope.status = response.status;
                    $scope.error += $scope.status + " " + response.data.message || 'Request failed';
                    console.log($scope.error);
                });
            } else {
                $scope.nologeado = true;
            }
        };

        $scope.update = function () {
            $location.url($scope.ob + "/plist/" + $scope.rpp + "/" + $scope.page + "/" + $scope.orderURLCliente);
        };
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