const path = require('path');
const chai = require('chai');
const expect = chai.expect;

const execYaml = require('../../../src/util/yaml');

describe('./util/yaml.js', function () {
    it('check read .devops.yml', function () {
        return execYaml.read(path.join(__dirname, '../../fixtures/.devops.yml'))
            .then((data) => {
                expect(data).to.eql({
                    enable_test: true,
                    group: 'ivweb',
                    count: 10086,
                    msg: '.devops.yml',
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
            });
    });
});
