## bcrypt: it'll encrypt the password before saving to db, as we should never directly save the plane password

- [npm link](https://www.npmjs.com/package/bcrypt)
- [github link](https://github.com/kelektiv/node.bcrypt.js)

- steps to use

  - npm i bcrypt

- how hashing the password works
  - 1234 -> abcd
  - we need salt : salt is random string which gets added before or after the password to make the password more secure

```js
const bcrypt = require("bcrypt");

async function run() {
  const salt = await bcrypt.genSalt(10);
  console.log(salt);
  //$2b$10$CF4wMjYWRCns463c/o5VxO

  const hashedPassword = await bcrypt.hash("1234", salt);
  console.log(hashedPassword);
  //$2b$10$CF4wMjYWRCns463c/o5VxO1Y2C7aPW4.eqGVBXHb8R443uPlCc60q
}
run();
```

- in hashed password salt is included, so the to later on when we are required to authenticate the user then we need to validate user name and password, as user will send password in plain text and we need to hash it again but we need to have original salt that is used to generate this hash
- so during comparing the plain text password with hashed password bcrpt need to know the original salt that was used to hash this password
