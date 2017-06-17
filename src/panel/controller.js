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
