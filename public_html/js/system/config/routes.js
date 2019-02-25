var autenticacionAdministrador = function ($q, $location, $http, sessionService, countcarritoService) {
    var deferred = $q.defer();
    $http({
        method: 'GET',
        url: 'http://localhost:8081/oncomic/json?ob=usuario&op=check'
    }).then(function (response) {
        //comprobar que el usuario en sesión es administrador
        if (response.data.message.obj_tipoUsuario.id === 1) {
            //hay que meter el usuario activo en el sessionService
            sessionService.setSessionActive();
            sessionService.setTipoUserId(response.data.message.obj_tipoUsuario.id);
            sessionService.setAdmin();
            sessionService.setUserName(response.data.message.nombre + " " + response.data.message.ape1);
            sessionService.setId(response.data.message.id);
            deferred.resolve();
        } else {
            $location.path('/home');
        }
    }, function (response) {
        sessionService.setSessionInactive;
        $location.path('/home');
    });
    return deferred.promise;
};


var autenticacionUsuario = function ($q, $location, $http, sessionService, countcarritoService) {
    var deferred = $q.defer();
    $http({
        method: 'GET',
        url: 'http://localhost:8081/oncomic/json?ob=usuario&op=check'
    }).then(function (response) {
        //comprobar que el usuario en sesión es usuario
        if (response.data.message.obj_tipoUsuario.id === 2 || response.data.message === "No active session") {
            //hay que meter el usuario activo en el sessionService
            sessionService.setTipoUserId(response.data.message.obj_tipoUsuario.id);
            sessionService.setSessionActive();
            sessionService.setUserName(response.data.message.nombre + " " + response.data.message.ape1);
            sessionService.setId(response.data.message.id);
            countcarritoService.updateCarrito();
            deferred.resolve(response.data.message);
        } else {
            $location.path('/home');
        }
    }, function (response) {
        sessionService.setSessionInactive;
        $location.path('/home');
    });
    return deferred.promise;
};

var autenticacionHome = function ($q, sessionService, $http, countcarritoService) {
    var deferred = $q.defer();
    $http({
        method: 'GET',
        url: 'http://localhost:8081/oncomic/json?ob=usuario&op=check'
    }).then(function (response) {
        if (response.data.message !== "No active session") {
            if (response.data.message.obj_tipoUsuario.id === 1) {
                sessionService.setSessionActive();
                sessionService.setUserName(response.data.message.nombre + " " + response.data.message.ape1);
                sessionService.setId(response.data.message.id);
                sessionService.setAdmin();
                sessionService.setTipoUserId(response.data.message.obj_tipoUsuario.id);
                deferred.resolve();
            } else if (response.data.message.obj_tipoUsuario.id === 2) {
                sessionService.setSessionActive();
                sessionService.setUserName(response.data.message.nombre + " " + response.data.message.ape1);
                sessionService.setTipoUserId(response.data.message.obj_tipoUsuario.id);
                sessionService.setId(response.data.message.id);
                sessionService.setUser();
                deferred.resolve();
            }
            
        }
        countcarritoService.updateCarrito();
        deferred.resolve();

    }, function (response) {
        deferred.resolve();
    });
    return deferred.promise;
};


