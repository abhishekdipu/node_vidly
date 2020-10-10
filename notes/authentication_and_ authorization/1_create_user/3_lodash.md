## lodash

- https://www.npmjs.com/package/lodash
- https://lodash.com/

- steps to use

  - npm i lodash

- uses

```js
const _ = require("lodash");

//-->without using lodash
//   res.send({
//    _id: user._id,
//     name: user.name,
//     email: user.email,
//   });

//-->using lodash
res.send(_.pick(user, ["_id", "name", "email"]));
```
