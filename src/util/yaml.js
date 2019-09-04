const fs = require('fs');
const yaml = require('js-yaml');

/**
 * 获取文件内容
 *
 * @param {String} filePath 文件路径
 * @return {Promise}
 * @author linjianghe
 */
function read(filePath) {
    return new Promise((resolve) => {
        const config = yaml.safeLoad(fs.readFileSync(filePath, 'utf8'));

        resolve(config);
    });
}

module.exports = {
    read,
    yaml
};