'use strict';

moduleComic.controller('comicViewUsuarioController', ['$scope', '$http', '$location', 'toolService', '$routeParams', 'sessionService', 'addCartService',
    function ($scope, $http, $location, toolService, $routeParams, sessionService, addCartService) {
        $scope.id = $routeParams.id;
        $scope.ob1 = "comicgenero";
        $scope.ob2 = "autorespecialidad";
        $scope.ob3 = "comiceditorial";
        $scope.ob4 = "comicidioma";
        $scope.ob5 = "comic";



        $http({
            method: 'GET',
            url: 'http://localhost:8081/oncomic/json?ob=' + $scope.ob1 + '&op=getpagex&campo=id_comic&id=' + $scope.id + '&rpp=1000' + '&page=1'
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDatoComicGenero = response.data.message;
            $scope.ajaxDatoComic = response.data.message[0].obj_comic;
            $scope.ajaxDatoFecha = response.data.message[0].obj_comic.fechapublicacion;
            var d = new Date($scope.ajaxDatoFecha);
            $scope.fechaformato = d.toLocaleDateString();
        }, function (response) {
            $scope.ajaxDatoComicGenero = response.data.message || 'Request failed';
            $scope.status = response.status;
        });

        $http({
            method: 'GET',
            url: 'http://localhost:8081/oncomic/json?ob=' + $scope.ob2 + '&op=getpagex&campo=id_comic&id=' + $scope.id + '&rpp=1000' + '&page=1'
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDatoAutorEspecialidad = response.data.message;
        }, function (response) {
            $scope.ajaxDatoAutorEspecialidad = response.data.message || 'Request failed';
            $scope.status = response.status;
        });

        $http({
            method: 'GET',
            url: 'http://localhost:8081/oncomic/json?ob=' + $scope.ob3 + '&op=getpagex&campo=id_comic&id=' + $scope.id + '&rpp=1000' + '&page=1'
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDatoComicEditorial = response.data.message;
        }, function (response) {
            $scope.ajaxDatoComicEditorial = response.data.message || 'Request failed';
            $scope.status = response.status;
        });

        $http({
            method: 'GET',
            url: 'http://localhost:8081/oncomic/json?ob=' + $scope.ob4 + '&op=getpagex&campo=id_comic&id=' + $scope.id + '&rpp=1000' + '&page=1'
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDatoComicIdioma = response.data.message;
        }, function (response) {
            $scope.ajaxDatoComicIdioma = response.data.message || 'Request failed';
            $scope.status = response.status;
        });


        $http({
            method: 'GET',
            url: 'http://localhost:8081/oncomic/json?ob=' + $scope.ob5 + '&op=getpagex&campo=destacado&id=1&rpp=10&page=1'
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDataComicDestacados = response.data.message;
        }, function (response) {
            $scope.ajaxDataComic = response.data.message || 'Request failed';
            $scope.status = response.status;
        });


        $scope.estiloComic = {
            backgroundSize: "cover",
            backgroundPosition: "center center",
            borderRadius: "5px",
            border: "2px outset black",
            boxShadow: "4px 3px 2px #2F3031"
        }



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



        $scope.isActive = toolService.isActive;

    }
]);