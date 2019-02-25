'use strict';

moduleService.service('toolService', ['$location', function ($location) {
        return {
            isActive: function (p) {
                return $location.path().startsWith(p);
            }
        }
    }]);