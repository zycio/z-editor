(function() {
    'use strict';

    var modal = angular.module('z-editor');

    var injects = [];

    var Directive = function() {
        return {
            restrict: 'E',
            templateUrl: 'editor/index.html',
            replace: true,
            scope: {
                data: '='
            }
        };
    };

    modal.directive('zEditor', injects.concat([Directive]));
})();
