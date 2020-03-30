const path = require('path');
const fse = require('fs-extra');

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

/**
 * 执行 js module 源码，获得执行结果
 *
 * @param {String} sourceText js module 源码
 * @param {Array} props 其他额外的参数
 * @return {Promise}
 * @author linjianghe
 */
function evaluateJSSourceTextModule(sourceText, ...props) {
    // 保存到一个临时目录
    const tmpSaveFilePath = path.join(__dirname, `../tmp/t_${Date.now()}.js`);

    // 保存
    fse.outputFileSync(tmpSaveFilePath, sourceText);

    // 获取执行结果
    return execJavascript.read(tmpSaveFilePath, ...props)
        .then((data) => {
            // 清理
            fse.removeSync(tmpSaveFilePath);

            return data;
        })
        .catch((err) => {
            // 清理
            fse.removeSync(tmpSaveFilePath);

            return Promise.reject(err);
        });
}

module.exports = {
    getContent,
    execJavascript,
    execJson,
    execYaml,
    evaluateJSSourceTextModule
};