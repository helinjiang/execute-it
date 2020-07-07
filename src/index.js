const path = require('path');
const fse = require('fs-extra');

const execJavascript = require('./util/javascript');
const execJson = require('./util/json');
const execYaml = require('./util/yaml');

const { runByExec } = require('./run-cmd');

const TMP_PATH = path.join(__dirname, `../tmp`);

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
 * @param {String|Object} sourceOpts
 * @param {String} sourceOpts.sourceText js module 源码
 * @param {String} sourceOpts.packageContent package.json的内容
 * @param {String} sourceOpts.NPM 选择 npm 还是 cnpm等
 * @param {Array} props 其他额外的参数
 * @return {Promise}
 * @author linjianghe
 */
function evaluateJSSourceTextModule(sourceOpts, ...props) {
  let opts;
  if (sourceOpts && typeof sourceOpts === 'object') {
    opts = sourceOpts;
  } else {
    opts = {
      sourceText: sourceOpts
    };
  }

  const tmpSavePath = path.join(TMP_PATH, `t_${Date.now()}`);
  const tmpSaveFilePath = path.join(tmpSavePath, `./code.js`);
  const tmpPackageFilePath = path.join(tmpSavePath, `./package.json`);

  return new Promise((resolve, reject) => {
    if (opts.packageContent) {
      fse.outputFileSync(tmpPackageFilePath, opts.packageContent);

      runByExec(`${opts.NPM || 'npm'} install`, { cwd: tmpSavePath }).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });

    } else {
      resolve();
    }
  })
    .then(() => {
      // 保存
      fse.outputFileSync(tmpSaveFilePath, opts.sourceText);

      // 获取执行结果
      return execJavascript.read(tmpSaveFilePath, ...props);
    })
    .then((data) => {
      // 清理
      fse.removeSync(tmpSavePath);

      return data;
    })
    .catch((err) => {
      // 清理
      fse.removeSync(tmpSavePath);

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