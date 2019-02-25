'use strict';
moduleFactura.controller('facturaNewUserController', ['$scope', '$http', '$routeParams', 'sessionService','$location',
    function ($scope, $http, $routeParams, sessionService,$location) {
        $scope.idC = $routeParams.id;


        $http({
                method: 'GET',
                url: 'http://localhost:8081/oncomic/json?ob=usuario&op=get&id='+$routeParams.id
            }).then(function (response) {
                $scope.ajaxDatosUser = response.data.message;
            }, function (response) {
                $scope.ajaxDatosUser = response.data.message || 'Request failed';
                $scope.status = response.status;
            });
        
        $scope.guardar = function () {
            var json = {
                id: null,
                fecha: $scope.myDate,
                iva: $scope.iva,
                id_usuario: $scope.ajaxDatosUser.id
            };
            $http({
                method: 'GET',
                withCredentials: true,
                url: '/json?ob=factura&op=create',
                params: {json: JSON.stringify(json)}
            }).then(function (response) {
                $scope.status = response.status;
                $scope.mensaje = true;
            }, function (response) {
                $scope.ajaxDatoFactura = response.data.message || 'Request failed';
                $scope.status = response.status;
            });
        };
        $scope.save = function () {
            $http({
                method: 'GET',
                url: 'http://localhost:8081/oncomic/json?ob=tipousuario&op=update&id=2',
                data: {json: JSON.stringify($scope.obj)}
            }).then(function (response) {
                $scope.status = response.status;
                $scope.ajaxData = response.data.message;
            }, function (response) {
                $scope.ajaxData = response.data.message || 'Request failed';
                $scope.status = response.status;
            });
        };
        $scope.tipoUsuarioRefresh = function () {
            $http({
                method: 'GET',
                url: 'http://localhost:8081/oncomic/json?ob=tipousuario&op=get&id=' + $scope.data.obj_tipoUsuario.id
            }).then(function (response) {
                $scope.data.obj_tipoUsuario = response.data.message;
            }, function (response) {
                $scope.data = response.data.message || 'Request failed';
                $scope.status = response.status;
            });
        };
        $scope.plist = function () {
            $location.path('/factura/plist');
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