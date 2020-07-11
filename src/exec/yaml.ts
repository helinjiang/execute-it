import fs from 'fs';
import yaml from 'js-yaml';

/**
 * 获取文件内容
 *
 * @param {String} filePath 文件路径
 * @return {Promise}
 * @author linjianghe
 */
export function read(filePath: string): Promise<any> {
  return new Promise(resolve => {
    const config = yaml.safeLoad(fs.readFileSync(filePath, 'utf8'));

    resolve(config);
  });
}

export default {read, yaml};
