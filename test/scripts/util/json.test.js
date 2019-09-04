const path = require('path');
const chai = require('chai');
const expect = chai.expect;

const execJson = require('../../../lib/util/json');

describe('./util/json.js', function () {
    it('check read devops.json', function () {
        return execJson.read(path.join(__dirname, '../../fixtures/devops.json'))
            .then((data) => {
                expect(data).to.eql({
                    enable_test: true,
                    group: 'ivweb',
                    count: 10086,
                    msg: 'devops.json',
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
