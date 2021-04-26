import fs from 'fs';
import path from 'path';
import 'mocha';
import { expect } from 'chai';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import nodeFsUtils from 'nodejs-fs-utils';

import {
  EVALUATE_JS_SOURCE_TEXT_MODULE_TMP_PATH,
  evaluateJSSourceTextModule,
} from '../../../src/evaluate/js-source';

describe('./evaluate/js-source.ts', function () {
  describe('常量', function () {
    it('check EVALUATE_JS_SOURCE_TEXT_MODULE_TMP_PATH', function () {
      expect(EVALUATE_JS_SOURCE_TEXT_MODULE_TMP_PATH).to.be.equal(
        path.join(__dirname, '../../../tmp'),
      );
    });
  });

  describe('check evaluateJSSourceTextModule(sourceText, ...props) ', function () {
    it('check CommonJS module', function () {
      const code = `
 module.exports = function (name, opts) {
    return 'hello, ' + name + '! I am ' + opts.age;
};
            `;

      return evaluateJSSourceTextModule(code, 'execute-it', {
        age: 123,
      }).then(data => {
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

      return evaluateJSSourceTextModule(
        {
          sourceText: code,
          packageContent,
        },
        'execute-it',
        {
          age: 123,
        },
      ).then(data => {
        expect(data).to.equal('hello, execute-it! I am {"desc":"haha","age":123}');
      });
    });

    it('check CommonJS module with package and return async', function () {
      this.timeout(2 * 60 * 1000);
      const code = `
const axios = require('axios');
const got = require('got');

module.exports = async function (url) {
  const res = await axios.get(url);
  return res.status + (typeof got);
};
            `;
      const packageContent = `
{
  "dependencies": {
    "axios": "^0.19.2",
    "got": "^11.8.2"
  }
}
            `;

      return evaluateJSSourceTextModule(
        {
          sourceText: code,
          packageContent,
        },
        'https://www.qq.com',
      ).then(data => {
        expect(data).to.equal('200function');
      });
    });

    it('check doNotClear and tmpDir', function () {
      const code = `
 module.exports = function (name, opts) {
    return 'hello, ' + name + '! I am ' + opts.age;
};
            `;

      const tmpDir = path.join(EVALUATE_JS_SOURCE_TEXT_MODULE_TMP_PATH, 'custom-tmp-dir');
      return evaluateJSSourceTextModule(
        {
          sourceText: code,
          doNotClear: true,
          tmpDir: tmpDir,
        },
        'execute-it',
        {
          age: 123,
        },
      )
        .then(data => {
          expect(data).to.equal('hello, execute-it! I am 123');
          expect(fs.existsSync(tmpDir)).to.be.true;
        })
        .then(() => {
          nodeFsUtils.removeSync(tmpDir);
        });
    });
  });
});
