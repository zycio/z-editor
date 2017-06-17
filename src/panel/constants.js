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
