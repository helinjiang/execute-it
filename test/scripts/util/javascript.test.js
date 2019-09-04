const path = require('path');
const chai = require('chai');
const expect = chai.expect;

const readJavascript = require('../../../src/util/javascript');

describe('./util/javascript.js', function () {
    it('check read devops.js', function () {
        return readJavascript.read(path.join(__dirname, '../../fixtures/config/devops.js'))
            .then((data) => {
                expect(data).to.eql({
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
                });
            });
    });

    it('check read devops-use-function.js', function () {
        return readJavascript.read(path.join(__dirname, '../../fixtures/config/devops-use-function.js'), {
            group: 'ivweb-init',
            other: 'other'
        })
            .then((data) => {
                expect(data).to.eql({
                    enable_test: true,
                    group: 'ivweb',
                    count: 10086,
                    msg: 'devops-use-function.js',
                    other: 'other',
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

    it('check read devops-use-promise.js', function () {
        return readJavascript.read(path.join(__dirname, '../../fixtures/config/devops-use-promise.js'), {
            group: 'ivweb-init',
            other: 'other'
        })
            .then((data) => {
                expect(data).to.eql({
                    enable_test: true,
                    group: 'ivweb',
                    count: 10086,
                    msg: 'devops-use-promise.js',
                    other: 'other',
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

    it('check read include-config.js', function () {
        return readJavascript.read(path.join(__dirname, '../../fixtures/config/include-config.js'), {
            group: 'ivweb-init',
            other: 'other'
        })
            .then((data) => {
                expect(data).to.eql({
                    custom_msg: 'custom_msg',
                    group: 'ivweb-include',
                    msg: 'include.js',
                    other: 'other'
                });
            });
    });
});
