'use strict';

moduleFactura.controller('facturaPlistController', ['$scope', '$http', '$location', 'toolService', '$routeParams', 'sessionService',
    function ($scope, $http, $location, toolService, $routeParams, sessionService) {

        $scope.totalPages = 1;
        $scope.select = ["5", "10", "25", "50", "500"];
        $scope.ob = "factura";


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
            url: 'http://localhost:8081/oncomic/json?ob=' + $scope.ob + '&op=getcount'
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDataFacturasNumber = response.data.message;
            $scope.totalPages = Math.ceil($scope.ajaxDataFacturasNumber / $scope.rpp);
            if ($scope.page > $scope.totalPages) {
                $scope.page = $scope.totalPages;
                $scope.update();
            }
            pagination2();
        }, function (response) {
            $scope.ajaxDataFacturasNumber = response.data.message || 'Request failed';
            $scope.status = response.status;
        });

        $http({
            method: 'GET',
            url: 'http://localhost:8081/oncomic/json?ob=' + $scope.ob + '&op=getpage&rpp=' + $scope.rpp + '&page=' + $scope.page + $scope.orderURLServidor
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDataFacturas = response.data.message;
        }, function (response) {
            $scope.status = response.status;
            $scope.ajaxDataFacturas = response.data.message || 'Request failed';
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
        
        var doc = new jsPDF();

        $scope.pdf = function (id, fecha, iva, objUsuario) {
            var imgData = 'data:image/png;base64,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';
            var linea = 110;
            doc.setFontType('normal');

            $http({
                method: 'GET',
                url: 'http://localhost:8081/oncomic/json?ob=linea&op=getpagex&campo=id_factura&rpp=500&page=1&id=' + id
            }).then(function (response) {
                $scope.status = response.status;
                $scope.ajaxDatoLineaFactura = response.data.message;
                doc.setFontSize(12);
                $scope.productoCantidadTotal = 0;
                $scope.productoPrecioTotal = 0;
                doc.addImage(imgData, 'JPEG', 10, 14, 60, 37);

                $scope.dibujarHeader(id, fecha, objUsuario);
                var pagina = 1;
                doc.setFontSize(10);
                doc.text(95, 290, "Pagina " + pagina);
                for (var i = 0; i < $scope.ajaxDatoLineaFactura.length; i++) {
                    if (i % 18 === 0 && i !== 0) {
                        doc.addPage('a4', 1);
                        doc.addImage(imgData, 'JPEG', 10, 14, 40, 40);
                        $scope.dibujarHeader(id, fecha, objUsuario);
                        linea = 110;
                        pagina += pagina;
                        doc.text(95, 290, "Pagina " + pagina);
                    }
                    doc.setFontSize(13);
                    $scope.productoCodigo = $scope.ajaxDatoLineaFactura[i].obj_Comic.titulo;
                    $scope.productoDesc = $scope.ajaxDatoLineaFactura[i].obj_Comic.isbn;
                    $scope.productoCantidad = $scope.ajaxDatoLineaFactura[i].cantidad;
                    $scope.productoCantidadTotal += $scope.ajaxDatoLineaFactura[i].cantidad;
                    $scope.productoPrecio = $scope.ajaxDatoLineaFactura[i].obj_Comic.precio * $scope.productoCantidad;
                    $scope.productoPrecioUno = $scope.ajaxDatoLineaFactura[i].obj_Comic.precio;
                    $scope.productoPrecioTotal += $scope.ajaxDatoLineaFactura[i].obj_Comic.precio * $scope.productoCantidad;
                    doc.text(10, linea, $scope.productoCodigo);
                    doc.text(60, linea, $scope.productoDesc);
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

        $scope.dibujarHeader = function (id, fecha, objUsuario) {
            doc.setFontSize(13);
            doc.text(16, 61, 'CIF/NIF: 15402650f');
            doc.text(16, 67, 'Calle Desconocida, No 1');
            doc.text(16, 73, 'CP: 46026 Valencia');
            doc.setFontType('bold');
            doc.text(16, 79, 'Email: kevin@gmail.com');

            doc.setLineWidth(2.2);
            doc.setDrawColor(18, 144, 83);
            doc.line(95, 45, 95, 25); // vertical line

            doc.setFontSize(16);
            doc.text(100, 30, 'Cliente:');
            doc.setFontSize(13);
            doc.setFontType('normal');

            doc.text(100, 37, objUsuario.nombre + " " + objUsuario.ape1 + " " + objUsuario.ape2);
            doc.text(100, 43, 'DNI: ' + objUsuario.dni);

            doc.setLineWidth(2.2);
            doc.setDrawColor(18, 144, 83);
            doc.line(190, 45, 190, 25); // vertical line

            doc.setFontSize(15);
            doc.setFontType('bold');
            doc.text(10, 95, 'Titulo');
            doc.text(60, 95, 'ISBN');
            doc.text(125, 95, 'Cantidad');
            doc.text(170, 95, 'Precio ');
            doc.setFillColor(156, 156, 156);
            doc.rect(9, 98, 193, 4, 'F');

            doc.setFontSize(13);
            doc.text(115, 10, 'Numero de Factura:   ' + id);
            doc.setDrawColor(18, 144, 83);
            doc.setLineWidth(0.8);
            doc.line(114, 12, 180, 12);
            doc.text(115, 17, 'Fecha Factura:    ' + fecha);

            doc.setFontType('normal');
            doc.setFontSize(10);
        };
    }
]);