(function() {
    'use strict';

    var modal = angular.module('z-editor', []);

    var injects = ['$compileProvider'];

    var Config = function($compileProvider) {
        $compileProvider.debugInfoEnabled(false);
    };

    modal.config(injects.concat([Config]));
})();

angular.module('z-editor').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('content/index.html',
    '<div class=z-editor-content contenteditable ng-model=data.html></div>'
  );


  $templateCache.put('editor/index.html',
    '<div class=z-editor><z-editor-panel></z-editor-panel><z-editor-content></z-editor-content></div>'
  );


  $templateCache.put('panel/index.html',
    '<div class=z-editor-panel><button ng-repeat="(name, option) in buttons" ng-class=option.class ng-click=toggle(option.command) ng-disabled="option.disabled || codeEnabled && name != \'code\'"></button></div>'
  );

}]);

(function() {
    'use strict';

    var modal = angular.module('z-editor');

    var buttons = {
        'bold': {
            class: 'fa fa-bold',
            command: 'bold'
        },
        'italic': {
            class: 'fa fa-italic',
            command: 'italic'
        },
        'underline': {
            class: 'fa fa-underline',
            command: 'underline'
        },
        'strike': {
            class: 'fa fa-strikethrough',
            command: 'strikeThrough'
        },
        'align left': {
            class: 'fa fa-align-left',
            command: 'justifyLeft'
        },
        'align center': {
            class: 'fa fa-align-center',
            command: 'justifyCenter'
        },
        'align right': {
            class: 'fa fa-align-right',
            command: 'justifyRight'
        },
        'align justify': {
            class: 'fa fa-align-justify',
            command: 'justifyFull'
        },
        'list ol': {
            class: 'fa fa-list-ol',
            command: 'insertOrderedList'
        },
        'list ul': {
            class: 'fa fa-list-ul',
            command: 'insertUnorderedList'
        },
        'subscript': {
            class: 'fa fa-subscript',
            command: 'subscript'
        },
        'superscript': {
            class: 'fa fa-superscript',
            command: 'superscript'
        },
        'font family': {
            class: 'fa fa-font',
            disabled: true
        },
        'font size': {
            class: 'fa fa-text-height',
            disabled: true
        },
        'code': {
            class: 'fa fa-code',
            command: 'code'
        },
        'expand': {
            class: 'fa fa-expand',
            command: 'expand',
            disabled: true
        }
    };

    modal.constant('BUTTONS', buttons);
})();

(function() {
    'use strict';

    var modal = angular.module('z-editor');

    var injects = ['$scope', 'BUTTONS'];

    var Controller = function($scope, BUTTONS) {
        $scope.buttons = BUTTONS;

        $scope.codeEnabled = false;

        var toggleHtmlTag = function(tag) {
            var range, sel;
            if (window.getSelection) {
                // Non-IE case
                sel = window.getSelection();
                if (!sel.getRangeAt || !sel.rangeCount) {
                    return;
                }

                range = sel.getRangeAt(0);

                if (range) {
                    sel.removeAllRanges();
                    sel.addRange(range);
                }
                document.execCommand(tag, false, null);
            } else if (document.selection &&
                       document.selection.createRange &&
                       document.selection.type != "None") {
                // IE case
                range = document.selection.createRange();
                range.execCommand(tag, false, null);
            }
        };

        var toggleCode = function() {
            $scope.codeEnabled = !$scope.codeEnabled;
        };

        $scope.toggle = function(option) {
            switch (option) {
                case 'code':
                    toggleCode();
                    break;
                default:
                    toggleHtmlTag(option);
                    break;
            }

            $scope.$broadcast('editor.panel.toggle');
        };
    };

    modal.controller('PanelController', injects.concat([Controller]));
})();

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
