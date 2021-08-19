## Handeling Uncought exception: i.e exceptions of node

- till now we were handeling exception/error in request processing pipeline i.e error in express by making error middleware, but if exception arise in node process then we have to use different approch to handle.

steps to use:

1. in index.js

```js
//handeling node exception
process.on("uncaughtException", (ex) => {
  console.log("we got an uncought exception");
  winston.error(ex.message, ex);
});
```

- Explaination:
  - process: process object is an event emitter (event emmiters are the objects that can emit or publish events)
  - 'process.on': on is methods of process to subscrible to an event.
  - process.on("uncaughtException") : uncaughtException is an standard node event, this event is raised when we have exception in node process and we have not handled that exception using catch block
