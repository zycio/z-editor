(function() {
    'use strict';

    var modal = angular.module('z-editor');

    var injects = [];

    var Directive = function() {
        return {
            restrict: 'E',
            templateUrl: 'panel/index.html',
            replace: true,
            controller: 'PanelController'
        };
    };

    modal.directive('zEditorPanel', injects.concat([Directive]));
})();
