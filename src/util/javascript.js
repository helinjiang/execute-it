/**
 * 获取文件内容
 *
 * @param {*} jsModule 文件路径
 * @param {Array} props 其他额外的参数
 * @return {Promise}
 * @author linjianghe
 */
function getResult(jsModule, ...props) {
    return new Promise((resolve, reject) => {
        // 有可能是 plain object ，也可能是函数，也可能函数里面是返回 Promise 的
        const config = (typeof jsModule === 'function') ? jsModule(...props) : jsModule;

        Promise.resolve(config)
            .then((data) => {
                resolve(data);
            })
            .catch((err) => {
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
function read(filePath, ...props) {
    return new Promise((resolve, reject) => {
        const jsModule = require(filePath);

        getResult(jsModule, ...props)
            .then((data) => {
                resolve(data);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

module.exports = {
    read,
    getResult
};