oncomic.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', { templateUrl: 'js/app/common/home.html', controller: 'homeController', resolve: { auth: autenticacionHome } });
    $routeProvider.when('/home', { templateUrl: 'js/app/common/home.html', controller: 'homeController', resolve: { auth: autenticacionHome } });

    $routeProvider.when('/tipousuario/plist/:rpp?/:page?/:order?', { templateUrl: 'js/app/tipousuario/plist.html', controller: 'tipousuarioPlistController', resolve: { auth: autenticacionAdministrador } });
    $routeProvider.when('/tipousuario/view/:id?', { templateUrl: 'js/app/tipousuario/view.html', controller: 'tipousuarioViewController', resolve: { auth: autenticacionAdministrador } });
    $routeProvider.when('/tipousuario/edit/:id?', { templateUrl: 'js/app/tipousuario/edit.html', controller: 'tipousuarioEditController', resolve: { auth: autenticacionAdministrador } });
    $routeProvider.when('/tipousuario/remove/:id?', { templateUrl: 'js/app/tipousuario/remove.html', controller: 'tipousuarioRemoveController', resolve: { auth: autenticacionAdministrador } });
    $routeProvider.when('/tipousuario/create', { templateUrl: 'js/app/tipousuario/create.html', controller: 'tipousuarioCreateController', resolve: { auth: autenticacionAdministrador } });

    $routeProvider.when('/comic/plist/:rpp?/:page?/:order?', { templateUrl: 'js/app/comic/plist.html', controller: 'comicPlistController', resolve: { auth: autenticacionAdministrador } });
    $routeProvider.when('/comic/view/:id?', { templateUrl: 'js/app/comic/view.html', controller: 'comicViewController', resolve: { auth: autenticacionAdministrador } });
    $routeProvider.when('/comic/edit/:id?', { templateUrl: 'js/app/comic/edit.html', controller: 'comicEditController', resolve: { auth: autenticacionAdministrador } });
    $routeProvider.when('/comic/create/:id?', { templateUrl: 'js/app/comic/create.html', controller: 'comicCreateController', resolve: { auth: autenticacionAdministrador } });
    $routeProvider.when('/comic/remove/:id?', { templateUrl: 'js/app/comic/remove.html', controller: 'comicRemoveController', resolve: { auth: autenticacionAdministrador } });

    $routeProvider.when('/factura/plist/:rpp?/:page?/:order?', { templateUrl: 'js/app/factura/plist.html', controller: 'facturaPlistController', resolve: { auth: autenticacionAdministrador } });
    $routeProvider.when('/factura/view/:id?', { templateUrl: 'js/app/factura/view.html', controller: 'facturaViewController', resolve: { auth: autenticacionAdministrador } });
    $routeProvider.when('/factura/edit/:id?', { templateUrl: 'js/app/factura/edit.html', controller: 'facturaEditController', resolve: { auth: autenticacionAdministrador } });
    $routeProvider.when('/factura/remove/:id?', { templateUrl: 'js/app/factura/remove.html', controller: 'facturaRemoveController', resolve: { auth: autenticacionAdministrador } });
    $routeProvider.when('/factura/create/:id?', { templateUrl: 'js/app/factura/create.html', controller: 'facturaCreateController', resolve: { auth: autenticacionAdministrador } });
    $routeProvider.when('/factura/plistlinea/:id?/:rpp?/:page?/:order?', { templateUrl: 'js/app/factura/plistlinea.html', controller: 'facturaPlistLineaController', resolve: { auth: autenticacionAdministrador } });
    $routeProvider.when('/factura/newfacturauser/:id?', { templateUrl: 'js/app/factura/newfacturauser.html', controller: 'facturaNewUserController', resolve: { auth: autenticacionAdministrador } });

    $routeProvider.when('/linea/plist/:rpp?/:page?/:order?', { templateUrl: 'js/app/linea/plist.html', controller: 'lineaPlistController', resolve: { auth: autenticacionAdministrador } });
    $routeProvider.when('/linea/view/:id?', { templateUrl: 'js/app/linea/view.html', controller: 'lineaViewController', resolve: { auth: autenticacionAdministrador } });
    $routeProvider.when('/linea/edit/:id?', { templateUrl: 'js/app/linea/edit.html', controller: 'lineaEditController', resolve: { auth: autenticacionAdministrador } });
    $routeProvider.when('/linea/remove/:id?', { templateUrl: 'js/app/linea/remove.html', controller: 'lineaRemoveController', resolve: { auth: autenticacionAdministrador } });
    $routeProvider.when('/linea/create/:id?', { templateUrl: 'js/app/linea/create.html', controller: 'lineaCreateController', resolve: { auth: autenticacionAdministrador } });

    $routeProvider.when('/usuario/plist/:rpp?/:page?/:order?', { templateUrl: 'js/app/usuario/plist.html', controller: 'usuarioPlistController', resolve: { auth: autenticacionAdministrador } });
    $routeProvider.when('/usuario/view/:id?', { templateUrl: 'js/app/usuario/view.html', controller: 'usuarioViewController', resolve: { auth: autenticacionAdministrador } });
    $routeProvider.when('/usuario/edit/:id?', { templateUrl: 'js/app/usuario/edit.html', controller: 'usuarioEditController', resolve: { auth: autenticacionAdministrador } });
    $routeProvider.when('/usuario/remove/:id?', { templateUrl: 'js/app/usuario/remove.html', controller: 'usuarioRemoveController', resolve: { auth: autenticacionAdministrador } });
    $routeProvider.when('/usuario/create', { templateUrl: 'js/app/usuario/create.html', controller: 'usuarioCreateController', resolve: { auth: autenticacionAdministrador } });
    $routeProvider.when('/usuario/plistfactura/:id?/:rpp?/:page?/:order?', { templateUrl: 'js/app/usuario/plistfactura.html', controller: 'usuarioPlistFacturaController', resolve: { auth: autenticacionAdministrador } });

    $routeProvider.when('/carrito/plist/:rpp?/:page?/:order?', { templateUrl: 'js/app/carrito/plist.html', controller: 'carritoPlistController' });

    $routeProvider.when('/genero/plist/:rpp?/:page?/:order?', { templateUrl: 'js/app/genero/plist.html', controller: 'generoPlistController', resolve: { auth: autenticacionAdministrador } });
    $routeProvider.when('/genero/view/:id?', { templateUrl: 'js/app/genero/view.html', controller: 'generoViewController', resolve: { auth: autenticacionAdministrador } });
    $routeProvider.when('/genero/edit/:id?', { templateUrl: 'js/app/genero/edit.html', controller: 'generoEditController', resolve: { auth: autenticacionAdministrador } });
    $routeProvider.when('/genero/remove/:id?', { templateUrl: 'js/app/genero/remove.html', controller: 'generoRemoveController', resolve: { auth: autenticacionAdministrador } });
    $routeProvider.when('/genero/create', { templateUrl: 'js/app/genero/create.html', controller: 'generoCreateController', resolve: { auth: autenticacionAdministrador } });

    $routeProvider.when('/autor/plist/:rpp?/:page?/:order?', { templateUrl: 'js/app/autor/plist.html', controller: 'autorPlistController', resolve: { auth: autenticacionAdministrador } });
    $routeProvider.when('/autor/view/:id?', { templateUrl: 'js/app/autor/view.html', controller: 'autorViewController', resolve: { auth: autenticacionAdministrador } });
    $routeProvider.when('/autor/edit/:id?', { templateUrl: 'js/app/autor/edit.html', controller: 'autorEditController', resolve: { auth: autenticacionAdministrador } });
    $routeProvider.when('/autor/remove/:id?', { templateUrl: 'js/app/autor/remove.html', controller: 'autorRemoveController', resolve: { auth: autenticacionAdministrador } });
    $routeProvider.when('/autor/create', { templateUrl: 'js/app/autor/create.html', controller: 'autorCreateController', resolve: { auth: autenticacionAdministrador } });

    $routeProvider.when('/editorial/plist/:rpp?/:page?/:order?', { templateUrl: 'js/app/editorial/plist.html', controller: 'editorialPlistController', resolve: { auth: autenticacionAdministrador } });
    $routeProvider.when('/editorial/view/:id?', { templateUrl: 'js/app/editorial/view.html', controller: 'editorialViewController', resolve: { auth: autenticacionAdministrador } });
    $routeProvider.when('/editorial/edit/:id?', { templateUrl: 'js/app/editorial/edit.html', controller: 'editorialEditController', resolve: { auth: autenticacionAdministrador } });
    $routeProvider.when('/editorial/remove/:id?', { templateUrl: 'js/app/editorial/remove.html', controller: 'editorialRemoveController', resolve: { auth: autenticacionAdministrador } });
    $routeProvider.when('/editorial/create', { templateUrl: 'js/app/editorial/create.html', controller: 'editorialCreateController', resolve: { auth: autenticacionAdministrador } });

    $routeProvider.when('/especialidad/plist/:rpp?/:page?/:order?', { templateUrl: 'js/app/especialidad/plist.html', controller: 'especialidadPlistController', resolve: { auth: autenticacionAdministrador } });
    $routeProvider.when('/especialidad/view/:id?', { templateUrl: 'js/app/especialidad/view.html', controller: 'especialidadViewController', resolve: { auth: autenticacionAdministrador } });
    $routeProvider.when('/especialidad/edit/:id?', { templateUrl: 'js/app/especialidad/edit.html', controller: 'especialidadEditController', resolve: { auth: autenticacionAdministrador } });
    $routeProvider.when('/especialidad/remove/:id?', { templateUrl: 'js/app/especialidad/remove.html', controller: 'especialidadRemoveController', resolve: { auth: autenticacionAdministrador } });
    $routeProvider.when('/especialidad/create', { templateUrl: 'js/app/especialidad/create.html', controller: 'especialidadCreateController', resolve: { auth: autenticacionAdministrador } });

    $routeProvider.when('/idioma/plist/:rpp?/:page?/:order?', { templateUrl: 'js/app/idioma/plist.html', controller: 'idiomaPlistController', resolve: { auth: autenticacionAdministrador } });
    $routeProvider.when('/idioma/view/:id?', { templateUrl: 'js/app/idioma/view.html', controller: 'idiomaViewController', resolve: { auth: autenticacionAdministrador } });
    $routeProvider.when('/idioma/edit/:id?', { templateUrl: 'js/app/idioma/edit.html', controller: 'idiomaEditController', resolve: { auth: autenticacionAdministrador } });
    $routeProvider.when('/idioma/remove/:id?', { templateUrl: 'js/app/idioma/remove.html', controller: 'idiomaRemoveController', resolve: { auth: autenticacionAdministrador } });
    $routeProvider.when('/idioma/create', { templateUrl: 'js/app/idioma/create.html', controller: 'idiomaCreateController', resolve: { auth: autenticacionAdministrador } });


    $routeProvider.when('/coleccion/plist/:rpp?/:page?/:order?', { templateUrl: 'js/app/coleccion/plist.html', controller: 'coleccionPlistController', resolve: { auth: autenticacionAdministrador } });
    $routeProvider.when('/coleccion/view/:id?', { templateUrl: 'js/app/coleccion/view.html', controller: 'coleccionViewController', resolve: { auth: autenticacionAdministrador } });
    $routeProvider.when('/coleccion/edit/:id?', { templateUrl: 'js/app/coleccion/edit.html', controller: 'coleccionEditController', resolve: { auth: autenticacionAdministrador } });
    $routeProvider.when('/coleccion/remove/:id?', { templateUrl: 'js/app/coleccion/remove.html', controller: 'coleccionRemoveController', resolve: { auth: autenticacionAdministrador } });
    $routeProvider.when('/coleccion/create', { templateUrl: 'js/app/coleccion/create.html', controller: 'coleccionCreateController', resolve: { auth: autenticacionAdministrador } });

    $routeProvider.when('/login', { templateUrl: 'js/app/login.html', controller: 'usuarioLoginController', resolve: { auth: autenticacionHome } });
    $routeProvider.when('/logout', { templateUrl: 'js/app/logout.html', controller: 'usuarioLogoutController', resolve: { auth: autenticacionHome } });

    $routeProvider.when('/register', { templateUrl: 'js/app/register.html', controller: 'usuarioRegisterController', resolve: { auth: autenticacionHome } });

    $routeProvider.when('/user/usuario/view/:id?', { templateUrl: 'js/app/user/usuario/view.html', controller: 'usuarioViewUsuarioController', resolve: { auth: autenticacionUsuario } });
    $routeProvider.when('/user/usuario/plistfactura/:id?/:rpp?/:page?/:order?', { templateUrl: 'js/app/user/usuario/plistfactura.html', controller: 'usuarioPlistFacturaUsuarioController', resolve: { auth: autenticacionUsuario } });

    $routeProvider.when('/user/factura/plistlinea/:id?/:rpp?/:page?/:order?', { templateUrl: 'js/app/user/factura/plistlinea.html', controller: 'facturaPlistLineaUsuarioController', resolve: { auth: autenticacionUsuario } });
    $routeProvider.when('/user/factura/view/:id?', { templateUrl: 'js/app/user/factura/view.html', controller: 'facturaViewUsuarioController', resolve: { auth: autenticacionUsuario } });
    //
    //        $routeProvider.when('/user/comic/plist/:rpp?/:page?/:order?', {templateUrl: 'js/app/user/producto/plist.html', controller: 'comicPlistController', resolve: {auth: autenticacionUsuario}});
    //        $routeProvider.when('/user/comic/view/:id?', {templateUrl: 'js/app/comic/view.html', controller: 'comicViewController', resolve: {auth: autenticacionUsuario}});

    $routeProvider.when('/user/comic/plist/:rpp?/:page?/:order?', { templateUrl: 'js/app/user/comic/plist.html', controller: 'comicPlistUsuarioController', resolve: { auth: autenticacionHome } });
    $routeProvider.when('/user/comic/view/:id?', { templateUrl: 'js/app/user/comic/view.html', controller: 'comicViewController', resolve: { auth: autenticacionHome } });

    $routeProvider.otherwise({ redirectTo: '/' });
}]);