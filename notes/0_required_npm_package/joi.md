## using joi-objectid

1. npm i joi
2. npm i joi-objectid
3. in index.js

```js
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
```

4. in model use objectId() too validation with other joi validation

```js
const validate = (requestBody) => {
  const schema = Joi.object({
    id: Joi.objectId(),
  });
  return schema.valiadate(requestBody);
};
```
