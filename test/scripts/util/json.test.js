const path = require('path');
const chai = require('chai');
const expect = chai.expect;

const execJson = require('../../../src/util/json');

describe('./util/json.js', function () {
    it('check read devops.json', function () {
        return execJson.read(path.join(__dirname, '../../fixtures/devops.json'))
            .then((data) => {
                expect(data).to.eql({
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
                });
            });
    });
});
