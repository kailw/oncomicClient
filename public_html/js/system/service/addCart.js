'use strict';

moduleService.service('addCartService', ['$http', 'countcarritoService', '$mdDialog', function ($http, countcarritoService, $mdDialog) {

    return {
        add: function (id, ev) {
            $http({
                method: 'GET',
                url: 'http://localhost:8081/oncomic/json?ob=carrito&op=add&comic=' + id + '&cantidad=1'
            }).then(function (response) {
                var ajaxDataCantidadTotal = 0;
                for (var i = 0; i < response.data.message.length; i++) {
                    ajaxDataCantidadTotal += response.data.message[i].cantidad;
                    if (id === response.data.message[i].obj_Comic.id) {
                        var ajaxDataCantidad = response.data.message[i].cantidad;
                        var ajaxDataTitulo = response.data.message[i].obj_Comic.titulo;
                        var ajaxDataExistencias = response.data.message[i].obj_Comic.existencias;
                        if (response.data.message[i].obj_Comic.existencias === ajaxDataCantidad) {
                            showAlert('Has elegido el máximo de existencias del comic: ' + response.data.message[i].obj_Comic.titulo, " Cantidad:" + ajaxDataCantidad, ev);

                        } else {
                            showAlert("Has añadido el comic: " + ajaxDataTitulo, "Cantidad:" + ajaxDataCantidad, ev);
                        }
                    }
                }
                countcarritoService.updateCarrito();

            }, function (response) {
                var status = response.status;
            });
        }
    }

    function showAlert(titulo, description, ev) {
        $mdDialog.show(
            $mdDialog.alert()
                .clickOutsideToClose(true)
                .title(titulo)
                .textContent(description)
                .ariaLabel('Alert Dialog Demo')
                .ok('OK!')
                .targetEvent(ev)
        );
    };

}]);
