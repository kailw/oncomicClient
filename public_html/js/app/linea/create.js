'use strict';

moduleLinea.controller('lineaCreateController', ['$scope', '$http', '$location', 'toolService', '$routeParams', 'sessionService',
    function ($scope, $http, $location, toolService, $routeParams, sessionService) {
        $scope.id_factura = $routeParams.id;

        $scope.ob = "linea";
        $scope.ajaxDatoProducto = {
            id: null,
            desc: null
        };


        $scope.guardar = function () {
            var json = {
                id: null,
                cantidad: $scope.cantidad,
                id_producto: $scope.ajaxDatoProducto.id,
                id_factura: $routeParams.id
            };
            
            $http({
                method: 'GET',
                withCredentials: true,
                url: 'http://localhost:8081/oncomic/json?ob=' + $scope.ob + '&op=create',
                params: {json: JSON.stringify(json)}
            }).then(function (response) {
                $scope.status = response.status;
                $scope.mensaje = true;
            }, function (response) {
                $scope.ajaxDatoFactura = response.data.message || 'Request failed';
                $scope.status = response.status;
            });
        };


        $scope.isActive = toolService.isActive;

        $scope.productoRefresh = function (quiensoy, consulta) {
            var form = quiensoy;
            if ($scope.vacio === "") {
                $scope.vacio;
            } else {
                $scope.vacio = "";
            }
            if (consulta) {
                $http({
                    method: 'GET',
                    url: 'http://localhost:8081/oncomic/json?ob=producto&op=get&id=' + $scope.ajaxDatoProducto.id
                }).then(function (response) {
                    $scope.ajaxDatoProducto = response.data.message;
                    if ($scope.ajaxDatoProducto !== null) {
                        form.userForm.id_producto.$setValidity('valid', true);
                    } else {
                        form.userForm.id_producto.$setValidity('valid', false);
                        $scope.vacio = "Error al acceder al usuario";
                    }

                }, function (response) {
                    form.userForm.id_producto.$setValidity('valid', false);
                    $scope.ajaxDatoProducto.desc = "Error al acceder al usuario";
                });
            } else {
                form.userForm.id_producto.$setValidity('valid', true);
            }
        };

    }]);