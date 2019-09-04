module.exports = (inputParams) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                other: inputParams && inputParams.other || 'self_other',
                enable_test: true,
                group: 'ivweb',
                count: 10086,
                msg: 'devops-use-promise.js',
                fake_var: {
                    'type': 'fake_type',
                    'value': 'fake_value'
                },
                outVar_1: {
                    'type': 'string',
                    'value': 'testaaaaa'
                },
                outVar_2: {
                    'type': 'artifact',
                    'value': [
                        'file_path_1',
                        'file_path_2'
                    ]
                },
                outVar_3: {
                    'type': 'report',
                    'reportType': '',
                    'label': '',
                    'path': '',
                    'target': '',
                    'url': ''
                }
            });
        }, 100);
    });
};
