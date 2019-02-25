'use strict'

oncomic.config(['$locationProvider', function ($locationProvider) {
        $locationProvider.html5Mode(true);
    }]);
oncomic.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
    }]);