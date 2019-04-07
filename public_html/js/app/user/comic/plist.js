'use strict';

moduleComic.controller('comicPlistUsuarioController', ['$scope', '$http', '$location', 'toolService', '$routeParams', 'sessionService', '$route', 'addCartService', '$mdDialog',
    function ($scope, $http, $location, toolService, $routeParams, sessionService, $route, addCartService, $mdDialog) {

        $scope.totalPages = 1;
        $scope.select = ["4", "8", "12", "24", "50", "500"];
        $scope.ob = "comic";
        $scope.ob2 = "genero";
        $scope.ajaxDataProductos = "";

        if (!$routeParams.order) {
            $scope.orderURLServidor = "";
            $scope.orderURLCliente = "";
        } else {
            $scope.orderURLServidor = "&order=" + $routeParams.order;
            $scope.orderURLCliente = $routeParams.order;
        }

        if (!$routeParams.rpp) {
            $scope.rpp = "12";
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


        $scope.estiloComic = {
            backgroundSize: "cover",
            backgroundPosition: "center center",
            borderRadius: "5px",
            border: "2px outset black",
            boxShadow: "4px 3px 2px #2F3031"
        }





        $scope.resetOrder = function () {
            $location.url("user/" + $scope.ob + "/plist/8/1");
            $scope.activar = "false";
        };


        $scope.add = function (id, ev) {
            addCartService.add(id, ev);
            cartAnimation('#carritoBoton', 'shake');
        };



        function cartAnimation(element, animationName, callback) {
            const node = document.querySelector(element)
            node.classList.add('animated', animationName)

            function handleAnimationEnd() {
                node.classList.remove('animated', animationName)
                node.removeEventListener('animationend', handleAnimationEnd)

                if (typeof callback === 'function') callback()
            }

            node.addEventListener('animationend', handleAnimationEnd)
        }

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

        //getpage
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
            url: 'http://localhost:8081/oncomic/json?ob=' + $scope.ob + '&op=getpage&rpp=10000&page=1'
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDataProductosTodos = response.data.message;
        }, function (response) {
            $scope.status = response.status;
            $scope.ajaxDataProductosTodos = response.data.message || 'Request failed';
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
        $scope.selectedGenero = [];
        $scope.selectedEditorial = [];
        $scope.selectedIdioma = [];
        $scope.descuento = 3;
        $scope.contador = 0;
        $scope.errorBusqueda = false;
        $scope.busquedaAvanzada = function (ev) {


            $mdDialog.show({
                locals: { dataToPass: $scope.ajaxDataProductos },
                templateUrl: 'js/app/user/comic/busquedaAvanzada.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                scope: $scope,
                fullscreen: true, // Only for -xs, -sm breakpoints.
                // controllerAs: 'c',
                controller: DialogController,
                preserveScope: true

            });




            function DialogController($scope) {

                $http({
                    method: 'GET',
                    url: 'http://localhost:8081/oncomic/json?ob=genero&op=getpage&rpp=20&page=1'
                }).then(function (response) {
                    $scope.status = response.status;
                    $scope.Generos = response.data.message;
                }, function (response) {
                    $scope.status = response.status;
                    $scope.Generos = response.data.message || 'Request failed';
                });


                $http({
                    method: 'GET',
                    url: 'http://localhost:8081/oncomic/json?ob=editorial&op=getpage&rpp=20&page=1'
                }).then(function (response) {
                    $scope.status = response.status;
                    $scope.Editorial = response.data.message;
                }, function (response) {
                    $scope.status = response.status;
                    $scope.Editorial = response.data.message || 'Request failed';
                });

                $http({
                    method: 'GET',
                    url: 'http://localhost:8081/oncomic/json?ob=idioma&op=getpage&rpp=20&page=1'
                }).then(function (response) {
                    $scope.status = response.status;
                    $scope.Idioma = response.data.message;
                }, function (response) {
                    $scope.status = response.status;
                    $scope.Idioma = response.data.message || 'Request failed';
                });





                if ($scope.contador > 0) {
                    $scope.activado = false;
                } else {
                    $scope.activado = true;
                }


                $scope.descuento = function () {
                    if ($scope.descuento == 3) {
                        $scope.activado = true;
                    } else {
                        $scope.activado = false;
                    }
                }


                $scope.toggle = function (item, list) {
                    var idx = list.indexOf(item);

                    if (idx > -1) {
                        list.splice(idx, 1);
                        $scope.contador -= 1;
                    } else {
                        list.push(item);
                        $scope.contador += 1;
                    }


                    if ($scope.contador > 0) {
                        $scope.activado = false;
                    } else if ($scope.descuento == 3) {
                        $scope.activado = true;
                    } else {
                        $scope.activado = false;
                    }
                };



                $scope.exists = function (item, list) {
                    return list.indexOf(item) > -1;
                };



                $scope.hide = function () {
                    $mdDialog.hide();
                };

                $scope.cancel = function () {
                    $mdDialog.cancel();
                };

                $scope.answer = function (answer) {
                    $mdDialog.hide(answer);
                };


                $scope.rpp = 10000;
                $scope.urlComienzo = "http://localhost:8081/oncomic/json?ob=comic&op=getpagecomicadvanced&rpp=" + $scope.rpp + "&page=" + $scope.page;

                $scope.buscar = function () {
                    if ($scope.selectedGenero.length >= 1) {
                        $scope.urlComienzo += '&campogenero=' + $scope.selectedGenero;
                    }

                    if ($scope.selectedEditorial.length >= 1) {
                        $scope.urlComienzo += '&campoeditorial=' + $scope.selectedEditorial;
                    }

                    if ($scope.selectedIdioma.length >= 1) {
                        $scope.urlComienzo += '&campoidioma=' + $scope.selectedIdioma;
                    }


                    if ($scope.descuento == 1 || $scope.descuento == 0) {
                        $scope.urlComienzo += '&campodescuento=' + $scope.descuento;
                    }


                    $scope.urlFinal = $scope.urlComienzo;

                    $http({
                        method: 'GET',
                        url: $scope.urlFinal
                    }).then(function (response) {
                        $scope.status = response.status;
                        $scope.ajaxDataProductos = response.data.message;
                        if ($scope.ajaxDataProductos.length < 1) {
                            $scope.errorBusqueda = true;
                        } else {
                            $scope.errorBusqueda = false;
                        }
                        //getcount
                        $http({
                            method: 'GET',
                            url: 'http://localhost:8081/oncomic/json?ob=' + $scope.ob + '&op=getcount'
                        }).then(function (response) {
                            $scope.status = response.status;
                            $scope.ajaxDataProductosNumber = $scope.ajaxDataProductos.length + 1;
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


                    }, function (response) {
                        $scope.status = response.status;
                        $scope.errorBusqueda = true;
                        $scope.ajaxDataProductos = response.data.message || 'Request failed';
                    });







                    $mdDialog.hide();





                };

            };
        };

        // function DialogController($scope, $mdDialog) {
        //     var self = this;

        //     $http({
        //         method: 'GET',
        //         url: 'http://localhost:8081/oncomic/json?ob=genero&op=getpage&rpp=20&page=1'
        //     }).then(function (response) {
        //         self.status = response.status;
        //         self.Generos = response.data.message;
        //     }, function (response) {
        //         self.status = response.status;
        //         self.Generos = response.data.message || 'Request failed';
        //     });


        //     self.selected = [];


        //     self.toggle = function (item, list) {
        //         var idx = list.indexOf(item);
        //         if (idx > -1) {
        //             list.splice(idx, 1);
        //         }
        //         else {
        //             list.push(item);
        //         }
        //     };

        //     self.exists = function (item, list) {
        //         return list.indexOf(item) > -1;
        //     };



        //     self.hide = function () {
        //         $mdDialog.hide();
        //     };

        //     self.cancel = function () {
        //         $mdDialog.cancel();
        //     };

        //     self.answer = function (answer) {
        //         $mdDialog.hide(answer);
        //     };


        //     self.buscar = function () {

        //         $http({
        //             method: 'GET',
        //             url: 'http://localhost:8081/oncomic/json?ob=comic&op=getpagecomicadvanced&rpp=20&page=1&campogenero=' + self.selected[0]
        //         }).then(function (response) {
        //             self.status = response.status;
        //             self.ajaxDataProductos = response.data.message;

        //             $mdDialog.cancel();
        //         }, function (response) {
        //             self.status = response.status;
        //             self.ajaxDataProductos = response.data.message || 'Request failed';
        //         });

        //     };


        // }
        $scope.recargar = function () {
            $scope.selectedGenero = [];
            $scope.selectedEditorial = [];
            $scope.selectedIdioma = [];
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
            $scope.errorBusqueda = false;
        }

        $scope.isActive = toolService.isActive;

    }





]);