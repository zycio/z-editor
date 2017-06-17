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
