const path = require('path');
const chai = require('chai');
const expect = chai.expect;

const executeIt = require('../../src/index');

const WORKSPACE = path.join(__dirname, '../fixtures/config/');

describe.skip('./index.js', function () {
    it('executeIt for .devops.yml', function () {
        return executeIt.getContent({
            bkWorkspace: WORKSPACE,
            ep_entry_file_path: '.devops.yml'
        })
            .then((data) => {
                expect(data).to.eql({
                    enable_test: { type: 'string', value: 'true' },
                    group: { type: 'string', value: 'ivweb' },
                    msg: { type: 'string', value: '.devops.yml' },
                    count: { type: 'string', value: '10086' },
                    fake_var: {
                        type: 'string', value: '{"type":"fake_type","value":"fake_value"}'
                    },
                    'fake_var.type': {
                        'type': 'string',
                        'value': 'fake_type'
                    },
                    'fake_var.value': {
                        'type': 'string',
                        'value': 'fake_value'
                    },
                    outVar_1: { type: 'string', value: 'testaaaaa' },
                    outVar_2: { type: 'artifact', value: ['file_path_1', 'file_path_2'] },
                    outVar_3: {
                        type: 'report',
                        reportType: '',
                        label: '',
                        path: '',
                        target: '',
                        url: ''
                    }
                });
            });
    });

    it('executeIt for .devops-with-include.yml', function () {
        return executeIt.getContent({
            bkWorkspace: WORKSPACE,
            ep_entry_file_path: '.devops-with-include.yml'
        })
            .then((data) => {
                expect(data).to.eql({
                    'enable_test': { 'type': 'string', 'value': 'true' },
                    'group': { 'type': 'string', 'value': 'ivweb' },
                    'count': { 'type': 'string', 'value': '10086' },
                    'msg': { 'type': 'string', 'value': '.devops-with-include.yml' },
                    'other': { 'type': 'string', 'value': 'self_other' },
                    'custom_msg': { 'type': 'string', 'value': 'custom_msg' }
                });
            });
    });

    it('executeIt for devops.json', function () {
        return executeIt.getContent({
            bkWorkspace: WORKSPACE,
            ep_entry_file_path: 'devops.json'
        })
            .then((data) => {
                expect(data).to.eql({
                    enable_test: { type: 'string', value: 'true' },
                    group: { type: 'string', value: 'ivweb' },
                    count: { type: 'string', value: '10086' },
                    msg: { type: 'string', value: 'devops.json' },
                    fake_var: {
                        type: 'string',
                        value: '{"type":"fake_type","value":"fake_value"}'
                    },
                    'fake_var.type': {
                        'type': 'string',
                        'value': 'fake_type'
                    },
                    'fake_var.value': {
                        'type': 'string',
                        'value': 'fake_value'
                    },
                    outVar_1: { type: 'string', value: 'testaaaaa' },
                    outVar_2: { type: 'artifact', value: ['file_path_1', 'file_path_2'] },
                    outVar_3: {
                        type: 'report',
                        reportType: '',
                        label: '',
                        path: '',
                        target: '',
                        url: ''
                    }
                });
            });
    });

    it('executeIt for devops.js', function () {
        return executeIt.getContent({
            bkWorkspace: WORKSPACE,
            ep_entry_file_path: 'devops.js'
        })
            .then((data) => {
                expect(data).to.eql({
                    enable_test: { type: 'string', value: 'true' },
                    group: { type: 'string', value: 'ivweb' },
                    count: { type: 'string', value: '10086' },
                    msg: { type: 'string', value: 'devops.js' },
                    fake_var: {
                        'type': 'string',
                        'value': '{"type":"fake_type","value":"fake_value"}'
                    },
                    'fake_var.type': {
                        'type': 'string',
                        'value': 'fake_type'
                    },
                    'fake_var.value': {
                        'type': 'string',
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

    it('executeIt for devops-use-function.js', function () {
        return executeIt.getContent({
            bkWorkspace: WORKSPACE,
            ep_entry_file_path: 'devops-use-function.js',
            group: 'ivweb-init',
            other: 'other'
        })
            .then((data) => {
                expect(data).to.eql({
                    enable_test: { type: 'string', value: 'true' },
                    group: { type: 'string', value: 'ivweb' },
                    count: { type: 'string', value: '10086' },
                    msg: { type: 'string', value: 'devops-use-function.js' },
                    other: { type: 'string', value: 'other' },
                    fake_var: {
                        'type': 'string',
                        'value': '{"type":"fake_type","value":"fake_value"}'
                    },
                    'fake_var.type': {
                        'type': 'string',
                        'value': 'fake_type'
                    },
                    'fake_var.value': {
                        'type': 'string',
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

    it('executeIt for devops-use-promise.js', function () {
        return executeIt.getContent({
            bkWorkspace: WORKSPACE,
            ep_entry_file_path: 'devops-use-promise.js',
            group: 'ivweb-init',
            other: 'other'
        })
            .then((data) => {
                expect(data).to.eql({
                    enable_test: { type: 'string', value: 'true' },
                    group: { type: 'string', value: 'ivweb' },
                    count: { type: 'string', value: '10086' },
                    msg: { type: 'string', value: 'devops-use-promise.js' },
                    other: { type: 'string', value: 'other' },
                    fake_var: {
                        'type': 'string',
                        'value': '{"type":"fake_type","value":"fake_value"}'
                    },
                    'fake_var.type': {
                        'type': 'string',
                        'value': 'fake_type'
                    },
                    'fake_var.value': {
                        'type': 'string',
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
