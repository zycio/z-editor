(function() {
    'use strict';

    var watch = {
        all: {
            files: ['src/**/*'],
            tasks: ['dest']
        }
    };

    var concat = {
        options: {
            separator: '\n'
        },
        dist: {
            src: [
                'src/index.js',
                'src/index.templates.js',
                'src/panel/constants.js',
                'src/panel/controller.js',
                'src/panel/directive.js',
                'src/content/directive.js',
                'src/editor/directive.js'
            ],
            dest: 'dest/editor.js'
        }
    };

    var uglify = {
        dest: {
            files: {
                'dest/editor.min.js': [
                    'dest/editor.js'
                ]
            }
        }
    };

    var cssmin = {
        target: {
            files: {
                'dest/editor.min.css': ['dest/editor.css']
            }
        }
    };

    var less = {
        options: {},
        dest: {
            files: {
                'dest/editor.css': 'src/index.less'
            }
        }
    };

    var clean = {
        dest: {
            files: [{
                src: ['dest', 'docs/libs']
            }]
        }
    };

    var copy = {
        main: {
            files: [
                {
                    expand: true,
                    src: 'angular.min.js',
                    dest: 'docs/libs/angular/',
                    cwd: 'bower_components/angular/'
                },
                {
                    expand: true,
                    src: 'font-awesome.min.css',
                    dest: 'docs/libs/font-awesome/css/',
                    cwd: 'bower_components/components-font-awesome/css/'
                },
                {
                    expand: true,
                    src: '*',
                    dest: 'docs/libs/font-awesome/fonts/',
                    cwd: 'bower_components/components-font-awesome/fonts/'
                },
                {
                    expand: true,
                    src: '*',
                    dest: 'docs/libs/codemirror/',
                    cwd: 'bower_components/codemirror/lib'
                },
                {
                    expand: true,
                    src: 'xml/*',
                    dest: 'docs/libs/codemirror/mode/',
                    cwd: 'bower_components/codemirror/mode'
                },
                {
                    expand: true,
                    src: '**',
                    dest: 'docs/libs/editor/',
                    cwd: 'dest/'
                }
            ]
        }
    };

    var ngtemplates = {
        app: {
            cwd: 'src/',
            src: '**/*.html',
            dest: 'src/index.templates.js',
            options: {
                module: 'z-editor',
                quotes: 'single',
                htmlmin: {
                	collapseBooleanAttributes    : true,
                	collapseWhitespace           : true,
                	removeAttributeQuotes        : true,
                	removeComments               : true,
                	removeEmptyAttributes        : true,
                	removeRedundantAttributes    : true,
                	removeScriptTypeAttributes   : true,
                	removeStyleLinkTypeAttributes: true
                }
            }
        }
    };

    var injector = {
        options: {},
        less: {
            options: {
                transform: function(filePath) {
                    filePath = filePath.replace('/src/', '');
                    return '@import \'' + filePath + '\';';
                },
                starttag: '// injector:less',
                endtag: '// endinjector:less',
                template: 'src/index.less'
            },
            files: {
                'src/index.less': [
                    'src/**/*.less',
                    '!src/index.less'
                ]
            }
        }
    };

    module.exports = function(grunt) {
        require('jit-grunt')(grunt, {
            ngtemplates: 'grunt-angular-templates'
        });

        grunt.initConfig({
            ngtemplates: ngtemplates,
            watch: watch,
            concat: concat,
            uglify: uglify,
            cssmin: cssmin,
            less: less,
            clean: clean,
            copy: copy,
            injector: injector
        });

        grunt.registerTask('dest', [
            'clean',
            'ngtemplates',
            'concat',
            'uglify',
            'injector:less',
            'less',
            'cssmin',
            'copy'
        ]);

        grunt.registerTask('default', [
            'dest',
            'watch'
        ]);
    };
})();
