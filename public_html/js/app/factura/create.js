'use strict';

moduleFactura.controller('facturaCreateController', ['$scope', '$http', '$location', 'toolService', '$routeParams', 'sessionService',
    function ($scope, $http, $location, toolService, $routeParams, sessionService) {
        $scope.id = $routeParams.id;

        $scope.ob = "factura";

        $scope.ajaxDatoFactura = {
            id: null,
            fecha: null,
            iva: null
        };


        $scope.guardar = function () {
            var json = {
                id: null,
                fecha: $scope.myDate,
                iva: $scope.iva,
                id_usuario: $scope.ajaxDatoFactura.id
            };
            $http({
                method: 'GET',
                withCredentials: true,
                url: 'http://localhost:8081/oncomic/json?ob=' + $scope.ob + '&op=create',
                params: {json: JSON.stringify(json)}
            }).then(function (response) {
                $scope.status = response.status;
                $scope.mensaje = true;
                $scope.idCreado = response.data.message.id;
            }, function (response) {
                $scope.ajaxDatoFactura = response.data.message || 'Request failed';
                $scope.status = response.status;
            });
        };

        $scope.usuarioView = function (id) {
            if (id > 0 && id !== undefined) {
                $location.url("usuario/view/" + id);
            } else {                  
            }
        };

        $scope.isActive = toolService.isActive;

        $scope.usuarioRefresh = function (quiensoy, consulta) {
            var form = quiensoy;
            if ($scope.vacio === "") {
                $scope.vacio;
            } else {
                $scope.vacio = "";
            }
            if (consulta) {
                $http({
                    method: 'GET',
                    url: 'http://localhost:8081/oncomic/json?ob=usuario&op=get&id=' + $scope.ajaxDatoFactura.id
                }).then(function (response) {
                    $scope.ajaxDatoFactura = response.data.message;
                    if ($scope.ajaxDatoFactura !== null) {
                        form.userForm.id_Usuario.$setValidity('valid', true);
                    } else {
                        form.userForm.id_Usuario.$setValidity('valid', false);
                        $scope.vacio = "Error al acceder al usuario";
                    }

                }, function (response) {
                    form.userForm.id_Usuario.$setValidity('valid', false);
                    $scope.ajaxDatoFactura.nombre = "Error al acceder al usuario";
                });
            } else {
                form.userForm.id_Usuario.$setValidity('valid', true);
            }
        };
        //CALENDARIO


        $scope.myDate = new Date();

        $scope.minDate = new Date(
                $scope.myDate.getFullYear(),
                $scope.myDate.getMonth() - 2,
                $scope.myDate.getDate());

        $scope.maxDate = new Date(
                $scope.myDate.getFullYear(),
                $scope.myDate.getMonth() + 2,
                $scope.myDate.getDate());




    }]);