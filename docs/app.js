(function() {
    'use strict';

    var app = angular.module('demoApp', [
        'z-editor'
    ]);

    angular.element(document).ready(function() {
        angular.bootstrap(document, ['demoApp'], {
            strictDi: false
        });
    });

    var injects = [];

    var Controller = function() {
        var vm = this;

        vm.data = {
            html: '<div><b>Hello</b> world 1500 100 900d dd</div>'
        };
    };

    app.controller('MainController', injects.concat([Controller]));
})();
