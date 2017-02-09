# 使用自定义仓库的方法
### 在执行init命令时指定仓库地址如：
yog2 init app https://github.com/tandeyuan/test.git  
> 如果没有指定仓库路径，则使用yog2-command-init配置文件中默认的路径。  

### 在项目根目录增加fis-conf.js文件，并按照指定格式设置项目路径。
```
fis.set('privateRepos', {
    'app2': {
        'host': 'http://gitlab.com/',
        'info': 'create a app',
        'config': {
            'type': 'gitlab',
            'repos': 'tandeyuan/test',
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
    }
});
```
> fis-conf.js中的命令优先级比较高：即 app2 这个键值改为 app，则会覆盖原来的 yog2 init app这个命令。
