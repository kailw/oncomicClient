'use strict';

moduleUsuario.controller('usuarioCreateController', ['$scope', '$http', '$location', 'toolService', '$routeParams', 'sessionService',
    function ($scope, $http, $location, toolService, $routeParams, sessionService) {
        $scope.id = $routeParams.id;
        $scope.ob = "usuario";

        $scope.ajaxDatoUsuario = {
            id: null,
            desc: null
        };

        $scope.guardar = function () {
            var json = {
                id: null,
                dni: $scope.dni,
                nombre: $scope.nombre,
                ape1: $scope.ape1,
                ape2: $scope.ape2,
                login: $scope.login,
                pass: forge_sha256($scope.pass),
                email: $scope.email,
                id_tipousuario: $scope.ajaxDatoUsuario.id,
                validacion: $scope.validacion
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
                $scope.ajaxDatoUsuario = response.data.message || 'Request failed';
                $scope.status = response.status;
            });
        };
        $scope.isActive = toolService.isActive;

        $scope.tipoUsuarioRefresh = function (quiensoy, consulta) {
            var form = quiensoy;
            $scope.vacio = "";
            if (consulta) {
                $http({
                    method: 'GET',
                    url: 'http://localhost:8081/oncomic/json?ob=tipousuario&op=get&id=' + $scope.ajaxDatoUsuario.id
                }).then(function (response) {
                    $scope.ajaxDatoUsuario = response.data.message;
                    if ($scope.ajaxDatoUsuario !== null) {
                        form.userForm.id_tipoUsuario.$setValidity('valid', true);
                    } else {
                        form.userForm.id_tipoUsuario.$setValidity('valid', false);
                        $scope.vacio = "Error al acceder al tipo de usuario";
                    }

                }, function (response) {
                    form.userForm.id_tipoUsuario.$setValidity('valid', false);
                    $scope.ajaxDatoUsuario.desc = "Error al acceder al tipo de usuario";
                });
            } else {
                form.userForm.id_tipoUsuario.$setValidity('valid', true);
            }
        };


    }]);