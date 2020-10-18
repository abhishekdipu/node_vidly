- steps to use
  1. npm i jest --save-dev
  2. in package.json
  ```js
  "scripts": {
  "test": "jest --watchAll"
   }
  ```
  3. create a test.json file in config folder: set any value for jwtPrivateKey for test env
  4. create user.test.js file in test-> unit-> models->user.test.js
