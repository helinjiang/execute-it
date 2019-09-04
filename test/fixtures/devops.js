module.exports = {
    enable_test: true,
    group: 'ivweb',
    count: 10086,
    msg: 'devops.js',
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
};