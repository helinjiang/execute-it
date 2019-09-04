/**
 * 获取文件内容
 *
 * @param {String} filePath 文件路径
 * @param {Object} [inputParams] 蓝盾体系内的一些参数变量
 * @param {Object} [nodejsAtomSdk] 蓝盾的 nodejs 版本 sdk
 * @return {Promise}
 * @author linjianghe
 */
function read(filePath, inputParams, nodejsAtomSdk) {
    return new Promise((resolve, reject) => {
        const jsModule = require(filePath);

        // 有可能是 plain object ，也可能是函数，也可能函数里面是返回 Promise 的
        const config = (typeof jsModule === 'function') ? jsModule(inputParams, nodejsAtomSdk) : jsModule;

        Promise.resolve(config)
            .then((data) => {
                resolve(data);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

module.exports = {
    read
};