module.exports = (inputParams, nodejsAtomSdk) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                other: inputParams && inputParams.other || 'self_other',
                group: 'ivweb-include',
                msg: 'include.js',
                custom_msg: 'custom_msg'
            });
        }, 100);
    });
};
