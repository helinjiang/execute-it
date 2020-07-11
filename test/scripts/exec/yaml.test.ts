import path from 'path';
import 'mocha';
import {expect} from 'chai';

import {read} from '../../../src/exec/yaml';

describe('./exec/yaml.ts', function () {
  it('check read .devops.yml', function () {
    return read(path.join(__dirname, '../../fixtures/.devops.yml')).then(data => {
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
});
