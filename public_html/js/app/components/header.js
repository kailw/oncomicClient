moduleComponent.component('headerComponent', {
    templateUrl: 'js/app/components/header.html',
    controllerAs: 'c',
    controller: js
});

function js(toolService, sessionService, $http, $location, countcarritoService) {
    var self = this;

    console.log(sessionService.isSessionActive());
    if (sessionService.isSessionActive()) {
        self.loginH = sessionService.isSessionActive();
        self.usuariologeado = sessionService.getUserName();
        self.usuariologeadoID = sessionService.getId();
        self.isActive = toolService.isActive;
        self.idTipoUsuario = sessionService.getTipoUserId();
        console.log(self.idTipoUsuario);
        self.isAdmin = sessionService.getAdmin();

        console.log("si session");
    } else {
        console.log("no session");
    }
//    $http({
//        method: 'GET',
//        url: '/json?ob=usuario&op=check'
//    }).then(function (response) {
//        if (response.data.status === 200) {
//            sessionService.setSessionActive();
//            self.loginH = sessionService.isSessionActive();
//            sessionService.setTipoUserId(response.data.message.obj_tipoUsuario.id);
//            sessionService.setUserName(response.data.message.nombre + " " + response.data.message.ape1);
//            sessionService.setId(response.data.message.id);
//            self.usuariologeado = sessionService.getUserName();
//            self.usuariologeadoID = sessionService.getId();
//            self.isActive = toolService.isActive;
//            self.idTipoUsuario = sessionService.getTipoUserId();
//            if (self.idTipoUsuario === 1) {
//                self.isAdmin = true;
//            } else {
//                self.isUser = false;
//            }
//        } else {
//            countcarritoService.updateCarrito(0);
//        }
//    }, function (response) {
//        sessionService.setSessionInactive;
//        $location.path("/home");
//        countcarritoService.updateCarrito(0);
//    });

    self.carrito = sessionService.getCountCarrito();
    sessionService.registerObserverCallback(function () {
        self.carrito = sessionService.getCountCarrito();
    });
}
;







