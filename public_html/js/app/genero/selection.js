'use strict';
moduleComponent.component('tipoproductoSelection', {
    templateUrl: 'js/app/genero/selection.html',
    controllerAs: 'c',
    controller: cController,
    bindings: {
        obj: '=',
        onTipoproductoSet: '&'
    },
});

function cController($http) {
    var self = this;
    self.ob = "coleccion";
    self.page = "1";
    self.totalPages = 1;
    self.orderURLServidor = "";
    self.rpp = "5";


    self.update = function (p) {
        self.page = p;
        $http({
            method: 'GET',
            url: 'json?ob=' + self.ob + '&op=getcount'
        }).then(function (response) {
            self.status = response.status;
            self.ajaxDataUsuariosNumber = response.data.message;
            self.totalPages = Math.ceil(self.ajaxDataUsuariosNumber / self.rpp);
            if (self.page > self.totalPages) {
                self.page = self.totalPages;
            }
            pagination2();
        }, function (response) {
            self.ajaxDataUsuariosNumber = response.data.message || 'Request failed';
            self.status = response.status;
        });

        $http({
            method: 'GET',
            url: 'json?ob=' + self.ob + '&op=getpage&rpp=' + self.rpp + '&page=' + self.page + self.orderURLServidor
        }).then(function (response) {
            self.status = response.status;
            self.data = response.data.message;
        }, function (response) {
            self.status = response.status;
            self.data = response.data.message || 'Request failed';
        });
    };

    self.update(1);



    self.save = function (id, desc) {     
        self.obj = { id : id, desc: desc};
        self.onTipoproductoSet();

    };

    self.ordena = function (order, align) {
        if (self.orderURLServidor === "") {
            self.orderURLServidor = "&order=" + order + "," + align;
            self.orderURLCliente = order + "," + align;
        } else {
            self.orderURLServidor += "-" + order + "," + align;
            self.orderURLCliente += "-" + order + "," + align;
        }
        self.update(1);
    };

    self.resetOrder = function () {
        $http({
            method: "GET",
            withCredential: true,
            url: "json?ob=coleccion&op=getpage&rpp=10&page=1"
        }).then(function (response) {
            self.status = response.status;
            self.data = response.data.message;
        }, function (response) {
            self.data = response.data.message || 'Request failed';
            self.status = response.status;
        });
        self.rpp = "10";
        self.orderURLServidor = "";
    };


    //paginacion neighborhood
    function pagination2() {
        self.list2 = [];
        self.neighborhood = 1;
        for (var i = 1; i <= self.totalPages; i++) {
            if (i === self.page) {
                self.list2.push(i);
            } else if (i <= self.page && i >= (self.page - self.neighborhood)) {
                self.list2.push(i);
            } else if (i >= self.page && i <= (self.page - -self.neighborhood)) {
                self.list2.push(i);
            } else if (i === (self.page - self.neighborhood) - 1) {
                if (self.page >= 4) {
                    self.list2.push("...");
                }
            } else if (i === (self.page - -self.neighborhood) + 1) {
                if (self.page <= self.totalPages - 3) {
                    self.list2.push("...");
                }
            }
        }
    }
    ;
}






