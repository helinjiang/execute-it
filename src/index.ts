import path from 'path';

import execJavascript from './exec/javascript';
import execJson from './exec/json';
import execYaml from './exec/yaml';

import {
  evaluateJSSourceTextModule,
  EVALUATE_JS_SOURCE_TEXT_MODULE_TMP_PATH,
} from './evaluate/js-source';

/**
 * 获取文件内容
 *
 * @param {String} filePath 文件路径
 * @param {Array} props 其他额外的参数
 * @return {Promise}
 * @author linjianghe
 */
export function getContent(filePath: string, ...props: any[]): Promise<any> {
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

export {
  execJavascript,
  execJson,
  execYaml,
  evaluateJSSourceTextModule,
  EVALUATE_JS_SOURCE_TEXT_MODULE_TMP_PATH,
};

export default {
  getContent,
  execJavascript,
  execJson,
  execYaml,
  evaluateJSSourceTextModule,
  EVALUATE_JS_SOURCE_TEXT_MODULE_TMP_PATH,
};
