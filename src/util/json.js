/**
 * 获取文件内容
 *
 * @param {String} filePath 文件路径
 * @return {Promise}
 * @author linjianghe
 */
function read(filePath) {
    return new Promise((resolve) => {
        const json = require(filePath);

        resolve(json);
    });
}

module.exports = {
    read
};