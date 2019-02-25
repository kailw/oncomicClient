'use strict'

moduleFactura.controller('facturaPlistLineaUsuarioController', ['$scope', 'toolService', '$http', 'sessionService', '$routeParams', '$location',
    function ($scope, toolService, $http, sessionService, $routeParams, $location) {
        $scope.id = $routeParams.id;
        $scope.idUsuarioFactura;
        $scope.totalPages = 1;
        $scope.ob = "factura";
        $scope.select = ["5", "10", "25", "50", "500"];

        $scope.rpp = 500;

        $scope.page = 1;


        $scope.resetOrder = function () {
            $location.url("user/factura/plistlinea/" + $scope.id + "/10/1");
        };


        $scope.ordena = function (order, align) {
            if ($scope.orderURLServidor === "") {
                $scope.orderURLServidor = "&order=" + order + "," + align;
                $scope.orderURLCliente = order + "," + align;
            } else {
                $scope.orderURLServidor = $scope.orderURLServidor + "-" + order + "," + align;
                $scope.orderURLCliente = $scope.orderURLCliente + "-" + order + "," + align;
            }
            $location.url(`user/factura/plistfactura/` + $scope.id + `/` + $scope.rpp + `/` + $scope.page + `/` + $scope.orderURLCliente);
        };

        //getcount
        $http({
            method: 'GET',
            url: 'http://localhost:8081/oncomic/json?ob=linea&op=getcount&campo=id_factura&id=' + $scope.id
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDatoLineaFactura = response.data.message;
            $scope.totalPages = Math.ceil($scope.ajaxDatoLineaFactura / $scope.rpp);
            if ($scope.page > $scope.totalPages) {
                $scope.page = $scope.totalPages;
                $scope.update();
            }
            $http({
                method: 'GET',
                url: 'http://localhost:8081/oncomic/json?ob=linea&op=getpagex&rpp=' + $scope.rpp + '&page=1&campo=id_factura&id=' + $scope.id
            }).then(function (response) {
                $scope.status = response.status;
                $scope.ajaxDatoLineaFactura = response.data.message;
            }, function (response) {
                $scope.status = response.status;
                $scope.ajaxDatoLineaFactura = response.data.message || 'Request failed';
            });
            pagination2();
        }, function (response) {
            $scope.ajaxDatoLineaFactura = response.data.message || 'Request failed';
            $scope.status = response.status;
        });






        $scope.update = function () {
            $location.url(`user/factura/plistlinea/` + $scope.id + `/` + $scope.rpp + `/` + $scope.page + '/' + $scope.orderURLCliente);
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



    }
]);