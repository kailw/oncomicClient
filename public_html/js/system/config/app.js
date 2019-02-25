'use strict'

var oncomic = angular.module('MyApp', [
    'ngRoute',
    'services',
    'commonControllers',
    'tipousuarioControllers',
    'usuarioControllers',
    'comicControllers',
    'coleccionControllers',
    'generoControllers',
    'autorControllers',
    'editorialControllers',
    'especialidadControllers',
    'idiomaControllers',
    'facturaControllers',
    'lineaControllers',
    'components',
    'ngMaterial',
    'carritoControllers'
], function ($mdThemingProvider) {
    $mdThemingProvider.theme('docs-dark', 'default')
            .primaryPalette('yellow')
            .dark();
}).config(function ($mdDateLocaleProvider) {
    // Example of a Spanish localization.
    $mdDateLocaleProvider.months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    $mdDateLocaleProvider.shortMonths = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
        'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    $mdDateLocaleProvider.days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
    $mdDateLocaleProvider.shortDays = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'];
    // Can change week display to start on Monday.
    $mdDateLocaleProvider.firstDayOfWeek = 1;
    // Optional.
    //$mdDateLocaleProvider.dates = [1, 2, 3, 4, 5, 6, 7,8,9,10,11,12,13,14,15,16,17,18,19,
    //                               20,21,22,23,24,25,26,27,28,29,30,31];
    // In addition to date display, date components also need localized messages
    // for aria-labels for screen-reader users.
    $mdDateLocaleProvider.weekNumberFormatter = function (weekNumber) {
        return 'Semana ' + weekNumber;
    };
    $mdDateLocaleProvider.msgCalendar = 'Calendario';
    $mdDateLocaleProvider.msgOpenCalendar = 'Abrir calendario';
    $mdDateLocaleProvider.formatDate = function (date) {
        return moment(date).format('DD-MM-YYYY');
    };
});


var moduleCommon = angular.module('commonControllers', []);
var moduleCarrito = angular.module('carritoControllers', []);
var moduleService = angular.module('services', []);
var moduleTipousuario = angular.module('tipousuarioControllers', []);
var moduleComponent = angular.module('components', []);
var moduleUsuario = angular.module('usuarioControllers', []);
var moduleComic = angular.module('comicControllers', []);
var moduleColeccion = angular.module('coleccionControllers', []);
var moduleGenero = angular.module('generoControllers', []);
var moduleAutor = angular.module('autorControllers', []);
var moduleEditorial = angular.module('editorialControllers', []);
var moduleEspecialidad = angular.module('especialidadControllers', []);
var moduleIdioma = angular.module('idiomaControllers', []);
var moduleFactura = angular.module('facturaControllers', []);
var moduleLinea = angular.module('lineaControllers', []);