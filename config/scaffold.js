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
            'roadmap': [
                {
                    reg: '**',
                    release: '/${app_name}/$&'
                }
            ]
        }
    },
    'yog': {
        'info': 'create a base yog',
        'config': {
            'type': 'github',
            'repos': 'fex-team/yog2-framework-template',
            'prompt': [],
            'roadmap': [
                {
                    reg: '**',
                    release: '/yog/$&'
                }
            ]
        }
    },
    'node-runtime': {
        'info': 'create a nodejs online runtime',
        'config': {
            'type': 'gitlab',
            'repos': 'fex/node-runtime',
            'prompt': [],
            'roadmap': [
                {
                    reg: '**',
                    release: '/yog/$&'
                }
            ]
        }
    },
    'spa': {
        'info': 'create a spa demo',
        'config': {
            'type': 'github',
            'repos': 'fex-team/yog2-spa-demo',
            'prompt': [],
            'roadmap': [
                {
                    reg: '**',
                    release: '/spa/$&'
                }
            ]
        }
    },    
};
