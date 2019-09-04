const path = require('path');
const chai = require('chai');
const expect = chai.expect;

const executeIt = require('../../lib');

describe('./lib', function () {
    describe('check getContent()', function () {
        it('check read .devops.yml', function () {
            return executeIt.getContent(path.join(__dirname, '../fixtures/.devops.yml'))
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

        it('check read devops.json', function () {
            return executeIt.getContent(path.join(__dirname, '../fixtures/devops.json'))
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

        it('check read devops.js', function () {
            return executeIt.getContent(path.join(__dirname, '../fixtures/devops.js'))
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
            return executeIt.getContent(path.join(__dirname, '../fixtures/devops-use-function.js'), {
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
            return executeIt.getContent(path.join(__dirname, '../fixtures/devops-use-promise.js'), {
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
    });
});
