(function() {
    'use strict';

    var modal = angular.module('z-editor', []);

    var injects = ['$compileProvider'];

    var Config = function($compileProvider) {
        $compileProvider.debugInfoEnabled(false);
    };

    modal.config(injects.concat([Config]));
})();
