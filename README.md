z-editor
=====================

Z-editor - simple WYSIWYG editor for AngularJS.

See demo at [zycio.github.io/z-editor/](https://zycio.github.io/z-editor/).

## Usage
Install with bower

```bash
bower install --save z-editor
```

Then reference the css files
```css
<link rel="stylesheet" href="bower_components/z-editor/dest/z-editor.css" />
<link rel="stylesheet" href="bower_components/components-font-awesome/css/font-awesome.css" />
<link rel="stylesheet" href="bower_components/codemirror/lib/codemirror.css" />
```

Then reference the js files
```html
<script src="bower_components/z-editor/dest/z-editor.min.js"></script>
```

Inject z-editor to your application
```js
var app = angular.module('myApp', ['z-editor']);
```

Create controller with data
```js
app.controller('MyAppController', ['$scope', function() {
    $scope.data = {
        html = '<div>Example data</div>'
    };
}]);
```

Use directive in html
```html
<z-editor data="data"></z-editor>
```

## Releasing
```bash
bower install
npm install
grunt dest
```
