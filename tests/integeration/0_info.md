# Integeration tests

- for integeration testing we need to take care of more than one sources

- we may have to create a test DB and populate it with test data (for testing)
- we may have to make http request

## Example:

Q. lets say want to test a scenario where when we are making post request to add new genre then it should get added to DB.

- Ans: following steps neeed to followed

1. add a test DB
2. make http post request
3. Assert if data got saved in DB

## Let make changes required for integration test

steps :

1. make change in package.json : add verbose flag too

- with verbose" node logs extra output to console and if something goes wrong then we can use those logs to troubleshoot the problem

```js
   "scripts": {
   "test": "jest --watchAll --verbose"
   }
```

## setups and packages

1. supertest : to send http request
2. [link](https://www.npmjs.com/package/supertest)

```zsh
npm i supertest --save-dev
```
