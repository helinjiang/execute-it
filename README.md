# execute-it

执行文件并返回结果，目前已支持 `.js`、`.yml`、`.yaml` 和 `.json` 格式的文件，同时还支持执行指定的源代码。

## 1. 安装

```bash
$ npm install execute-it
```

## 2. API

### 2.1 getContent(filePath, ...props)

通过 `require(filePath)` 的方式，**执行**并获取文件中的内容，而不是原始文件的内容。

> 注意，该方法返回的是 `Promise` 。

- `filePath`，文件的绝对路径，支持 `.js`、`.yml`、`.yaml` 和 `.json` 格式
- `...props`，当 `filePath` 为 `.js` 文件，且该文件按照 CommonJS 规范导出的是一个方法，则会将其透传给该方法

```javascript
const executeIt = require('execute-it');

executeIt.getContent(path.join(__dirname, '../fixtures/devops-use-function.js'), {
    group: 'ivweb-init',
    other: 'other'
})
    .then((data) => {
        console.log('result:',data)
    });
```

### 2.2 evaluateJSSourceTextModule(sourceOpts, ...props)

执行 js 源码文本，获得结果并返回。

> 注意，该方法返回的是 `Promise` 。

- `sourceOpts`，源码参数，如果为字符串则为源码，等效于 `sourceOpts.sourceText`
  - `sourceOpts.sourceText`，js module 源码，必填
  - `sourceOpts.packageContent`，package.json 的内容，若 `sourceText` 有依赖第三方包，则需要配置进来
  - `sourceOpts.NPM`，默认值为 `npm`，你也可以指定为 `cnpm` 等，主要是搭配 `sourceOpts.packageContent` 使用，用于安装依赖
  - `sourceOpts.doNotClear`，是否在执行完成之后不要清理临时目录，默认值为 `false`，即会自动清理临时文件
  - `sourceOpts.tmpDir`，默认值为本组件下的 `tmp` 目录，例如 `[xxx]/node_modules/execute-it/tmp`
- `...props`，透传给 js module 的参数


#### 2.2.1 场景一：如果 js 模块不依赖第三方包，则直接传递符合 CommonJS 规范的源码

```javascript
import { evaluateJSSourceTextModule} from 'execute-it';

const code = `
 module.exports = function (name, opts) {
    return 'hello, ' + name + '! I am ' + opts.age;
};
`;

evaluateJSSourceTextModule(code, 'execute-it', { age: 123}).then(data => {
  // 输出： 'hello, execute-it! I am 123'
  console.log(data);
});
```

#### 2.2.2 场景二：如果 js 模块依赖第三方包，则需要传递依赖

```javascript
import { evaluateJSSourceTextModule} from 'execute-it';

const sourceText = `
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

evaluateJSSourceTextModule({ sourceText, packageContent}, 'execute-it', { age: 123}).then(data => {
  // 输出： 'hello, execute-it! I am {"desc":"haha","age":123}'
  console.log(data);
});
```


#### 2.2.3 场景三：支持异步

```javascript
import { evaluateJSSourceTextModule} from 'execute-it';

const sourceText = `
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

evaluateJSSourceTextModule({ sourceText, packageContent}, 'https://www.qq.com').then(data => {
  // 输出： 200
  console.log(data);
});
```

## 3. 特别说明

### 3.1 如何解析 yaml 文件？

本工具库使用 [js-yaml](https://www.npmjs.com/package/js-yaml) 来解析 `.yml` 和 `.yaml` 文件，**且未做任何二次处理**。因此如果需要了解其对 yaml 的支持和解析的规则，请查看 [js-yaml 文档](https://www.npmjs.com/package/js-yaml) ，也可以体验其 [线上 Demo](http://nodeca.github.io/js-yaml/) 。
