# execute-it

执行文件并返回结果，目前已支持 `.js`、`.yml` 和 `.json` 格式的文件，同时还支持执行指定的源码。

## 安装

```bash
$ npm install execute-it
```

## API

### getContent(filePath, ...props)

- `filePath`，文件的绝对路径，支持 `.js`、`.yml` 和 `.json` 格式
- `...props`，当 `filePath` 为 `.js` 文件，且该文件导出的是一个方法，则会将其透传给方法

通过 `require` 的方式，执行并获取文件中的内容。注意，该方法返回的是 `Promise`。

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

### evaluateJSSourceTextModule(sourceOpts, ...props)

- `sourceOpts`，参数，如果为字符串则为源码，等效于 `sourceOpts.sourceText`
- `sourceOpts.sourceText`，js module 源码，必填
- `sourceOpts.packageContent`，package.json的内容，主要是依赖
- `sourceOpts.NPM`，默认值为 `npm`，你也可以指定为 `cnpm` 等，主要是搭配 `sourceOpts.packageContent` 使用，用于安装依赖
- `...props`，透传给 js module 的参数


场景一：如果 js 模块不依赖第三方包，则直接传递符合 CommonJS 规范的源码

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

场景二：如果 js 模块依赖第三方包，则需要传递依赖

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


场景三：支持异步

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