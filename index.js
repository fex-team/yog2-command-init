/**
 * fis.baidu.com
 */

'use strict';

/* eslint-disable fecs-camelcase, camelcase, max-nested-callbacks */

var spawn = require('child_process').spawn;

exports.name = 'init';
exports.usage = '<command> [options]';
exports.desc = 'A awesome scaffold of fis';

var templates = require('./config/scaffold.js');
var fs = require('fs');
var path = require('path');


exports.register = function (commander) {
    commander
        .option('--verbose', 'output verbose help', Boolean, false);

    fis.util.map(templates, function (key, info) {
        commander
            .command(key)
            .description('create a ' + key);
    });

    commander.action(function () {
        var args = Array.prototype.slice.call(arguments);
        var options = args.pop();
        var template = args.shift();

        if (options.verbose) {
            fis.log.level = fis.log.L_ALL;
            fis.log.throw = true;
        }

        if (!template) {
            commander.outputHelp();
            return;
        }

        template = template.split('@');

        var version = template.length === 2 ? template[1] : 'master';

        var name = template[0];
        if (name === 'yog') {
            name = 'project';
        }

        var conf = templates[name];

        if (!conf) {
            fis.log.error('invalid init command, see -h');
        }

        var dir = process.cwd();

        // 检测是否是APP目录
        if (conf.config.needApp) {
            try {
                fs.statSync(path.join(dir, 'fis-conf.js'));
                fs.statSync(path.join(dir, 'server'));
                fs.statSync(path.join(dir, 'client'));
                require(path.join(dir, 'fis-conf.js'));
            }
            catch (e) {
                fis.log.error('current folder is not a valid app folder');
            }
        }


        var scaffold = new(require('fis-scaffold-kernel'))({
            type: conf.config.type,
            log: {
                level: 4 // default show all log; set `0` == silent.
            }
        });
        fis.log.notice('Downloading and unzipping...');
        var keyword_reg = conf.config.keyword_reg || /\{\{-([\s\S]*?)-\}\}/ig;
        var useCustom = false;
        if (conf.config.allowCustom && conf.config.customPath) {
            var customPath = path.join(dir, conf.config.customPath);
            try {
                fs.statSync(customPath);
                useCustom = true;
            }
            catch (e) {}
        }
        if (useCustom) {
            fis.log.notice('Using custom template from ' + customPath);
            var tmp_path = fis.project.getTempPath(path.join('custom_template', +new Date() + ''));
            scaffold.util.copy(customPath, tmp_path);
            deploy(tmp_path);
        }
        else {
            scaffold.download(conf.config.repos + '@' + version, function (err, tmp_path) {
                if (err) {
                    fis.log.error(err);
                }
                deploy(tmp_path);
            });
        }


        function deploy(templatePath) {
            var source_path = path.join(templatePath, conf.config.path || '');
            var files = scaffold.util.find(source_path);
            scaffold.prompt(conf.config.prompt, function (err, results) {
                if (err) {
                    fis.log.error(err);
                }
                if (conf.config.property) {
                    conf.config.property.forEach(function (property) {
                        results[property.name] = property.calc(results[property.from]);
                    });
                }
                results._namespace = fis.config.get('namespace');
                fis.util.map(results, function (k, v) {
                    fis.util.map(files, function (index, filepath) {
                        if (fs.lstatSync(filepath).isSymbolicLink() === false && fis.util.isTextFile(
                            filepath)) {
                            var content = fis.util.fs.readFileSync(filepath, {
                                encoding: 'utf8'
                            });
                            content = content.replace(keyword_reg, function (m, $1) {
                                if ($1 === k) {
                                    m = v;
                                }
                                return m;
                            });
                            fis.util.fs.writeFileSync(filepath, content);
                        }
                    });
                });
                conf.config.roadmap.forEach(function (ruler) {
                    fis.util.map(results, function (k, v) {
                        ruler.release = ruler.release.replace(new RegExp('\\$\\{' + k + '\\}', 'g'), v);
                    });
                });
                scaffold.deliver(source_path, dir, conf.config.roadmap);
                fis.log.notice('Done');
            });
        }
    });
};
