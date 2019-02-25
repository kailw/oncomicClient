'use strict';

moduleUsuario.controller('usuarioPlistFacturaController', ['$scope', 'toolService', '$http', 'sessionService', '$routeParams', '$location',
    function ($scope, toolService, $http, sessionService, $routeParams, $location) {
        $scope.totalPages = 1;
        $scope.id = $routeParams.id;
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
            $scope.page = "1";
        } else {
            if ($routeParams.page >= 1) {
                $scope.page = $routeParams.page;
            } else {
                $scope.page = "1";
            }
        }


        $scope.resetOrder = function () {
            $location.url("usuario/plistfactura/" + $scope.id + "/10/1");
        };


        $scope.ordena = function (order, align) {
            if ($scope.orderURLServidor === "") {
                $scope.orderURLServidor = "&order=" + order + "," + align;
                $scope.orderURLCliente = order + "," + align;
            } else {
                $scope.orderURLServidor = $scope.orderURLServidor + "-" + order + "," + align;
                $scope.orderURLCliente = $scope.orderURLCliente + "-" + order + "," + align;
            }
            $location.url(`usuario/plistfactura/` + $scope.id + `/` + $scope.rpp + `/` + $scope.page + `/` + $scope.orderURLCliente);
        };

        //getcount
        $http({
            method: 'GET',
            url: 'http://localhost:8081/oncomic/json?ob=factura&op=getcount&id=' + $scope.id
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDataUsuariosNumber = response.data.message;
            $scope.totalPages = Math.ceil($scope.ajaxDataUsuariosNumber / $scope.rpp);
            if ($scope.page > $scope.totalPages) {
                $scope.page = $scope.totalPages;
                $scope.update();
            }
            pagination2();
        }, function (response) {
            $scope.ajaxDataUsuariosNumber = response.data.message || 'Request failed';
            $scope.status = response.status;
        });

        $http({
            method: 'GET',
            url: 'http://localhost:8081/oncomic/json?ob=factura&op=getpagex&rpp=' + $scope.rpp + '&page=' + $scope.page + '&campo=id_usuario&id=' + $scope.id + $scope.orderURLServidor
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDataUsuarios = response.data.message;

        }, function (response) {
            $scope.status = response.status;
            $scope.ajaxDataUsuarios = response.data.message || 'Request failed';
        });


        //INFORMACION DE USUARIO
        $http({
            method: 'GET',
            url: 'http://localhost:8081/oncomic/json?ob=usuario&op=get&id=' + $routeParams.id
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDatosUsuarios = response.data.message;

        }, function (response) {
            $scope.status = response.status;
            $scope.ajaxDatosUsuarios = response.data.message || 'Request failed';
        });

        $scope.update = function () {
            $location.url(`usuario/plistfactura/` + $scope.id + `/` + $scope.rpp + `/` + $scope.page + '/' + $scope.orderURLCliente);
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

        var doc = new jsPDF();

        $scope.pdf = function (id, fecha, iva) {
            var imgData = 'data:image/png;base64,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';
            var linea = 110;
            doc.setFontType('normal');

            $http({
                method: 'GET',
                url: '/json?ob=linea&op=getpagex&campo=id_factura&rpp=500&page=1&id=' + id
            }).then(function (response) {
                $scope.status = response.status;
                $scope.ajaxDatoLineaFactura = response.data.message;
                doc.setFontSize(12);
                $scope.productoCantidadTotal = 0;
                $scope.productoPrecioTotal = 0;
                doc.addImage(imgData, 'JPEG', 10, 14, 58, 40);

                $scope.dibujarHeader(id, fecha);
                var pagina = 1;
                doc.setFontSize(10);
                doc.text(95, 290, "Pagina " + pagina);
                for (var i = 0; i < $scope.ajaxDatoLineaFactura.length; i++) {
                    if (i % 18 === 0 && i !== 0) {
                        doc.addPage('a4', 1);
                        doc.addImage(imgData, 'JPEG', 10, 14, 58, 40);
                        $scope.dibujarHeader(id, fecha);
                        linea = 110;
                        pagina += pagina;
                        doc.text(95, 290, "Pagina " + pagina);
                    }
                    doc.setFontSize(13);
                    $scope.productoCodigo = $scope.ajaxDatoLineaFactura[i].obj_Comic.titulo;
                    $scope.productoDesc = $scope.ajaxDatoLineaFactura[i].obj_Comic.desc;
                    $scope.productoCantidad = $scope.ajaxDatoLineaFactura[i].cantidad;
                    $scope.productoCantidadTotal += $scope.ajaxDatoLineaFactura[i].cantidad;
                    $scope.productoPrecio = $scope.ajaxDatoLineaFactura[i].obj_Comic.precio * $scope.productoCantidad;
                    $scope.productoPrecioUno = $scope.ajaxDatoLineaFactura[i].obj_Comic.precio;
                    $scope.productoPrecioTotal += $scope.ajaxDatoLineaFactura[i].obj_Comic.precio * $scope.productoCantidad;
                    doc.text(10, linea, $scope.productoCodigo);
                    doc.text(40, linea, $scope.productoDesc);
                    doc.text(125, linea, $scope.productoCantidad.toString());
                    doc.text(132, linea, "  x  " + $scope.productoPrecioUno.toFixed(2));
                    doc.text(170, linea, $scope.productoPrecio.toFixed(2).toString());
                    linea += 10;
                }
                doc.setFontType('bold');
                doc.text(80, 273, 'IVA');
                doc.text(125, 273, 'Cantidad Total');
                doc.text(170, 273, 'TOTAL');

                doc.setFontType('normal');
                doc.setFontSize(13);
                doc.text(125, 279, $scope.productoCantidadTotal.toString());
                doc.text(80, 279, iva.toString() + " %");

                $scope.precioTotal = $scope.productoPrecioTotal + ($scope.productoPrecioTotal * iva / 100);

                doc.text(170, 279, $scope.precioTotal.toFixed(2).toString());

                doc.setFontSize(10);
                doc.save("facturaNo." + id + ".pdf");

            }, function (response) {
                $scope.status = response.status;
            });


        };

        $scope.dibujarHeader = function (id, fecha) {
            doc.setFontSize(13);
            doc.text(16, 61, 'CIF/NIF: 15402650f');
            doc.text(16, 67, 'Calle Desconocida, No 1');
            doc.text(16, 73, 'CP: 46026 Valencia');
            doc.setFontType('bold');
            doc.text(16, 79, 'Email: kevin@gmail.com');

            doc.setLineWidth(2.2);
            doc.setDrawColor(105, 189, 90);
            doc.line(95, 45, 95, 25); // vertical line

            doc.setFontSize(16);
            doc.text(100, 30, 'Cliente:');
            doc.setFontSize(13);
            doc.setFontType('normal');
            doc.text(100, 37, $scope.ajaxDatosUsuarios.nombre + " " + $scope.ajaxDatosUsuarios.ape1 + " " + $scope.ajaxDatosUsuarios.ape2);
            doc.text(100, 43, 'DNI: ' + $scope.ajaxDatosUsuarios.dni);

            doc.setLineWidth(2.2);
            doc.setDrawColor(105, 189, 90);
            doc.line(190, 45, 190, 25); // vertical line

            doc.setFontSize(15);
            doc.setFontType('bold');
            doc.text(10, 95, 'Codigo');
            doc.text(40, 95, 'Descripcion');
            doc.text(125, 95, 'Cantidad');
            doc.text(170, 95, 'Precio ');
            doc.setFillColor(156, 156, 156);
            doc.rect(9, 98, 193, 4, 'F');

            doc.setFontSize(13);
            doc.text(115, 10, 'Numero de Factura:   ' + id);
            doc.setDrawColor(105, 189, 90);
            doc.setLineWidth(0.8);
            doc.line(114, 12, 180, 12);
            doc.text(115, 17, 'Fecha Factura:    ' + fecha);

            doc.setFontType('normal');
            doc.setFontSize(10);
        };

    }
]);
