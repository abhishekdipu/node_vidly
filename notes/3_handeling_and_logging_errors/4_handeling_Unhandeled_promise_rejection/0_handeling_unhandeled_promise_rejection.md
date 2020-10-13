## handeling promise rejection: handeling node async functions

- 'handeling uncaught excetion' was for handeling sync node excetion and this is for handleing async node exception

- steps to use:

1. in index.js

```js
//handeling node exception
process.on("uncaughtException", (ex) => {
  console.log("we got an uncought exception");
  winston.error(ex.message, ex);
});
```
