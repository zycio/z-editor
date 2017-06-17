(function() {
    'use strict';

    var modal = angular.module('z-editor');

    var codeMirror;

    var updateCode = function(scope, element) {
        codeMirror = CodeMirror(element[0], {
            value: scope.data.html,
            mode: 'xml',
            lineNumbers: true,
            tabSize: 4,
            indentWithTabs: true,
            matchBrackets: true
        });
    };

    var LinkFunction = function(scope, element, attrs, controller) {
        if (!controller) {
            return;
        }

        var render = function() {
            element.html(scope.data.html);
        };

        var htmlValue;

        scope.$on('editor.panel.toggle', function() {
            if (!scope.codeEnabled) {
                if (codeMirror != undefined) {
                    htmlValue = codeMirror.getValue();
                    element[0].getElementsByClassName('Codemirror')[0].remove();
                    codeMirror = undefined;
                }

                scope.data.html = htmlValue || element.html();
                htmlValue = undefined;
                element.html(scope.data.html);
                return;
            }

            scope.data.html = element.html();
            element.html('');

            updateCode(scope, element);
        });

        element.on('blur keyup change', function() {
            scope.$evalAsync(function() {
                var html = element.html();

                if (scope.codeEnabled) {
                    html = codeMirror.getValue();
                    controller.$setViewValue(html);
                    return;
                }

                controller.$setViewValue(html);
            });
        });

        render();
    };

    var injects = [];

    var Directive = function() {
        return {
            restrict: 'E',
            require: '?ngModel',
            templateUrl: 'content/index.html',
            replace: true,
            link: LinkFunction
        };
    };

    modal.directive('zEditorContent', injects.concat([Directive]));
})();
