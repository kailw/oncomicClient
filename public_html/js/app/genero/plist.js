'use strict';

moduleGenero.controller('generoPlistController', ['$scope', '$http', '$location', 'toolService', '$routeParams', 'sessionService',
    function ($scope, $http, $location, toolService, $routeParams, sessionService) {

        $scope.ob = "genero";
        $scope.totalPages = 1;
        $scope.select = ["5", "10", "25", "50", "500"];

        if (!$routeParams.order) {
            $scope.orderURLServidor = "";
            $scope.orderURLCliente = "";
        } else {
            $scope.orderURLServidor = "&order=" + $routeParams.order;
            $scope.orderURLCliente = $routeParams.order;
        }

        if (!$routeParams.rpp) {
            $scope.rpp = "10";
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

        //getcount
        $http({
            method: 'GET',
            url: "http://localhost:8081/oncomic/json?ob=" + $scope.ob + "&op=getcount"
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDataTipoproductoNumber = response.data.message;
            $scope.totalPages = Math.ceil($scope.ajaxDataTipoproductoNumber / $scope.rpp);
            if ($scope.page > $scope.totalPages) {
                $scope.page = $scope.totalPages;
                $scope.update();
            }
            pagination2();
        }, function (response) {
            $scope.ajaxDataTipoproductoNumber = response.data.message || 'Request failed';
            $scope.status = response.status;
        });

        $http({
            method: 'GET',
            url: "http://localhost:8081/oncomic/json?ob=" + $scope.ob + "&op=getpage&rpp=" + $scope.rpp + "&page=" + $scope.page + $scope.orderURLServidor
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDataTipoproducto = response.data.message;
        }, function (response) {
            $scope.status = response.status;
            $scope.ajaxDataTipoproducto = response.data.message || 'Request failed';
        });



        $scope.update = function () {
            $location.url($scope.ob + "/plist/" + $scope.rpp + "/" + $scope.page + "/" + $scope.orderURLCliente);
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

        $scope.isActive = toolService.isActive;
    }

]);