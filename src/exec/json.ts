/**
 * 获取文件内容
 *
 * @param {String} filePath 文件路径
 * @return {Promise}
 * @author linjianghe
 */
export function read(filePath: string): Promise<any> {
  return new Promise(resolve => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const json = require(filePath);

    resolve(json);
  });
}

export default { read };
