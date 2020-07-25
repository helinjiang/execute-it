import path from 'path';
import 'mocha';
import {expect} from 'chai';

import {getContent} from '../../src';

describe('./index.js', function () {
  describe('check getContent(filePath, ...props)', function () {
    it('check read .devops.yml', function () {
      return getContent(path.join(__dirname, '../fixtures/.devops.yml')).then(data => {
        expect(data).to.eql({
          enable_test: true,
          group: 'Tencent ivweb team yml',
          author: 'helinjiang',
          email: 'onehlj@qq.com',
          count: 10086,
          outVar_1: {
            type: 'string',
            value: 'Execute file or code and return the result',
            path: './path/file',
          },
          outVar_2: {
            type: 'artifact',
            value: ['file_path_1', 'file_path_2'],
            info: {
              field1: 'I am field1',
              field2: 'I am field2',
              list: ['abc', 123],
            },
          },
        });
      });
    });

    it('check read .devops.yaml', function () {
      return getContent(path.join(__dirname, '../fixtures/.devops.yaml')).then(data => {
        expect(data).to.eql({
          enable_test: true,
          group: 'Tencent ivweb team yaml',
          author: 'helinjiang',
          email: 'onehlj@qq.com',
          count: 10086,
          outVar_1: {
            type: 'string',
            value: 'Execute file or code and return the result',
            path: './path/file',
          },
          outVar_2: {
            type: 'artifact',
            value: ['file_path_1', 'file_path_2'],
            info: {
              field1: 'I am field1',
              field2: 'I am field2',
              list: ['abc', 123],
            },
          },
        });
      });
    });

    it('check read devops.json', function () {
      return getContent(path.join(__dirname, '../fixtures/devops.json')).then(data => {
        expect(data).to.eql({
          enable_test: true,
          group: 'Tencent ivweb team',
          author: 'helinjiang',
          email: 'onehlj@qq.com',
          count: 10086,
          outVar_1: {
            type: 'string',
            value: 'Execute file or code and return the result',
            path: './path/file',
          },
          outVar_2: {
            type: 'artifact',
            value: ['file_path_1', 'file_path_2'],
            info: {
              field1: 'I am field1',
              field2: 'I am field2',
              list: ['abc', 123],
            },
          },
        });
      });
    });

    it('check read devops.js', function () {
      return getContent(path.join(__dirname, '../fixtures/devops.js')).then(data => {
        expect(data).to.eql({
          enable_test: true,
          group: 'Tencent ivweb team',
          author: 'helinjiang',
          email: 'onehlj@qq.com',
          count: 10086,
          outVar_1: {
            type: 'string',
            value: 'Execute file or code and return the result',
            path: './path/file',
          },
          outVar_2: {
            type: 'artifact',
            value: ['file_path_1', 'file_path_2'],
            info: {
              field1: 'I am field1',
              field2: 'I am field2',
              list: ['abc', 123],
            },
          },
        });
      });
    });

    it('check read devops-use-function.js', function () {
      return getContent(path.join(__dirname, '../fixtures/devops-use-function.js'), {
        group: 'ivweb-init',
        other: 'other',
      }).then(data => {
        expect(data).to.eql({
          other: 'other',
          enable_test: true,
          group: 'Tencent ivweb team',
          author: 'helinjiang',
          email: 'onehlj@qq.com',
          count: 10086,
          outVar_1: {
            type: 'string',
            value: 'Execute file or code and return the result',
            path: './path/file',
          },
          outVar_2: {
            type: 'artifact',
            value: ['file_path_1', 'file_path_2'],
            info: {
              field1: 'I am field1',
              field2: 'I am field2',
              list: ['abc', 123],
            },
          },
        });
      });
    });

    it('check read devops-use-promise.js', function () {
      return getContent(path.join(__dirname, '../fixtures/devops-use-promise.js'), {
        group: 'ivweb-init',
        other: 'other',
      }).then(data => {
        expect(data).to.eql({
          other: 'other',
          enable_test: true,
          group: 'Tencent ivweb team',
          author: 'helinjiang',
          email: 'onehlj@qq.com',
          count: 10086,
          outVar_1: {
            type: 'string',
            value: 'Execute file or code and return the result',
            path: './path/file',
          },
          outVar_2: {
            type: 'artifact',
            value: ['file_path_1', 'file_path_2'],
            info: {
              field1: 'I am field1',
              field2: 'I am field2',
              list: ['abc', 123],
            },
          },
        });
      });
    });

    it('check read devops.md', function () {
      return getContent(path.join(__dirname, '../fixtures/devops.md')).catch((e: any) => {
        expect(e)
          .to.be.a('Error')
          .and.have.property(
            'message',
            `unknown extname=.md, filePath=${path.join(__dirname, '../fixtures/devops.md')}`,
          );
      });
    });
  });
});
