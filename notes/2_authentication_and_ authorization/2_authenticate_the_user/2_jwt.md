## [JWT](https://jwt.io/): json web token

- jwt: json web token is aa long string that identifies a user

- how it works?

  1. when user 1st logins to server, we sent him 'jwt' and that gets store in client side (eg. for web app: local storage in browser) and next time if user is making api call this token is used.

```js
const token = jwt.sign({ name: "Abhi", isAdmin: true }, "jwtPrivateKey");
```

- how it looks like?
  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

- this long string is jwt, it has 3 parts

  1. header : it contains info about 1)alg: algorithm used to encode this token 2)type: JWT (default value)

  2. payload: it contains data what we want jwt to store (entirely upto us), like user's name, email, access level etc.
     //{ name: "Abhi", isAdmin: true },

  3. verify signature : it's a digital signature which is generated by a secret key present in server. if someone modifies the payload contains then this digital signature will be invalid.

- steps to use
  - npm i jsonwebtoken
