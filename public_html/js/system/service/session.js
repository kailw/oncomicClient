'use strict';

moduleService.service('sessionService', ['$location', function ($location) {
        var isSessionActive = false;
        var userName = "";
        var usuariologeadoID = "";
        var tipoUserId = "";
        var carrito = 0;
        var observerCallbacks = [];
        var admin;
        return {
            getUserName: function () {
                return userName;
            },
            setUserName: function (name) {
                userName = name;
            },
            isSessionActive: function () {
                return isSessionActive;
            },
            setId: function (id) {
                usuariologeadoID = id;
            },
            getId: function () {
                return usuariologeadoID;
            },
            setSessionActive: function () {
                isSessionActive = true;
            },
            setSessionInactive: function () {
                isSessionActive = false;
            },
            setCountCarrito: function (cantidad) {
                carrito = cantidad;
                //Para que sirve el callback()
                //https://www.quora.com/What-is-the-call-back-function-in-AngularJS
                angular.forEach(observerCallbacks, function (callback) {
                    callback();
                });
            },
            getCountCarrito: function () {
                return carrito;
            },
            registerObserverCallback: function (callback) {
                observerCallbacks.push(callback);
            },
            getTipoUserId: function () {
                return tipoUserId;
            },
            setTipoUserId: function (idTipoUsuario) {
                tipoUserId = idTipoUsuario;
            },
            setAdmin: function () {
                admin = true;
            },
            getAdmin: function () {
                return admin;
            },
            setUser: function () {
                admin = false;
            }
        };

    }]);