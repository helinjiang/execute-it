const path = require('path');
const chai = require('chai');
const expect = chai.expect;

const executeIt = require('../../src');

describe('./index.js', function () {
  describe('check getContent(filePath, ...props)', function () {
    it('check read .devops.yml', function () {
      return executeIt.getContent(path.join(__dirname, '../fixtures/.devops.yml'))
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

    it('check read devops.json', function () {
      return executeIt.getContent(path.join(__dirname, '../fixtures/devops.json'))
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

    it('check read devops.js', function () {
      return executeIt.getContent(path.join(__dirname, '../fixtures/devops.js'))
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

    it('check read devops-use-function.js', function () {
      return executeIt.getContent(path.join(__dirname, '../fixtures/devops-use-function.js'), {
        group: 'ivweb-init',
        other: 'other'
      })
        .then((data) => {
          expect(data).to.eql({
            'other': 'other',
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

    it('check read devops-use-promise.js', function () {
      return executeIt.getContent(path.join(__dirname, '../fixtures/devops-use-promise.js'), {
        group: 'ivweb-init',
        other: 'other'
      })
        .then((data) => {
          expect(data).to.eql({
            'other': 'other',
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

  describe('check evaluateJSSourceTextModule(sourceText, ...props) ', function () {
    it('check CommonJS module', function () {
      const code = `
 module.exports = function (name, opts) {
    return 'hello, ' + name + '! I am ' + opts.age;
};
            `;

      return executeIt.evaluateJSSourceTextModule(code, 'execute-it', {
        age: 123
      })
        .then((data) => {
          expect(data).to.equal('hello, execute-it! I am 123');
        });
    });

    it('check CommonJS module with package', function () {
      this.timeout(2 * 60 * 1000);
      const code = `
const _ = require('lodash')
module.exports = function (name, opts) {
    return 'hello, ' + name + '! I am ' + JSON.stringify(_.merge({desc:'haha'},opts));
};
            `;
      const packageContent = `
{
  "dependencies": {
    "lodash": "^4.17.15"
  }
}
            `;

      return executeIt.evaluateJSSourceTextModule({
        sourceText: code,
        packageContent
      }, 'execute-it', {
        age: 123
      })
        .then((data) => {
          expect(data).to.equal('hello, execute-it! I am {"desc":"haha","age":123}');
        });
    });

    it('check CommonJS module with package and return async', function () {
      this.timeout(2 * 60 * 1000);
      const code = `
const axios = require('axios');

module.exports = async function (url) {
  const res = await axios.get(url);
  return res.status;
};
            `;
      const packageContent = `
{
  "dependencies": {
    "axios": "^0.19.2"
  }
}
            `;

      return executeIt.evaluateJSSourceTextModule({
        sourceText: code,
        packageContent
      }, 'https://www.qq.com')
        .then((data) => {
          expect(data).to.equal(200);
        });
    });
  });
});
