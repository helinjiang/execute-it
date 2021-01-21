import path from 'path';

import { read } from '../exec/javascript';
import { runByExec } from '../run-cmd';
import { outputFileSync, removeSync } from '../fs-utils';

export const EVALUATE_JS_SOURCE_TEXT_MODULE_TMP_PATH = path.join(__dirname, `../../tmp`);

interface SourceOpts {
  sourceText: string;
  packageContent?: string;
  NPM?: string;
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
export function evaluateJSSourceTextModule(
  sourceOpts: string | SourceOpts,
  ...props: any[]
): Promise<any> {
  let opts: SourceOpts;
  if (sourceOpts && typeof sourceOpts === 'object') {
    opts = sourceOpts;
  } else {
    opts = {
      sourceText: sourceOpts,
    };
  }

  const tmpSavePath = path.join(EVALUATE_JS_SOURCE_TEXT_MODULE_TMP_PATH, `t_${Date.now()}`);
  const tmpSaveFilePath = path.join(tmpSavePath, `./code.js`);
  const tmpPackageFilePath = path.join(tmpSavePath, `./package.json`);

  return new Promise((resolve, reject) => {
    if (opts.packageContent) {
      outputFileSync(tmpPackageFilePath, opts.packageContent);

      runByExec(`${opts.NPM || 'npm'} install`, { cwd: tmpSavePath })
        .then(data => {
          resolve(data);
        })
        .catch(err => {
          reject(err);
        });
    } else {
      resolve();
    }
  })
    .then(() => {
      // 保存
      outputFileSync(tmpSaveFilePath, opts.sourceText);

      // 获取执行结果
      return read(tmpSaveFilePath, ...props);
    })
    .then(data => {
      // 清理
      removeSync(tmpSavePath);

      return data;
    })
    .catch(err => {
      // 清理
      removeSync(tmpSavePath);

      return Promise.reject(err);
    });
}
