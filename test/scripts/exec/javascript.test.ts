import path from 'path';
import 'mocha';
import {expect} from 'chai';

import {read} from '../../../src/exec/javascript';

describe('./exec/javascript.ts', function () {
  it('check read devops.js', function () {
    return read(path.join(__dirname, '../../fixtures/devops.js')).then(data => {
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
    return read(path.join(__dirname, '../../fixtures/devops-use-function.js'), {
      group: 'want change another group but will fail!',
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
    return read(path.join(__dirname, '../../fixtures/devops-use-promise.js'), {
      group: 'want change another group but will fail!',
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
});
