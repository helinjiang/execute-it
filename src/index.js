const path = require('path');

const execJavascript = require('./util/javascript');
const execJson = require('./util/json');
const execYaml = require('./util/yaml');

/**
 * 获取文件内容
 *
 * @param {String} filePath 文件路径
 * @param {Array} props 其他额外的参数
 * @return {Promise}
 * @author linjianghe
 */
function getContent(filePath, ...props) {
    // 文件后缀名
    const extname = path.extname(filePath);

    // 不同的文件的处理方式不一样
    switch (extname) {
        case '.js':
            return execJavascript.read(filePath, ...props);
        case '.json':
            return execJson.read(filePath);
        case '.yml':
            return execYaml.read(filePath);
        default:
            return Promise.reject(new Error(`unknown extname=${extname}, filePath=${filePath}`));
    }
}

module.exports = {
    getContent,
    readJavascript: execJavascript,
    readJson: execJson,
    readYaml: execYaml
};