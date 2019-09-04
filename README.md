# execute-it

执行文件并返回结果。

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