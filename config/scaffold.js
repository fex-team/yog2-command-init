module.exports = {
    'app': {
        'info': 'create a app',
        'config': {
            'type': 'github',
            'repos': 'fex-team/yog2-app-template',
            'prompt': [{
                name: 'app_name',
                description: 'Enter your app name',
                type: 'string',
                required: true,
                'default': 'home'
            }],
            'roadmap': [{
                reg: '**',
                release: '/${app_name}/$&'
            }]
        }
    },
    'project': {
        'info': 'create a base yog',
        'config': {
            'type': 'github',
            'repos': 'fex-team/yog2-framework-template',
            'prompt': [{
                name: 'project_name',
                description: 'Enter your project name',
                type: 'string',
                required: true,
                'default': 'yog'
            }],
            'roadmap': [{
                reg: '**',
                release: '/${project_name}/$&'
            }]
        }
    },
    'widget': {
        'info': 'create a new widget',
        'config': {
            'type': 'github',
            'repos': 'fex-team/yog2-app-scaffold-template',
            'needApp': true,
            'path': '/widget',
            'allowCustom': true,
            'customPath': 'yog2_template',
            'prompt': [{
                name: 'widget_name',
                description: 'Enter your widget name (eg. header or book/list)',
                type: 'string',
                required: true
            }],
            'property': [{
                name: 'file_name',
                from: 'widget_name',
                calc: function (widget_name) {
                    return widget_name.split('/').pop();
                }
            }, {
                name: 'upper-file_name',
                from: 'file_name',
                calc: function (file_name) {
                    return file_name.replace(/^(\w)/, function (v) {
                        return v.toUpperCase();
                    });
                }
            }],
            'roadmap': [{
                reg: /(.*)(\$\{widget_name\})(.*)/,
                release: '/client/widget/${widget_name}/${file_name}$3'
            }]
        }
    },
    'page': {
        'info': 'create a new page',
        'config': {
            'type': 'github',
            'repos': 'fex-team/yog2-app-scaffold-template',
            'needApp': true,
            'path': '/page',
            'allowCustom': true,
            'customPath': 'yog2_template',
            'prompt': [{
                name: 'page_name',
                description: 'Enter your page url path',
                type: 'string',
                required: true,
                'default': '/book/detail'
            }, {
                name: 'ral_name',
                description: 'Enter main ral service name',
                type: 'string',
                required: true,
                'default': 'BACKEND'
            }],
            'property': [{
                name: 'file_name',
                from: 'page_name',
                calc: function (page_name) {
                    return page_name.split('/').pop();
                }
            }, {
                name: 'upper-file_name',
                from: 'file_name',
                calc: function (file_name) {
                    return file_name.replace(/^(\w)/, function (v) {
                        return v.toUpperCase();
                    });
                }
            }],
            'roadmap': [{
                reg: /(.*)(\$\{page_name\})(.*)/,
                release: '/$1/${page_name}$3'
            }, {
                reg: '**',
                release: '/$&'
            }]
        }
    },
    'api': {
        'info': 'create a api',
        'config': {
            'type': 'github',
            'repos': 'fex-team/yog2-app-scaffold-template',
            'path': '/api',
            'needApp': true,
            'allowCustom': true,
            'customPath': 'yog2_template',
            'prompt': [{
                name: 'api_name',
                description: 'Enter your api url path',
                type: 'string',
                required: true,
                'default': '/api/getBookInfo'
            }, {
                name: 'ral_name',
                description: 'Enter main ral service name',
                type: 'string',
                required: true,
                'default': 'BACKEND'
            }],
            'property': [{
                name: 'file_name',
                from: 'api_name',
                calc: function (api_name) {
                    return api_name.split('/').pop();
                }
            }, {
                name: 'upper-file_name',
                from: 'file_name',
                calc: function (file_name) {
                    return file_name.replace(/^(\w)/, function (v) {
                        return v.toUpperCase();
                    });
                }
            }],
            'roadmap': [{
                reg: /(.*)(\$\{api_name\})(.*)/,
                release: '/$1/${api_name}$3'
            }, {
                reg: '**',
                release: '/$&'
            }]
        }
    },
    'node-runtime': {
        'info': 'create a nodejs online runtime',
        'config': {
            'type': 'gitlab',
            'repos': 'fex/node-runtime',
            'prompt': [],
            'roadmap': [{
                reg: '**',
                release: '/$&'
            }]
        }
    }
};
