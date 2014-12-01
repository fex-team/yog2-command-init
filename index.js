/**
 * fis.baidu.com
 */

'use strict';

var spawn = require('child_process').spawn;

exports.name = 'init';
exports.usage = '<command> [options]';
exports.desc = 'A awesome scaffold of fis';

var templates = require('./config/scaffold.js');


exports.register = function(commander) {
    var o_args = process.argv;
 
    commander
        .option('--verbose', 'output verbose help', Boolean, false);

    fis.util.map(templates, function(key, info){
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

        template = template.split('@');

        var version = template.length == 2 ? template[1] : 'master';

        var conf = templates[template[0]];

        if (!conf){
            fis.log.error('invalid init command, see -h');
        }
        var scaffold = new (require('fis-scaffold-kernel'))({
            type: conf.config.type,
            log: {
                level: 4 //default show all log; set `0` == silent.
            }
        });
        fis.log.notice('Downloading and unzipping');
        var dir = process.cwd();
        var prompts = null;
        var keyword_reg = conf.config.keyword_reg || /\{\{-([\s\S]*?)-\}\}/ig;
        scaffold.download(conf.config.repos + '@' + version, function (err, tmp_path) {
            var files = scaffold.util.find(tmp_path);
            scaffold.prompt(conf.config.prompt, function (err, results) {
                if (err) {
                    fis.log.fatal(err);
                }
                prompts = results;
                fis.util.map(files, function (index, filepath) {
                    var content = fis.util.fs.readFileSync(filepath, {
                        encoding: 'utf8'
                    });
                    fis.util.map(results, function (k, v) {
                        fis.util.map(files, function (index, filepath) {
                            var content = fis.util.fs.readFileSync(filepath, {
                                encoding: 'utf8'
                            });
                            content = content.replace(keyword_reg, function (m, $1) {
                                if ($1 == k) {
                                    m = v;
                                }
                                return m;
                            });
                            fis.util.fs.writeFileSync(filepath, content);
                        });
                    });
                });
                conf.config.roadmap.forEach(function(ruler){
                    fis.util.map(results, function (k, v) {
                        ruler.release = ruler.release.replace('${' + k + '}', v);
                    });
                });
                scaffold.deliver(tmp_path, dir, conf.config.roadmap);
                fis.log.notice('Done');
            });
        });
    });
};