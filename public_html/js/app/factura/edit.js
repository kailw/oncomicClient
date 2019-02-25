'use strict';

moduleFactura.controller('facturaEditController', ['$scope', '$http', '$location', 'toolService', '$routeParams', 'sessionService',
    function ($scope, $http, $location, toolService, $routeParams, sessionService) {
        $scope.id = $routeParams.id;
        $scope.myDate = new Date();

        $scope.ob = "factura";


        $http({
            method: 'GET',
            url: 'http://localhost:8081/oncomic/json?ob=' + $scope.ob + '&op=get&id=' + $scope.id
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDatoFactura = response.data.message;
            $scope.ajaxDatoFacturaFecha = response.data.message.fecha;
            $scope.resultado = $scope.ajaxDatoFacturaFecha.slice(0, 3);

            switch ($scope.resultado) {
                case "ene":
                    $scope.fecha = $scope.ajaxDatoFacturaFecha.replace("ene", "jan");
                    break;
                case "abr":
                    $scope.fecha = $scope.ajaxDatoFacturaFecha.replace("abr", "apr");
                    break;
                case "ago":
                    $scope.fecha = $scope.ajaxDatoFacturaFecha.replace("ago", "aug");
                    break;
                case "dic":
                    $scope.fecha = $scope.ajaxDatoFacturaFecha.replace("dic", "dec");
                    break;
                default:
                    $scope.fecha = $scope.ajaxDatoFacturaFecha;
                    break;
            }
            $scope.dt = new Date($scope.fecha);
        }, function (response) {
            $scope.ajaxDatoFactura = response.data.message || 'Request failed';
            $scope.status = response.status;
        });


        $scope.guardar = function () {
            var json = {
                id: $scope.ajaxDatoFactura.id,
                fecha: $scope.dt,
                iva: $scope.ajaxDatoFactura.iva,
                id_usuario: $scope.ajaxDatoFactura.obj_Usuario.id
            };
            $http({
                method: 'GET',
                withCredentials: true,
                url: 'http://localhost:8081/oncomic/json?ob=' + $scope.ob + '&op=update',
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

        $scope.usuarioRefresh = function (quiensoy, consulta) {
            var form = quiensoy;
            if (consulta) {
                $http({
                    method: 'GET',
                    url: 'http://localhost:8081/oncomic/json?ob=usuario&op=get&id=' + $scope.ajaxDatoFactura.obj_Usuario.id
                }).then(function (response) {
                    form.userForm.obj_Usuario.$setValidity('valid', true);
                    $scope.ajaxDatoFactura.obj_Usuario = response.data.message;
                }, function (response) {
                    form.userForm.obj_Usuario.$setValidity('valid', false);
                    $scope.ajaxDatoFactura.obj_Usuario.nombre = "Error al acceder al tipo de usuario";
                });
            } else {
                form.userForm.obj_Usuario.$setValidity('valid', true);
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