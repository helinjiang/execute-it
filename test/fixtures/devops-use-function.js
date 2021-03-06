module.exports = (inputParams) => {
    return {
        other: inputParams && inputParams.other || 'self_other',
        'enable_test': true,
        'group': 'Tencent ivweb team',
        'author': 'helinjiang',
        'email': 'onehlj@qq.com',
        'count': 10086,
        'outVar_1': {
            'type': 'string',
            'value': 'Execute file or code and return the result',
            'path': './path/file'
        },
        'outVar_2': {
            'type': 'artifact',
            'value': [
                'file_path_1',
                'file_path_2'
            ],
            'info': {
                'field1': 'I am field1',
                'field2': 'I am field2',
                'list': [
                    'abc',
                    123
                ]
            }
        }
    };
};