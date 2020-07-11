/**
 * 获取文件内容
 *
 * @param {*} jsModule 文件路径
 * @param {Array} props 其他额外的参数
 * @return {Promise}
 * @author linjianghe
 */
export function getResult(jsModule: any, ...props: any[]): Promise<any> {
  return new Promise((resolve, reject) => {
    // 有可能是 plain object ，也可能是函数，也可能函数里面是返回 Promise 的
    // TODO 如果该模块为 es6 的话，可能还需要额外处理 jsModule.default
    const config = typeof jsModule === 'function' ? jsModule(...props) : jsModule;

    Promise.resolve(config)
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

/**
 * 获取文件内容
 *
 * @param {String} filePath 文件路径
 * @param {Array} props 其他额外的参数
 * @return {Promise}
 * @author linjianghe
 */
export function read(filePath: string, ...props: any[]): Promise<any> {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const jsModule = require(filePath);

    getResult(jsModule, ...props)
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

export default {read, getResult};
