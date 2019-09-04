const path = require('path');
const extractParams = require('../../src/index');

const WORKSPACE = path.join('/Users/helinjiang/gitprojects/web-test-demo');

extractParams.getOutputData({
    bkWorkspace: WORKSPACE,
    ep_entry_file_path: '.devops.yml'
})
    .then((data) => {
        console.log(data);
    });