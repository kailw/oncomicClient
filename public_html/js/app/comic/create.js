'use strict';

moduleComic.controller('comicCreateController', ['$scope', '$http', '$location', 'toolService', '$routeParams', 'sessionService',
    function ($scope, $http, $location, toolService, $routeParams, sessionService) {
        $scope.id = $routeParams.id;
        $scope.ob1 = "comic";
        $scope.ob2 = "genero";
        $scope.ob3 = "comicgenero";
        $scope.ob4 = "autor";
        $scope.ob5 = "especialidad";
        $scope.ob6 = "autorespecialidad";
        $scope.ob7 = "idioma";
        $scope.ob8 = "comicidioma";
        $scope.ob9 = "editorial";
        $scope.ob10 = "comiceditorial";
        $scope.ob11 = "coleccion";
        $scope.fechapublicacion = new Date();
        $scope.aparecer = false;
        $scope.aparecer2 = false;
        $scope.ajaxDatoAutoresEspecialidades = [];

        $scope.seleccionarAutor = [];
        $scope.seleccionarEspecialidad = [];
        $scope.totalAutores = [];
        $scope.especialidadPorAutor = [];

        // The md-select directive eats keydown events for some quick select
        // logic. Since we have a search input here, we don't need that logic.


        $scope.ajaxDatoComic = {
            id: null,
            desc: null
        };

        $http({
            method: 'GET',
            url: 'http://localhost:8081/oncomic/json?ob=' + $scope.ob2 + '&op=getpage&rpp=1000&page=1'
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDatoComicGenero = response.data.message;
        }, function (response) {
            $scope.ajaxDatoComicGenero = response.data.message || 'Request failed';
            $scope.status = response.status;
        });

        $http({
            method: 'GET',
            url: 'http://localhost:8081/oncomic/json?ob=' + $scope.ob11 + '&op=getpage&rpp=1000&page=1'
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDatoComicColeccion = response.data.message;
        }, function (response) {
            $scope.ajaxDatoComicColeccion = response.data.message || 'Request failed';
            $scope.status = response.status;
        });

        $http({
            method: 'GET',
            url: 'http://localhost:8081/oncomic/json?ob=' + $scope.ob4 + '&op=getpage&rpp=1000&page=1'
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDatoAutor = response.data.message;
            $scope.ajaxDatoAutoresEspecialidades.push("dsfa");
            //$scope.ajaxDatoAutoresEspecialidades = $scope.ajaxDatoAutor;
        }, function (response) {
            $scope.ajaxDatoAutor = response.data.message || 'Request failed';
            $scope.status = response.status;
        });

        $http({
            method: 'GET',
            url: 'http://localhost:8081/oncomic/json?ob=' + $scope.ob5 + '&op=getpage&rpp=1000&page=1'
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDatoAutorEspecialidad = response.data.message;
        }, function (response) {
            $scope.ajaxDatoAutorEspecialidad = response.data.message || 'Request failed';
            $scope.status = response.status;
        });

        $http({
            method: 'GET',
            url: 'http://localhost:8081/oncomic/json?ob=' + $scope.ob7 + '&op=getpage&rpp=1000&page=1'
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDatoIdioma = response.data.message;
        }, function (response) {
            $scope.ajaxDatoIdioma = response.data.message || 'Request failed';
            $scope.status = response.status;
        });


        $http({
            method: 'GET',
            url: 'http://localhost:8081/oncomic/json?ob=' + $scope.ob9 + '&op=getpage&rpp=1000&page=1'
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDatoEditorial = response.data.message;
        }, function (response) {
            $scope.ajaxDatoEditorial = response.data.message || 'Request failed';
            $scope.status = response.status;
        });




        $scope.crear = function () {
            $scope.upload();
            var foto = 'default.svg';
            if ($scope.file !== undefined) {
                foto = $scope.file.name;
            }

            if ($scope.color === null || $scope.color === undefined) {
                $scope.color = false;
            }
            if ($scope.destacado === null || $scope.destacado === undefined) {
                $scope.destacado = false;
            }

            if ($scope.descuento === "" || $scope.descuento === undefined) {
                $scope.descuento = 0;
            }


            if ($scope.seleccionarColeccion == null) {
                $scope.seleccionarColeccion = 13;
            }

            var json = {
                id: null,
                titulo: $scope.titulo.toUpperCase(),
                desc: $scope.desc,
                isbn: $scope.isbn,
                fechapublicacion: $scope.fechapublicacion,
                pagina: $scope.pagina,
                color: $scope.color,
                existencias: $scope.existencias,
                precio: $scope.precio,
                descuento: $scope.descuento,
                foto: foto,
                destacado: $scope.destacado,
                id_coleccion: $scope.seleccionarColeccion
            };
            $http({
                method: 'GET',
                withCredentials: true,
                url: 'http://localhost:8081/oncomic/json?ob=' + $scope.ob1 + '&op=create',
                params: { json: JSON.stringify(json) }
            }).then(function (response) {
                $scope.idCreado = response.data.message.id;
                $scope.status = response.status;
                $scope.mensaje = true;
                $scope.idGenero = 0;
                for (var i = 0; i < $scope.seleccionarGenero.length; i++) {
                    $scope.idGenero = $scope.seleccionarGenero[i];
                    var json1 = {
                        id: null,
                        id_comic: $scope.idCreado,
                        id_genero: $scope.idGenero
                    };
                    $http({
                        method: 'GET',
                        withCredentials: true,
                        url: 'http://localhost:8081/oncomic/json?ob=' + $scope.ob3 + '&op=create',
                        params: { json: JSON.stringify(json1) }
                    }).then(function (response) {
                        $scope.status = response.status;
                    }, function (response) {
                        $scope.status = response.status;
                    });
                }


                for (var i = 0; i < $scope.seleccionarIdioma.length; i++) {
                    $scope.idIdioma = $scope.seleccionarIdioma[i];
                    var json4 = {
                        id: null,
                        id_comic: $scope.idCreado,
                        id_idioma: $scope.idIdioma
                    };
                    $http({
                        method: 'GET',
                        withCredentials: true,
                        url: 'http://localhost:8081/oncomic/json?ob=' + $scope.ob8 + '&op=create',
                        params: { json: JSON.stringify(json4) }
                    }).then(function (response) {
                        $scope.status = response.status;
                    }, function (response) {
                        $scope.status = response.status;
                    });
                }

                $scope.idEditorial = $scope.seleccionarEditorial;
                var json4 = {
                    id: null,
                    id_comic: $scope.idCreado,
                    id_editorial: $scope.idEditorial
                };
                $http({
                    method: 'GET',
                    withCredentials: true,
                    url: 'http://localhost:8081/oncomic/json?ob=' + $scope.ob10 + '&op=create',
                    params: { json: JSON.stringify(json4) }
                }).then(function (response) {
                    $scope.status = response.status;
                }, function (response) {
                    $scope.status = response.status;
                });


                for (var z = 0; z < $scope.seleccionarAutor.length; z++) {
                    for (var x = 0; x < $scope.seleccionarEspecialidad[z].length; x++) {
                        var json2 = {
                            id: null,
                            id_especialidad: $scope.seleccionarEspecialidad[z][x],
                            id_comic: $scope.idCreado,
                            id_autor: $scope.seleccionarAutor[z]
                        };
                        $http({
                            method: 'GET',
                            withCredentials: true,
                            url: 'http://localhost:8081/oncomic/json?ob=' + $scope.ob6 + '&op=create',
                            params: { json: JSON.stringify(json2) }
                        }).then(function (response) {
                            $scope.status = response.status;
                        }, function (response) {
                            $scope.status = response.status;
                        });
                        $scope.mensaje = true;
                    }
                }
            }, function (response) {
                $scope.status = response.status;
            });
        };



        $scope.otroInput = function () {
            if ($scope.ajaxDatoAutoresEspecialidades.length <= 5) {
                $scope.ajaxDatoAutoresEspecialidades.push("sd");
                $scope.menos = true;
            }
        };

        $scope.quitarInput = function () {
            if ($scope.ajaxDatoAutoresEspecialidades.length > 1) {
                $scope.ajaxDatoAutoresEspecialidades.pop();
            } else {
                $scope.menos = false;
            }
        };








        $scope.isActive = toolService.isActive;



        $scope.upload = function () {
            var file = $scope.file;
            var oformData = new FormData();
            oformData.append('file', file);

            $http({
                headers: { 'Content-Type': undefined },
                method: 'POST',
                data: oformData,
                url: 'http://localhost:8081/oncomic/json?ob=comic&op=loadimage'
            }).then(function (response) {
                console.log(response);
            }, function (response) {
                console.log(response);
            });
        };

    }
]).directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function () {
                scope.$apply(function () {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

